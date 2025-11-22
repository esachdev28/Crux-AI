import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    const response = await fetch('http://127.0.0.1:8000/api/crisis')

    if (!response.ok) {
      throw new Error('Backend crisis check failed')
    }

    const data = await response.json()

    return NextResponse.json({
      timestamp: data.timestamp,
      crisisDetected: data.crisis_detected,
      alerts: data.alerts,
      recommendedActions: data.recommended_actions,
    })
  } catch (error) {
    console.error('Crisis detection error:', error)
    return NextResponse.json({ error: 'Crisis detection failed' }, { status: 500 })
  }
}
