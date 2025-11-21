import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { claim, language = 'en' } = await request.json()

    // Simulate ExplainAgent generating explanations
    const explanations = {
      en: 'This claim has been fact-checked against multiple authoritative sources and databases. The verification status and confidence level are displayed above. For more details, please review the evidence section.',
      hi: 'इस दावे को कई आधिकारिक स्रोतों और डेटाबेस के विरुद्ध तथ्य-जांच की गई है। सत्यापन स्थिति और आत्मविश्वास स्तर ऊपर दिखाए गए हैं। अधिक विवरण के लिए, कृपया साक्ष्य अनुभाग की समीक्षा करें।',
    }

    return NextResponse.json({
      claim,
      simpleExplanation: explanations[language as 'en' | 'hi'] || explanations['en'],
      credibilityLevel: Math.random() > 0.5 ? 'high' : 'low',
      language,
      sources: 4,
      lastUpdated: new Date().toISOString(),
    })
  } catch (error) {
    return NextResponse.json({ error: 'Explanation generation failed' }, { status: 500 })
  }
}
