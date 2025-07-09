from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import os
import json
import logging
from dotenv import load_dotenv
from typing import List
import requests

# === Logging Setup ===
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# === Load environment variables ===
load_dotenv()

# === Configuration ===
class Config:
    BASE_DIR = os.path.dirname(__file__)
    JSONL_PATH = os.path.join(BASE_DIR, "vc_dataset.jsonl")
    INDEX_PATH = os.path.join(BASE_DIR, "index.faiss")
    API_KEY = os.getenv("GEMINI_API_KEY")
    MODEL_NAME = "gemini-1.5-flash"
    TOP_N = 3

# === Data Models ===
class QARequest(BaseModel):
    question: str

class VCRequest(BaseModel):
    industry: str

class ChatRequest(BaseModel):
    message: str

class ChatResponse(BaseModel):
    text: str
    isBot: bool = True
    status: str = "success"

# === App Initialization ===
app = FastAPI(
    title="VC/QA Semantic Search API",
    description="Semantic and keyword search for QA and VC profiles using Gemini 1.5 Flash",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Add your frontend origins here
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# === Data Loading ===
qa_data = []
vc_data = []
index = None

def load_dataset():
    global qa_data, vc_data
    qa_data = []
    vc_data = []
    if not os.path.exists(Config.JSONL_PATH):
        logger.warning(f"Dataset file not found: {Config.JSONL_PATH}")
        return
    with open(Config.JSONL_PATH, "r", encoding="utf-8") as f:
        for line in f:
            try:
                item = json.loads(line.strip())
                if "question" in item and "answer" in item:
                    qa_data.append(item)
                elif "firmName" in item or "industryFocus" in item:
                    vc_data.append(item)
            except Exception as e:
                logger.warning(f"Skipping line due to error: {e}")

@app.on_event("startup")
async def initialize_services():
    load_dataset()
    get_index()

def get_index():
    global index
    if index is None:
        try:
            import faiss
            if os.path.exists(Config.INDEX_PATH):
                logger.info("Loading FAISS index...")
                index = faiss.read_index(Config.INDEX_PATH)
                logger.info("FAISS index loaded successfully")
            else:
                logger.warning(f"FAISS index file not found: {Config.INDEX_PATH}")
        except ImportError:
            logger.warning("FAISS not installed. Falling back to keyword search.")
        except Exception as e:
            logger.error(f"Failed to load FAISS index: {e}")
    return index

def get_embedder(query: List[str]) -> List[List[float]]:
    if not Config.API_KEY:
        logger.warning("No GEMINI_API_KEY configured.")
        return []
    url = f"https://generativelanguage.googleapis.com/v1beta/models/embedding-001:embedContent?key={Config.API_KEY}"
    try:
        payload = {
            "model": "models/embedding-001",
            "content": {
                "parts": [{"text": q} for q in query]
            }
        }
        headers = {"Content-Type": "application/json"}
        response = requests.post(url, headers=headers, json=payload, timeout=30)
        if response.status_code == 200:
            embeddings = response.json().get("embedding", {}).get("values")
            if embeddings:
                return [embeddings]
            else:
                logger.error(f"Embeddings missing in response: {response.json()}")
        else:
            logger.error(f"Embedding request failed: {response.status_code} - {response.text}")
    except Exception as e:
        logger.error(f"Error generating embeddings: {e}")
    return []

def semantic_search(query: str, data: List[dict], field: str) -> List[dict]:
    try:
        index_model = get_index()
        if index_model is None:
            logger.info("Falling back to keyword search...")
            return keyword_search(query, data, field)
        query_vecs = get_embedder([query])
        if not query_vecs:
            logger.warning("Failed to get embeddings from Gemini. Fallback to keyword search.")
            return keyword_search(query, data, field)
        query_vec = query_vecs[0]
        import numpy as np
        query_vec_np = np.array([query_vec], dtype='float32')
        distances, indices = index_model.search(query_vec_np, min(Config.TOP_N, len(data)))
        results = []
        for idx in indices[0]:
            if 0 <= idx < len(data):
                results.append(data[idx])
        return results
    except Exception as e:
        logger.error(f"Semantic search failed: {e}")
        return keyword_search(query, data, field)

def keyword_search(query: str, data: List[dict], field: str) -> List[dict]:
    if not data:
        return []
    query_lower = query.lower()
    query_words = query_lower.split()
    matches = []
    for item in data:
        text = item.get(field, '').lower() if field in item else json.dumps(item).lower()
        score = 0
        for word in query_words:
            if word in text:
                score += 1
        if score > 0:
            matches.append((score, item))
    matches.sort(key=lambda x: x[0], reverse=True)
    return [item for _, item in matches[:Config.TOP_N]]

def build_context(hits: List[dict], q_field: str, a_field: str) -> str:
    if not hits:
        return "No specific information found."
    context_parts = []
    for i, pair in enumerate(hits, 1):
        question = pair.get(q_field, 'No question')
        answer = pair.get(a_field, 'No answer')
        context_parts.append(f"Example {i}:\nQ: {question}\nA: {answer}")
    return "\n\n".join(context_parts)

def generate_response(user_message: str, context: str) -> str:
    if not Config.API_KEY:
        return "Sorry, the AI service is currently unavailable. Please try again later."
    try:
        prompt = f"""
You are a professional VC/QA assistant for Invesho. Answer ONLY questions related to venture capital firms, investment queries, startup funding, or Invesho-related topics.

Context:
{context}

User Question: {user_message}

Instructions:
- If the question is NOT related to venture capital, startup funding, investments, or Invesho, politely refuse and inform the user that you can only answer VC and Invesho-related queries.
- Otherwise, answer in a friendly, professional tone.
- Be concise but informative.
- If the question isn't directly answered in the context, provide a helpful response based on what you know in the VC and Invesho domain only.

Answer:
"""

        headers = {
            "Authorization": f"Bearer {Config.API_KEY}",
            "Content-Type": "application/json"
        }
        payload = {
            "model": "gemini-1.5-flash",
            "messages": [
                {
                    "role": "system",
                    "content": "You are a VC/QA assistant. Be helpful, friendly, and professional."
                },
                {
                    "role": "user",
                    "content": prompt
                }
            ],
            "max_tokens": 500,
            "temperature": 0.7
        }
        url = 'https://generativelanguage.googleapis.com/v1beta/openai/chat/completions'
        response = requests.post(url, headers=headers, json=payload, timeout=30)
        if response.status_code == 200:
            response_data = response.json()
            if 'choices' in response_data and len(response_data['choices']) > 0:
                return response_data['choices'][0]['message']['content'].strip()
            else:
                logger.error(f"Unexpected API response format: {response_data}")
                return "I'm sorry, I received an unexpected response format."
        else:
            logger.error(f"API request failed: {response.status_code} - {response.text}")
            return f"Sorry, I encountered an error (HTTP {response.status_code}). Please try again."
    except requests.exceptions.Timeout:
        logger.error("API request timeout")
        return "Sorry, the request timed out. Please try again."
    except requests.exceptions.RequestException as e:
        logger.error(f"API request error: {e}")
        return "Sorry, I encountered a network error. Please try again."
    except Exception as e:
        logger.error(f"Generation error: {e}")
        return "Sorry, I encountered an error generating a response. Please try again."

@app.post("/api/qa", response_model=ChatResponse)
async def qa_search(request: QARequest):
    question = request.question.strip()
    if not question:
        raise HTTPException(status_code=400, detail="Question parameter is required")
    hits = semantic_search(question, qa_data, "question")
    context = build_context(hits, "question", "answer")
    bot_response = generate_response(question, context)
    return ChatResponse(
        text=bot_response,
        isBot=True,
        status="success"
    )

@app.post("/api/vcs", response_model=ChatResponse)
async def vcs_search(request: VCRequest):
    industry = request.industry.strip()
    if not industry:
        raise HTTPException(status_code=400, detail="Industry parameter is required")
    hits = semantic_search(industry, vc_data, "industryFocus")
    context = build_context(hits, "firmName", "description")
    bot_response = generate_response(industry, context)
    return ChatResponse(
        text=bot_response,
        isBot=True,
        status="success"
    )

@app.post("/api/chat", response_model=ChatResponse)
async def chat_endpoint(request: ChatRequest):
    user_message = request.message.strip()
    if not user_message:
        raise HTTPException(status_code=400, detail="Message cannot be empty")
    # Use both QA and VC data for context
    hits_qa = semantic_search(user_message, qa_data, "question")
    hits_vc = semantic_search(user_message, vc_data, "industryFocus")
    context_qa = build_context(hits_qa, "question", "answer")
    context_vc = build_context(hits_vc, "firmName", "description")
    context = f"{context_qa}\n\n{context_vc}".strip()
    bot_response = generate_response(user_message, context)
    return ChatResponse(
        text=bot_response,
        isBot=True,
        status="success"
    )

@app.get("/api/stats")
async def stats():
    return {
        "qa_count": len(qa_data),
        "vc_count": len(vc_data)
    }

@app.get("/api/health")
async def health():
    return {
        "status": "healthy",
        "qa_count": len(qa_data),
        "vc_count": len(vc_data)
    }

@app.get("/")
async def home():
    return {
        "message": "VC/QA Semantic Search API",
        "endpoints": {
            "qa": "/api/qa",
            "vcs": "/api/vcs",
            "chat": "/api/chat",
            "stats": "/api/stats",
            "health": "/api/health"
        }
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=int(os.environ.get("PORT", 5000)),
        reload=True,
        log_level="info"
    )
