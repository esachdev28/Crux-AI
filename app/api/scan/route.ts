import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { source } = await request.json()

    // Trigger scan in backend
    const response = await fetch('http://127.0.0.1:8000/api/scan', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ source_url: source || 'twitter' }),
    })

    if (!response.ok) {
      throw new Error('Backend scan trigger failed')
    }

    // Since backend scan is async (background task), we return a success message
    // The frontend should ideally listen to WS for results.
    // For now, we'll return an empty list or mock list to not break UI immediately,
    // but the real solution is WS.

    return NextResponse.json({
      success: true,
      claims: [], // Backend will push claims via WS
      count: 0,
      message: "Scan initiated. Watch live feed for results."
    })
  } catch (error) {
    console.error('Scan error:', error)
    return NextResponse.json({ error: 'Scan failed' }, { status: 500 })
  }
}
