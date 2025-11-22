from pydantic import BaseModel, Field
from typing import List, Optional, Dict
from datetime import datetime

class Evidence(BaseModel):
    source: str
    content: str
    url: Optional[str] = None
    sentiment: str = "neutral" # support, refute, neutral
    confidence: float

class Claim(BaseModel):
    id: str
    text: str
    source: str
    timestamp: datetime = Field(default_factory=datetime.now)
    status: str = "unverified" # verified, false, mixed, unverified
    confidence: float = 0.0
    credibility_score: float = 0.0
    evidence_list: List[Evidence] = []
    explanation: Optional[str] = None
    crisis_tag: Optional[str] = None
    language: str = "en"

class ScanRequest(BaseModel):
    source_url: str
    force_refresh: bool = False

class ScoreRequest(BaseModel):
    claim_id: str
    claim_text: str
    evidence: List[Evidence]

class ScoreResponse(BaseModel):
    claim_id: str
    final_score: float
    breakdown: Dict[str, float]
    verdict: str
    explanation: str

class VerifyRequest(BaseModel):
    text: str

class ExplainRequest(BaseModel):
    claim_text: str
    verdict: str
    lang: str = "en"

class CrisisResponse(BaseModel):
    timestamp: datetime = Field(default_factory=datetime.now)
    crisis_detected: bool
    alerts: List[str]
    recommended_actions: List[str]
