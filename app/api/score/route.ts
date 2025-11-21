import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { claimId } = await request.json()

    // Simulate ScoreAgent calculating credibility
    const score = {
      claimId,
      sourceReliabilityScore: (Math.random() * 10).toFixed(1),
      evidenceStrengthScore: (Math.random() * 10).toFixed(1),
      historicalTrustworthinessScore: (Math.random() * 10).toFixed(1),
      sentimentAnalysis: Math.random() > 0.5 ? 'positive' : 'negative',
      stanceDetection: ['supports', 'opposes', 'neutral'][Math.floor(Math.random() * 3)],
      finalCredibilityScore: (5 + Math.random() * 5).toFixed(1),
      recommendation: Math.random() > 0.5 ? 'verify' : 'mark_as_checked',
    }

    return NextResponse.json(score)
  } catch (error) {
    return NextResponse.json({ error: 'Scoring failed' }, { status: 500 })
  }
}
