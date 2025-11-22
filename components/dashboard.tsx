'use client'

import React, { useState, useEffect } from 'react'
import MisinformationFeed from './feed/misinformation-feed'
import TrendingRumors from './charts/trending-rumors'
import CrisisStats from './stats/crisis-stats'

interface Claim {
  id: string
  text: string
  source: string
  status: 'TRUE' | 'FALSE' | 'MIXED' | 'UNVERIFIED'
  confidence: number
  credibility_score?: number
  timestamp: string
}

export default function Dashboard() {
  const [claims, setClaims] = useState<Claim[]>([])
  const [stats, setStats] = useState({
    verified: 0,
    false: 0,
    needsReview: 0,
    emerging: 0,
  })
  const [loading, setLoading] = useState(true)

  // Fetch real claims from backend
  const fetchClaims = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/claims')
      if (response.ok) {
        const data = await response.json()

        // Transform backend data to frontend format
        const transformedClaims = data.map((claim: any) => {
          // Map backend status to frontend status
          let status = claim.status.toUpperCase()
          if (status === 'VERIFIED') status = 'TRUE'

          return {
            id: claim.id,
            text: claim.text,
            source: claim.source,
            status: status,
            confidence: claim.credibility_score || claim.confidence || 0,
            timestamp: new Date(claim.timestamp).toLocaleString(),
          }
        })

        setClaims(transformedClaims)

        // Calculate stats from real data
        const newStats = {
          verified: transformedClaims.filter((c: Claim) => c.status === 'TRUE').length,
          false: transformedClaims.filter((c: Claim) => c.status === 'FALSE').length,
          needsReview: transformedClaims.filter((c: Claim) => c.status === 'UNVERIFIED').length,
          emerging: transformedClaims.filter((c: Claim) => c.status === 'MIXED').length,
        }
        setStats(newStats)
      }
    } catch (error) {
      console.error('Failed to fetch claims:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchClaims()

    // Poll for new claims every 10 seconds
    const interval = setInterval(fetchClaims, 10000)
    return () => clearInterval(interval)
  }, [])

  if (loading) {
    return (
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">Loading claims...</div>
      </main>
    )
  }

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
