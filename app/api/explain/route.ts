import { NextRequest, NextResponse } from 'next/server'
import { ExplainAgent } from '@/lib/agents/explain-agent'

export async function POST(request: NextRequest) {
  try {
    const { claimText, verdict, lang } = await request.json()
    const agent = new ExplainAgent()
    const explanation = agent.generateExplanation(claimText, verdict, lang)

    return NextResponse.json({ explanation })
  } catch (error) {
    return NextResponse.json({ error: 'Explanation failed' }, { status: 500 })
  }
}
