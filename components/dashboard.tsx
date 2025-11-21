'use client'

import React, { useState, useEffect } from 'react'
import MisinformationFeed from './feed/misinformation-feed'
import TrendingRumors from './charts/trending-rumors'
import CrisisStats from './stats/crisis-stats'
import { generateMockClaims } from '@/lib/mock-data'

export default function Dashboard() {
  const [claims, setClaims] = useState(generateMockClaims(15))
  const [stats, setStats] = useState({
    verified: 34,
    false: 12,
    needsReview: 23,
    emerging: 58,
  })

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setClaims(prev => {
        const newClaim = generateMockClaims(1)[0]
        return [newClaim, ...prev.slice(0, 14)]
      })
    }, 8000)

    return () => clearInterval(interval)
  }, [])

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Stats Row */}
      <CrisisStats stats={stats} />

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Feed - Takes 2 columns */}
        <div className="lg:col-span-2">
          <MisinformationFeed claims={claims} />
        </div>

        {/* Trending */}
        <div>
          <TrendingRumors />
        </div>
      </div>
    </main>
  )
}
