import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { claimText } = await request.json()

    if (!claimText) {
      return NextResponse.json({ error: 'Claim text is required' }, { status: 400 })
    }

    // Call Python backend
    const response = await fetch('http://127.0.0.1:8000/api/verify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text: claimText }),
    })

    if (!response.ok) {
      throw new Error('Backend verification failed')
    }

    const data = await response.json()
    const claim = data.claim
    const score = data.score

    // Map to frontend format expected by fact-check widget
    const result = {
      claim: claim.text,
      status: claim.status.toUpperCase(),
      confidence: Math.round(claim.credibility_score || 0),
      sources: claim.evidence_list.map((e: any) => ({
        name: e.source,
        credibility: e.confidence * 10 || 0
      })),
      explanation: claim.explanation || score.explanation || 'No explanation available',
      credibilityScore: ((claim.credibility_score || 0) / 10).toFixed(1)
    }

    return NextResponse.json(result)
  } catch (error) {
    console.error('Verification error:', error)
    return NextResponse.json({
      error: 'Verification failed',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}
