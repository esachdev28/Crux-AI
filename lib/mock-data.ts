export interface Claim {
  id: string
  text: string
  source: string
  status: 'TRUE' | 'FALSE' | 'MIXED' | 'UNVERIFIED'
  confidence: number
  timestamp: string
}

const claimTemplates = [
  'New vaccine rollout announced in 50 countries',
  'Stock market surge following policy announcement',
  'Celebrity endorses unknown cryptocurrency',
  'Government releases climate report findings',
  'Tech company announces revolutionary breakthrough',
  'Medical study shows conflicting results',
  'Election date changed to different schedule',
  'International trade agreement finalized',
  'New pandemic variant detected in samples',
  'Scientist claims revolutionary discovery',
  'City implements new transportation system',
  'Sports championship postponed unexpectedly',
]

const sources = ['Twitter/X', 'Reddit', 'NewsAPI', 'WhatsApp', 'TikTok', 'Traditional Media']

export function generateMockClaims(count: number): Claim[] {
  const statuses: Array<'TRUE' | 'FALSE' | 'MIXED' | 'UNVERIFIED'> = [
    'TRUE',
    'FALSE',
    'MIXED',
    'UNVERIFIED',
  ]

  return Array.from({ length: count }, (_, i) => ({
    id: `claim-${Date.now()}-${i}`,
    text: claimTemplates[Math.floor(Math.random() * claimTemplates.length)],
    source: sources[Math.floor(Math.random() * sources.length)],
    status: statuses[Math.floor(Math.random() * statuses.length)],
    confidence: Math.floor(Math.random() * 100),
    timestamp: `${Math.floor(Math.random() * 59)}m ago`,
  }))
}


const activityMessages = [
  'Claim detected from Twitter source',
  'Running fact-check against database',
  'Similarity score calculated: 0.87',
  'Evidence extracted from 5 sources',
  'Credibility assessment complete',
  'Generating explanation in English',
  'Translating to Hindi',
  'Publishing verification result',
  'Crisis keyword detected',
  'High confidence match found',
]

const agents = ['ScanAgent', 'VerifyAgent', 'ScoreAgent', 'ExplainAgent']

export function generateActivityLogs(count: number) {
  return Array.from({ length: count }, () => {
    const type = Math.random() > 0.85 ? 'warning' : Math.random() > 0.95 ? 'error' : 'success'
    return {
      agent: agents[Math.floor(Math.random() * agents.length)],
      message: activityMessages[Math.floor(Math.random() * activityMessages.length)],
      type,
    }
  })
}

export function generateAgentLogs(count: number) {
  return Array.from({ length: count }, () => ({
    timestamp: new Date().toISOString(),
    agent: 'Agent-' + Math.floor(Math.random() * 4),
    status: 'completed',
  }))
}
