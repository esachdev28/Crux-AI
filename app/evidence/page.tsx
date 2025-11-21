'use client'

import React, { useState } from 'react'
import Header from '@/components/header'
import Navigation from '@/components/navigation'
import EvidenceExplorer from '@/components/evidence/evidence-explorer'
import EvidenceDetail from '@/components/evidence/evidence-detail'

export default function EvidencePage() {
  const [selectedClaim, setSelectedClaim] = useState<string | null>(null)

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <EvidenceExplorer onSelectClaim={setSelectedClaim} />
          </div>
          {selectedClaim && (
            <div>
              <EvidenceDetail claimId={selectedClaim} />
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
