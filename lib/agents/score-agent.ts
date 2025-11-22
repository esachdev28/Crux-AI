
export interface ScoreInput {
  claimText: string
  source: string
  evidence: Array<{
    source: string
    content: string
    sentiment: 'support' | 'refute' | 'neutral'
    confidence: number
  }>
}

export interface ScoreResult {
  finalCredibilityScore: number // 0-100
  breakdown: {
    sourceReliability: number // 0-100
    evidenceStrength: number // 0-100
    trustworthiness: number // 0-100
    consistency: number // 0-100
    expertConsensus: number // 0-100
  }
  verdict: 'VERIFIED' | 'FALSE' | 'MIXED' | 'UNVERIFIED'
  explanation: string
}

export class ScoreAgent {
  private reliableSources = ['reuters.com', 'apnews.com', 'bbc.com', 'who.int', 'gov.in']
  private questionableSources = ['random-blog.xyz', 'whatsapp-forward', 'unknown']

  public calculateScore(input: ScoreInput): ScoreResult {
    const sourceScore = this.calculateSourceReliability(input.source)
    const evidenceScore = this.calculateEvidenceStrength(input.evidence)
    const consistencyScore = this.calculateConsistency(input.evidence)
    
    // Simulate other metrics for now
    const trustworthiness = (sourceScore * 0.6 + evidenceScore * 0.4)
    const expertConsensus = evidenceScore // Proxy for expert consensus

    const finalScore = (
      sourceScore * 0.3 +
      evidenceScore * 0.4 +
      consistencyScore * 0.1 +
      trustworthiness * 0.1 +
      expertConsensus * 0.1
    )

    return {
      finalCredibilityScore: Math.round(finalScore),
      breakdown: {
        sourceReliability: Math.round(sourceScore),
        evidenceStrength: Math.round(evidenceScore),
        trustworthiness: Math.round(trustworthiness),
        consistency: Math.round(consistencyScore),
        expertConsensus: Math.round(expertConsensus)
      },
      verdict: this.getVerdict(finalScore),
      explanation: this.generateExplanation(finalScore, input)
    }
  }

  private calculateSourceReliability(source: string): number {
    const lowerSource = source.toLowerCase()
    if (this.reliableSources.some(s => lowerSource.includes(s))) return 95
    if (this.questionableSources.some(s => lowerSource.includes(s))) return 30
    return 60 // Default for unknown
  }

  private calculateEvidenceStrength(evidence: ScoreInput['evidence']): number {
    if (evidence.length === 0) return 20
    
    const supporting = evidence.filter(e => e.sentiment === 'support')
    const refuting = evidence.filter(e => e.sentiment === 'refute')
    
    const supportScore = supporting.reduce((acc, curr) => acc + curr.confidence, 0)
    const refuteScore = refuting.reduce((acc, curr) => acc + curr.confidence, 0)

    // If strong refutation, score is low
    if (refuteScore > supportScore) {
      return Math.max(10, 100 - refuteScore)
    }
    
    // If strong support, score is high
    return Math.min(95, 50 + supportScore)
  }

  private calculateConsistency(evidence: ScoreInput['evidence']): number {
    if (evidence.length < 2) return 50
    
    // Check if all evidence aligns
    const sentiments = evidence.map(e => e.sentiment)
    const allSupport = sentiments.every(s => s === 'support')
    const allRefute = sentiments.every(s => s === 'refute')
    
    if (allSupport || allRefute) return 90
    return 40 // Mixed signals
  }

  private getVerdict(score: number): ScoreResult['verdict'] {
    if (score >= 80) return 'VERIFIED'
    if (score <= 40) return 'FALSE'
    if (score > 40 && score < 60) return 'UNVERIFIED'
    return 'MIXED'
  }

  private generateExplanation(score: number, input: ScoreInput): string {
    const verdict = this.getVerdict(score)
    if (verdict === 'VERIFIED') {
      return `This claim is rated VERIFIED based on strong evidence from reliable sources like ${input.evidence[0]?.source || 'trusted outlets'}.`
    }
    if (verdict === 'FALSE') {
      return `This claim is rated FALSE. Multiple sources refute this information.`
    }
    return `This claim is ${verdict}. Evidence is mixed or insufficient to form a definitive conclusion.`
  }
}
