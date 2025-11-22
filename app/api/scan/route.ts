import { NextRequest, NextResponse } from 'next/server'
import { ScanAgent } from '@/lib/agents/scan-agent'

export async function POST(request: NextRequest) {
  try {
    const { source } = await request.json()
    const agent = new ScanAgent()
    const results = await agent.scan(source || 'twitter')

    return NextResponse.json({
      success: true,
      claims: results,
      count: results.length
    })
  } catch (error) {
    return NextResponse.json({ error: 'Scan failed' }, { status: 500 })
  }
}
