import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { claimText, verdict, lang } = await request.json()

    const response = await fetch('http://127.0.0.1:8000/api/explain', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ claim_text: claimText, verdict, lang }),
    })

    if (!response.ok) {
      throw new Error('Backend explanation failed')
    }

    const data = await response.json()

    return NextResponse.json({ explanation: data.explanation })
  } catch (error) {
    console.error('Explanation error:', error)
    return NextResponse.json({ error: 'Explanation failed' }, { status: 500 })
  }
}
