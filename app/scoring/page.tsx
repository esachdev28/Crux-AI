'use client'

import React from 'react'
import Header from '@/components/header'
import Navigation from '@/components/navigation'
import CredibilityRadar from '@/components/scoring/credibility-radar'
import FactCheckWidget from '@/components/fact-check/fact-check-widget'

export default function ScoringPage() {
  const mockMetrics = {
    sourceReliability: 0.82,
    evidenceStrength: 0.75,
    trustworthiness: 0.88,
    consistency: 0.91,
    expertConsensus: 0.78,
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <FactCheckWidget />
          <CredibilityRadar metrics={mockMetrics} />
        </div>
      </main>
    </div>
  )
}
