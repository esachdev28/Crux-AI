import os
import time
import json
import requests
from typing import List, Dict
from dotenv import load_dotenv
import google.generativeai as genai
from duckduckgo_search import DDGS
from models import Claim, Evidence, ScoreResponse

# Load env vars
load_dotenv("../.env.local")

# Configure Gemini
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
if GEMINI_API_KEY:
    genai.configure(api_key=GEMINI_API_KEY)
    model = genai.GenerativeModel('gemini-2.0-flash-exp')
else:
    print("WARNING: GEMINI_API_KEY not found")
    model = None

class ScanAgent:
    def scan(self, source: str) -> List[Claim]:
        print(f"Scanning {source}...")
        claims = []
        
        # Use NewsData API if available
        NEWSDATA_KEY = os.getenv("NEWSDATA_API_KEY")
        if NEWSDATA_KEY and source != "twitter":
            try:
                url = f"https://newsdata.io/api/1/news?apikey={NEWSDATA_KEY}&language=en&q=breaking"
                response = requests.get(url)
                data = response.json()
                if "results" in data:
                    for article in data["results"][:5]:
                        claims.append(Claim(
                            id=article.get("article_id", f"news-{int(time.time())}"),
                            text=article.get("title", ""),
                            source=article.get("source_id", "NewsData"),
                            status="unverified",
                            url=article.get("link")
                        ))
            except Exception as e:
                print(f"NewsData Scan Error: {e}")

        # Fallback / Mock for Twitter (since we don't have a key)
        if not claims:
             claims.append(Claim(
                id=f"mock-{int(time.time())}",
                text="AI takes over the world in 2025 according to new report.",
                source="Social Media",
                status="unverified"
            ))
            
        return claims

class VerifyAgent:
    def verify(self, claim: Claim) -> Claim:
        print(f"Verifying claim: {claim.text}")
        
        # Use DuckDuckGo to find evidence
        try:
            with DDGS() as ddgs:
                results = list(ddgs.text(claim.text, max_results=5))
                
            evidence_list = []
            for res in results:
                evidence_list.append(Evidence(
                    source=res.get("title", "Web Search"),
                    content=res.get("body", "")[:200] + "...",
                    url=res.get("href"),
                    confidence=0.0 # Will be scored by AI
                ))
            
            claim.evidence_list = evidence_list
            
        except Exception as e:
            print(f"DDG Search Error: {e}")
            # Fallback if search fails
            claim.evidence_list = []

        return claim

class ScoreAgent:
    def calculate_score(self, claim: Claim) -> ScoreResponse:
        print(f"Scoring claim: {claim.id}")
        
        if not model:
            return ScoreResponse(claim_id=claim.id, final_score=0, breakdown={}, verdict="UNVERIFIED", explanation="AI Model missing")

        # Prepare prompt for Gemini
        evidence_text = "\n".join([f"- {e.content} (Source: {e.source})" for e in claim.evidence_list])
        prompt = f"""
        Analyze the credibility of this claim based on the evidence provided.
        
        Claim: "{claim.text}"
        
        Evidence:
        {evidence_text}
        
        Return a JSON object with:
        - final_score (0-100)
        - source_reliability (0-100)
        - evidence_strength (0-100)
        - consistency (0-100)
        - verdict (VERIFIED, FALSE, MIXED, UNVERIFIED)
        - explanation (Short summary)
        """
        
        try:
            response = model.generate_content(prompt)
            # Clean up markdown code blocks if present
            text = response.text.replace("```json", "").replace("```", "").strip()
            data = json.loads(text)
            
            return ScoreResponse(
                claim_id=claim.id,
                final_score=data.get("final_score", 50),
                breakdown={
                    "source_reliability": data.get("source_reliability", 50),
                    "evidence_strength": data.get("evidence_strength", 50),
                    "consistency": data.get("consistency", 50)
                },
                verdict=data.get("verdict", "UNVERIFIED"),
                explanation=data.get("explanation", "No explanation generated.")
            )
        except Exception as e:
            print(f"Gemini Scoring Error: {e}")
            return ScoreResponse(claim_id=claim.id, final_score=0, breakdown={}, verdict="ERROR", explanation="AI Error")

class ExplainAgent:
    def explain(self, claim: Claim, score: ScoreResponse, lang: str = "en") -> str:
        if not model:
            return "AI Model missing for explanation."
            
        prompt = f"""
        Explain the verdict '{score.verdict}' for the claim: "{claim.text}"
        in language code: '{lang}'.
        Keep it concise (under 50 words).
        """
        
        try:
            response = model.generate_content(prompt)
            return response.text.strip()
        except Exception as e:
            return f"Error generating explanation: {e}"

class CrisisAgent:
    def detect_crisis(self, claims: List[str]) -> List[str]:
        if not model or not claims:
            return []
            
        prompt = f"""
        Analyze these claims and identify if any are URGENT CRISIS situations (e.g. natural disasters, active violence, pandemics).
        Return ONLY the claims that are crises as a JSON list of strings. If none, return [].
        
        Claims:
        {json.dumps(claims)}
        """
        
        try:
            response = model.generate_content(prompt)
            text = response.text.replace("```json", "").replace("```", "").strip()
            return json.loads(text)
        except Exception as e:
            print(f"Crisis Detection Error: {e}")
            return []

# Singleton instances
scan_agent = ScanAgent()
verify_agent = VerifyAgent()
score_agent = ScoreAgent()
explain_agent = ExplainAgent()
crisis_agent = CrisisAgent()
