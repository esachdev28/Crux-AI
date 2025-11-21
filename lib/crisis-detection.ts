export const CRISIS_KEYWORDS = {
  disaster: ['earthquake', 'flood', 'tsunami', 'cyclone', 'hurricane', 'tornado'],
  pandemic: ['virus', 'outbreak', 'epidemic', 'pandemic', 'disease', 'quarantine'],
  political: ['election', 'riot', 'protest', 'government', 'coup', 'unrest'],
  security: ['attack', 'explosion', 'shooting', 'terror', 'security', 'threat'],
  health: ['healthcare', 'hospital', 'emergency', 'casualty', 'injury', 'medical'],
}

export function detectCrisisKeywords(text: string): { detected: boolean; category: string; keywords: string[] } {
  const lowerText = text.toLowerCase()
  const detectedKeywords: string[] = []
  let category = ''

  for (const [cat, keywords] of Object.entries(CRISIS_KEYWORDS)) {
    for (const keyword of keywords) {
      if (lowerText.includes(keyword)) {
        detectedKeywords.push(keyword)
        if (!category) category = cat
      }
    }
  }

  return {
    detected: detectedKeywords.length > 0,
    category,
    keywords: detectedKeywords,
  }
}

export interface CrisisAlert {
  id: string
  title: string
  severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL'
  region: string
  verified: boolean
  timestamp: string
  keywords: string[]
}

export function generateCrisisAlert(claim: string): CrisisAlert | null {
  const crisis = detectCrisisKeywords(claim)
  if (!crisis.detected) return null

  const severities: Array<'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL'> = [
    'MEDIUM',
    'HIGH',
    'CRITICAL',
  ]

  return {
    id: `crisis-${Date.now()}`,
    title: claim.slice(0, 100),
    severity: severities[Math.floor(Math.random() * severities.length)],
    region: ['Global', 'Regional', 'Local'][Math.floor(Math.random() * 3)],
    verified: Math.random() > 0.4,
    timestamp: new Date().toISOString(),
    keywords: crisis.keywords,
  }
}
