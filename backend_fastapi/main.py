from fastapi import FastAPI, WebSocket, BackgroundTasks
from fastapi.middleware.cors import CORSMiddleware
from typing import List
import asyncio
import json

from .models import Claim, ScanRequest, ScoreRequest, ScoreResponse
from .agents import scan_agent, verify_agent, score_agent, explain_agent

app = FastAPI(title="CruxAI Backend")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# In-memory store for demo
claims_db: List[Claim] = []

@app.get("/")
def read_root():
    return {"status": "CruxAI System Online"}

@app.post("/api/scan")
async def trigger_scan(request: ScanRequest, background_tasks: BackgroundTasks):
    # Run scan in background
    background_tasks.add_task(run_scan_pipeline, request.source_url)
    return {"message": f"Scan initiated for {request.source_url}"}

async def run_scan_pipeline(source: str):
    new_claims = scan_agent.scan(source)
    for claim in new_claims:
        # Pipeline: Verify -> Score -> Explain
        verified_claim = verify_agent.verify(claim)
        score_result = score_agent.calculate_score(verified_claim)
        
        verified_claim.status = score_result.verdict
        verified_claim.credibility_score = score_result.final_score
        verified_claim.explanation = explain_agent.explain(verified_claim, score_result)
        
        claims_db.append(verified_claim)
        
        # Broadcast to WebSocket (stub)
        # await manager.broadcast(verified_claim.json())

@app.get("/api/claims", response_model=List[Claim])
def get_claims():
    return claims_db

@app.post("/api/score", response_model=ScoreResponse)
def calculate_score(request: ScoreRequest):
    # Construct a temporary claim object from request
    temp_claim = Claim(
        id=request.claim_id,
        text=request.claim_text,
        source="User Input",
        evidence_list=request.evidence
    )
    return score_agent.calculate_score(temp_claim)

@app.websocket("/ws/live")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    try:
        while True:
            # Simulate live stream
            await asyncio.sleep(5)
            if claims_db:
                latest = claims_db[-1]
                await websocket.send_text(latest.json())
            else:
                await websocket.send_text(json.dumps({"type": "ping"}))
    except Exception:
        print("WebSocket disconnected")
