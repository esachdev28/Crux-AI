import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { claimId, claimText, source, evidence } = body

    const response = await fetch('http://127.0.0.1:8000/api/score', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        claim_id: claimId,
        claim_text: claimText || "Unknown Claim",
        evidence: evidence || []
      }),
    })

    if (!response.ok) {
      throw new Error('Backend scoring failed')
    }

    const result = await response.json()

    // Map backend response to frontend format
    const mappedResponse = {
      claimId: result.claim_id,
      sourceReliabilityScore: (result.breakdown.source_reliability / 10).toFixed(1),
      evidenceStrengthScore: (result.breakdown.evidence_strength / 10).toFixed(1),
      historicalTrustworthinessScore: (result.breakdown.consistency / 10).toFixed(1),
      sentimentAnalysis: 'neutral',
      stanceDetection: 'neutral',
      finalCredibilityScore: (result.final_score / 10).toFixed(1),
      recommendation: result.verdict === 'VERIFIED' ? 'mark_as_checked' : 'verify',
      breakdown: result.breakdown,
      explanation: result.explanation
    }

    return NextResponse.json(mappedResponse)
  } catch (error) {
    console.error('Scoring error:', error)
    return NextResponse.json({ error: 'Scoring failed' }, { status: 500 })
  }
}
