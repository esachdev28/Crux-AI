import random
import time
from typing import List, Dict
from .models import Claim, Evidence, ScoreResponse

class ScanAgent:
    def scan(self, source: str) -> List[Claim]:
        # Simulate scanning logic
        print(f"Scanning {source}...")
        time.sleep(1) # Simulate network delay
        
        # Mock detected claims
        claims = []
        if "twitter" in source:
            claims.append(Claim(
                id=f"tw-{int(time.time())}",
                text="Breaking: Earthquake predicted in California tomorrow!",
                source="Twitter",
                status="unverified"
            ))
        elif "news" in source:
             claims.append(Claim(
                id=f"nw-{int(time.time())}",
                text="New study shows chocolate cures everything.",
                source="NewsFeed",
                status="unverified"
            ))
        return claims

class VerifyAgent:
    def verify(self, claim: Claim) -> Claim:
        print(f"Verifying claim: {claim.text}")
        # Simulate RAG / API lookup
        time.sleep(1)
        
        # Mock evidence
        if "Earthquake" in claim.text:
            claim.evidence_list = [
                Evidence(source="USGS", content="No scientific method exists to predict earthquakes.", sentiment="refute", confidence=0.95, url="https://usgs.gov"),
                Evidence(source="Social Media", content="My cat is acting weird, earthquake coming!", sentiment="support", confidence=0.1)
            ]
        else:
             claim.evidence_list = [
                Evidence(source="HealthLine", content="Chocolate has benefits but is not a cure-all.", sentiment="neutral", confidence=0.8)
            ]
        return claim

class ScoreAgent:
    def calculate_score(self, claim: Claim) -> ScoreResponse:
        print(f"Scoring claim: {claim.id}")
        
        # Logic similar to the TS version but in Python
        source_reliability = 50
        evidence_strength = 0
        
        if claim.evidence_list:
            support = sum(e.confidence for e in claim.evidence_list if e.sentiment == 'support')
            refute = sum(e.confidence for e in claim.evidence_list if e.sentiment == 'refute')
            
            if refute > support:
                evidence_strength = 10
            else:
                evidence_strength = 80
        
        final_score = (source_reliability + evidence_strength) / 2
        
        verdict = "UNVERIFIED"
        if final_score > 80: verdict = "VERIFIED"
        elif final_score < 40: verdict = "FALSE"
        else: verdict = "MIXED"
        
        return ScoreResponse(
            claim_id=claim.id,
            final_score=final_score,
            breakdown={
                "source_reliability": source_reliability,
                "evidence_strength": evidence_strength,
                "consistency": 50
            },
            verdict=verdict,
            explanation=f"Rated {verdict} based on available evidence."
        )

class ExplainAgent:
    def explain(self, claim: Claim, score: ScoreResponse, lang: str = "en") -> str:
        if lang == "hi":
            return f"दावा: {claim.text} - यह {score.verdict} है।"
        return f"Claim: {claim.text} - This is rated as {score.verdict}."

# Singleton instances
scan_agent = ScanAgent()
verify_agent = VerifyAgent()
score_agent = ScoreAgent()
explain_agent = ExplainAgent()
