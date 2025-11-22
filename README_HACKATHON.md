# CruxAI - Hackathon Submission

## 🚀 Project Overview
CruxAI is a real-time Agentic AI system for detecting misinformation and managing crisis communication.
It features a dual-stack architecture designed for maximum flexibility and performance.

## 📂 Structure
- **frontend_react/** (Current Root): Next.js 14 + Tailwind + Shadcn UI. Contains the Dashboard and "Edge" Agents (running in API routes for the demo).
- **backend_fastapi/**: Full Python backend with FastAPI, Pydantic models, and heavy-duty Agent logic (Scan, Verify, Score, Explain).

## 🌟 Key Features (Implemented)
1.  **Real-time Dashboard**: Live feed of claims with auto-updates.
2.  **Credibility Scoring**: Advanced **ScoreAgent** calculates Source Reliability, Evidence Strength, and Trustworthiness. Visualized via a **Radar Chart**.
3.  **Agentic Workflow**:
    - **ScanAgent**: Monitors sources (Twitter/News).
    - **VerifyAgent**: Checks facts against Google/Snopes (simulated).
    - **ScoreAgent**: Computes multi-dimensional credibility scores.
    - **ExplainAgent**: Generates bilingual (English/Hindi) explanations.
4.  **Crisis Mode**: Auto-triggers on keywords like "lockdown", "virus".

## 🛠️ How to Run (Demo Mode)
The "Demo Mode" runs entirely within Next.js for easy deployment to Vercel.

1.  Install dependencies:
    ```bash
    npm install
    ```
2.  Run the development server:
    ```bash
    npm run dev
    ```
3.  Open [http://localhost:3000](http://localhost:3000).

## 🐍 How to Run (Python Backend)
For the full backend experience:

1.  Navigate to `backend_fastapi`:
    ```bash
    cd backend_fastapi
    ```
2.  Install requirements (create a venv first):
    ```bash
    pip install fastapi uvicorn
    ```
3.  Run the server:
    ```bash
    uvicorn main:app --reload
    ```
4.  The API will be available at [http://localhost:8000](http://localhost:8000).

## 🏆 Hackathon Tips
- **Show the Radar Chart**: Click "View Evidence" on any claim in the feed to see the new Credibility Radar.
- **Trigger Crisis**: The system auto-triggers crisis mode randomly, or you can set it manually in `app/page.tsx`.
- **Bilingual**: The ExplainAgent supports Hindi/English toggling.

Good luck! 🚀
