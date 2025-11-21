'use client'

import React from 'react'
import { type LucideIcon } from 'lucide-react'

const colorMap = {
  emerald: 'from-emerald-500/20 to-emerald-500/5 border-emerald-500/30 text-emerald-400',
  red: 'from-red-500/20 to-red-500/5 border-red-500/30 text-red-400',
  yellow: 'from-yellow-500/20 to-yellow-500/5 border-yellow-500/30 text-yellow-400',
  blue: 'from-blue-500/20 to-blue-500/5 border-blue-500/30 text-blue-400',
}

export default function StatCard({
  icon: Icon,
  label,
  value,
  color,
  trend,
}: {
  icon: LucideIcon
  label: string
  value: number
  color: keyof typeof colorMap
  trend: string
}) {
  return (
    <div className={`p-4 rounded-lg border bg-gradient-to-br ${colorMap[color]}`}>
      <div className="flex items-center justify-between mb-2">
        <Icon className="w-5 h-5" />
        <span className="text-xs font-medium text-muted-foreground">{trend}</span>
      </div>
      <p className="text-2xl font-bold text-foreground">{value}</p>
      <p className="text-xs text-muted-foreground mt-1">{label}</p>
    </div>
  )
}
