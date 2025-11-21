import { NextRequest, NextResponse } from 'next/server'
import { generateCrisisAlert } from '@/lib/crisis-detection'

export async function GET(request: NextRequest) {
  try {
    // Simulate crisis detection on incoming claims
    const sampleClaims = [
      'Earthquake detected in region with magnitude 7.2',
      'New virus variant identified in multiple countries',
      'Election fraud allegations surface in major cities',
      'Armed conflict escalates in border region',
    ]

    const alerts = sampleClaims
      .map(claim => generateCrisisAlert(claim))
      .filter(alert => alert !== null)

    return NextResponse.json({
      timestamp: new Date().toISOString(),
      crisisDetected: alerts.length > 0,
      alerts,
      recommendedActions: [
        'Prioritize government/health authority information',
        'Mark unverified claims as potential misinformation',
        'Push verified updates instantly to users',
        'Enable bilingual alerts',
      ],
    })
  } catch (error) {
    return NextResponse.json({ error: 'Crisis detection failed' }, { status: 500 })
  }
}
