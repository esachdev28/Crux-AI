import { NextRequest, NextResponse } from 'next/server'
import { ScoreAgent, ScoreInput } from '@/lib/agents/score-agent'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { claimId, claimText, source, evidence } = body

    // Initialize Agent
    const agent = new ScoreAgent()

    // Prepare input (mocking evidence if not provided for demo purposes)
    const scoreInput: ScoreInput = {
      claimText: claimText || "Unknown Claim",
      source: source || "Unknown Source",
      evidence: evidence || [
        // Mock evidence if none provided, to show the scoring working
        { source: 'reuters.com', content: 'Verified by Reuters', sentiment: 'support', confidence: 0.9 },
        { source: 'twitter.com', content: 'Random tweet', sentiment: 'neutral', confidence: 0.4 }
      ]
    }

    const result = agent.calculateScore(scoreInput)

    // Format response to match what the frontend expects (or update frontend)
    // The frontend expects: sourceReliabilityScore, evidenceStrengthScore, etc.
    // Our agent returns a 'breakdown' object. We should map it.

    const response = {
      claimId,
      sourceReliabilityScore: (result.breakdown.sourceReliability / 10).toFixed(1),
      evidenceStrengthScore: (result.breakdown.evidenceStrength / 10).toFixed(1),
      historicalTrustworthinessScore: (result.breakdown.trustworthiness / 10).toFixed(1),
      sentimentAnalysis: 'neutral', // Agent could return this too
      stanceDetection: 'neutral',
      finalCredibilityScore: (result.finalCredibilityScore / 10).toFixed(1),
      recommendation: result.verdict === 'VERIFIED' ? 'mark_as_checked' : 'verify',
      breakdown: result.breakdown, // Pass full breakdown for advanced UI
      explanation: result.explanation
    }

    return NextResponse.json(response)
  } catch (error) {
    console.error('Scoring error:', error)
    return NextResponse.json({ error: 'Scoring failed' }, { status: 500 })
  }
}
