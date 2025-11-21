'use client'

import React from 'react'
import StatCard from './stat-card'
import { CheckCircle, XCircle, AlertCircle, TrendingUp } from 'lucide-react'

interface Stats {
  verified: number
  false: number
  needsReview: number
  emerging: number
}

export default function CrisisStats({ stats }: { stats: Stats }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <StatCard
        icon={CheckCircle}
        label="Verified True"
        value={stats.verified}
        color="emerald"
        trend="+12%"
      />
      <StatCard
        icon={XCircle}
        label="False Claims"
        value={stats.false}
        color="red"
        trend="+8%"
      />
      <StatCard
        icon={AlertCircle}
        label="Needs Review"
        value={stats.needsReview}
        color="yellow"
        trend="-3%"
      />
      <StatCard
        icon={TrendingUp}
        label="Emerging"
        value={stats.emerging}
        color="blue"
        trend="+24%"
      />
    </div>
  )
}
