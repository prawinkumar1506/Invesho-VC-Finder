# Invesho VC Finder

A full stack application for semantic and keyword search of Venture Capital (VC) firms, investment queries, startup funding, and Invesho-related topics. Powered by a Next.js frontend and a Python FastAPI backend with Gemini AI integration and FAISS for vector similarity search.

---

## Table of Contents

- [Features](#features)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
  - [Frontend](#frontend-setup)
  - [Backend](#backend-setup)
- [API Endpoints](#api-endpoints)
- [Tech Stack](#tech-stack)
- [License](#license)

---

## Features

- Semantic and keyword search for VC and QA datasets.
- Gemini 1.5 Flash API integration for embeddings and generative responses.
- Vector search powered by FAISS.
- Modular Next.js frontend with Tailwind CSS and Radix UI.
- FastAPI backend with CORS support and REST endpoints.

---

## Project Structure

```
.
├── app/                   # Frontend application code (Next.js)
├── backend/               # Python backend (FastAPI, FAISS, Gemini)
│   ├── main.py            # Main FastAPI application
│   ├── build_faiss_index.py # Script to build the FAISS index
│   ├── requirements.txt   # Python dependencies
│   ├── vc_dataset.jsonl   # VC and QA dataset (JSON Lines)
│   ├── index.faiss        # FAISS vector index
│   └── ...                # Other backend files
├── components/            # Shared frontend components
├── hooks/                 # React hooks
├── lib/                   # Utility libraries
├── public/                # Static assets
├── styles/                # Tailwind and CSS files
├── package.json           # Frontend dependencies and scripts
├── tailwind.config.ts     # Tailwind CSS config
├── next.config.mjs        # Next.js config
└── ...
```
> Note: This is a partial listing, see the full repo for more details.

---

## Getting Started

### Frontend Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```
2. **Start the development server:**
   ```bash
   npm run dev
   ```
   The app will be available on [http://localhost:3000](http://localhost:3000) by default.

### Backend Setup

1. **Navigate to the backend directory:**
   ```bash
   cd backend
   ```
2. **Install Python dependencies:**
   ```bash
   pip install -r requirements.txt
   ```
3. **Start the backend server:**
   ```bash
   python main.py
   ```
   The FastAPI backend runs by default on [http://localhost:5000](http://localhost:5000).

**Environment Variables:**  
Create a `.env` file in `backend/` with your Gemini API key:
```
GEMINI_API_KEY=your_api_key_here
```

---

## API Endpoints

- `POST /api/qa` — Semantic search for QA pairs (expects `{ "question": "your question" }`)
- `POST /api/vcs` — Search VC firms by industry (expects `{ "industry": "industry name" }`)
- `POST /api/chat` — General chat endpoint (expects `{ "message": "your query" }`)
- `GET  /api/stats` — Dataset statistics
- `GET  /api/health` — Health check endpoint

See `backend/main.py` for details on request/response formats.

---

## Tech Stack

**Frontend:**
- Next.js (React)
- Tailwind CSS
- Radix UI
- Typescript

**Backend:**
- Python FastAPI
- FAISS for vector search
- Gemini AI API (Google Generative AI)
- Uvicorn for ASGI server

---

## License

This project is licensed under the MIT License.

---

> **Note:**  
This README was generated based on a partial analysis of the repository structure and main files. For a complete and up-to-date list of features and usage, refer to the source code or contact the project maintainer.

[Browse the repo for more details](https://github.com/prawinkumar1506/Invesho-VC-Finder/tree/main/)
