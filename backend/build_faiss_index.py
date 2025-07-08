import os
import json
import numpy as np
import faiss
import requests
from dotenv import load_dotenv
from tqdm import tqdm

# === Configuration ===
load_dotenv()
DATASET_PATH = os.environ.get('DATASET_PATH', 'vc_dataset.jsonl')
INDEX_PATH = os.environ.get('INDEX_PATH', 'index.faiss')
GEMINI_API_KEY = os.getenv('GEMINI_API_KEY')
EMBEDDING_DIM = 768  # Gemini's embedding-001 returns 768-dim vectors

def get_gemini_embedding(text: str) -> np.ndarray:
    url = f"https://generativelanguage.googleapis.com/v1beta/models/embedding-001:embedContent?key={GEMINI_API_KEY}"
    payload = {
        "model": "models/embedding-001",
        "content": {
            "parts": [{"text": text}]
        }
    }
    headers = {"Content-Type": "application/json"}
    response = requests.post(url, headers=headers, json=payload, timeout=30)
    if response.status_code == 200:
        values = response.json().get("embedding", {}).get("values")
        if values and len(values) == EMBEDDING_DIM:
            return np.array(values, dtype=np.float32)
        else:
            raise ValueError("Invalid embedding length or missing values")
    else:
        raise RuntimeError(f"Embedding request failed: {response.status_code} - {response.text}")

def main():
    if not GEMINI_API_KEY:
        print("GEMINI_API_KEY not set in environment.")
        return

    if not os.path.exists(DATASET_PATH):
        print(f"Dataset file not found: {DATASET_PATH}")
        return

    # Load all items (QA and VC)
    items = []
    with open(DATASET_PATH, "r", encoding="utf-8") as f:
        for line in f:
            try:
                item = json.loads(line.strip())
                items.append(item)
            except Exception as e:
                print(f"Skipping line due to error: {e}")

    print(f"Loaded {len(items)} items from {DATASET_PATH}")

    # Choose the text field for embedding
    def get_text(item):
        if "question" in item and "answer" in item:
            return f"{item['question']} {item['answer']}"
        elif "firmName" in item or "industryFocus" in item:
            return f"{item.get('firmName', '')} {item.get('industryFocus', '')} {item.get('description', '')}"
        else:
            return json.dumps(item)

    # Generate embeddings
    vectors = []
    for item in tqdm(items, desc="Embedding items"):
        text = get_text(item)
        try:
            emb = get_gemini_embedding(text)
            vectors.append(emb)
        except Exception as e:
            print(f"Embedding failed for item: {e}")
            vectors.append(np.zeros(EMBEDDING_DIM, dtype=np.float32))

    vectors_np = np.vstack(vectors)
    print(f"Shape of embedding matrix: {vectors_np.shape}")

    # Build and save FAISS index
    index = faiss.IndexFlatL2(EMBEDDING_DIM)
    index.add(vectors_np)
    faiss.write_index(index, INDEX_PATH)
    print(f"FAISS index saved to {INDEX_PATH}")

if __name__ == "__main__":
    main()
