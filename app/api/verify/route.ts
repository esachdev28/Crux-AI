import { NextRequest, NextResponse } from 'next/server'
import { VerifyAgent } from '@/lib/agents/verify-agent'

export async function POST(request: NextRequest) {
  try {
    const { claimText } = await request.json()
    const agent = new VerifyAgent()
    const result = await agent.verify(claimText)

    return NextResponse.json(result)
  } catch (error) {
    return NextResponse.json({ error: 'Verification failed' }, { status: 500 })
  }
  const statuses: Array<'TRUE' | 'FALSE' | 'MIXED' | 'UNVERIFIED'> = [
    'TRUE',
    'FALSE',
    'MIXED',
    'UNVERIFIED',
  ]
  return statuses[Math.floor(Math.random() * statuses.length)]
}

function generateSources() {
  return [
    { name: 'FactCheck.org', credibility: 9.2 },
    { name: 'PolitiFact', credibility: 8.8 },
    { name: 'Snopes', credibility: 8.5 },
    { name: 'Reuters Fact Check', credibility: 9.1 },
  ]
}

function generateExplanation(claim: string): string {
  const explanations = [
    'This claim has been verified against multiple authoritative sources.',
    'Evidence suggests this claim contains some factual elements but is misleading in context.',
    'Fact-checkers have found no reliable evidence to support this claim.',
    'This claim is still under investigation by multiple fact-checking organizations.',
  ]
  return explanations[Math.floor(Math.random() * explanations.length)]
}
