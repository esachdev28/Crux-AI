import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { claimText } = await request.json()

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
    // const score = data.score

    // Map to frontend format
    const result = {
      claimId: claim.id,
      isFactChecked: true,
      sources: claim.evidence_list.map((e: any) => ({
        name: e.source,
        url: e.url || '',
        reliability: e.confidence
      })),
      similarClaims: [] // Backend doesn't return similar claims yet
    }

    return NextResponse.json(result)
  } catch (error) {
    console.error('Verification error:', error)
    return NextResponse.json({ error: 'Verification failed' }, { status: 500 })
  }
}
