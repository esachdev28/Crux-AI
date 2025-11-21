'use client'

import React, { useState } from 'react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ChevronDown, Share2, Eye } from 'lucide-react'

interface Claim {
  id: string
  text: string
  source: string
  status: 'TRUE' | 'FALSE' | 'MIXED' | 'UNVERIFIED'
  confidence: number
  timestamp: string
}

const statusConfig = {
  TRUE: { color: 'bg-green-500/20 text-green-400 border-green-500/30', label: 'Verified True' },
  FALSE: { color: 'bg-red-500/20 text-red-400 border-red-500/30', label: 'False' },
  MIXED: { color: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30', label: 'Mixed' },
  UNVERIFIED: { color: 'bg-gray-500/20 text-gray-400 border-gray-500/30', label: 'Unverified' },
}

export default function ClaimCard({ claim }: { claim: Claim }) {
  const [expanded, setExpanded] = useState(false)
  const config = statusConfig[claim.status]

  return (
    <div className="p-4 rounded-lg border border-border/30 bg-background/50 hover:border-border/60 transition-colors space-y-3">
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <p className="text-sm text-foreground line-clamp-2">{claim.text}</p>
        </div>
        <Badge variant="outline" className={`${config.color} border shrink-0`}>
          {config.label}
        </Badge>
      </div>

      <div className="flex items-center justify-between text-xs">
        <div className="flex items-center gap-2 text-muted-foreground">
          <span>From: {claim.source}</span>
          <span>•</span>
          <span>{claim.timestamp}</span>
        </div>
        
        {/* Confidence Meter */}
        <div className="flex items-center gap-2">
          <div className="w-16 h-1 rounded-full bg-background/50 border border-border/30 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-accent to-primary transition-all"
              style={{ width: `${claim.confidence}%` }}
            />
          </div>
          <span className="text-muted-foreground">{claim.confidence}%</span>
        </div>
      </div>

      {expanded && (
        <div className="pt-3 border-t border-border/30 space-y-2 text-xs text-muted-foreground">
          <p>Evidence sources analyzed: 12</p>
          <p>Credibility score: {(7 + Math.random() * 2).toFixed(1)}/10</p>
        </div>
      )}

      <div className="flex items-center justify-between pt-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setExpanded(!expanded)}
          className="h-8 text-xs"
        >
          <ChevronDown className="w-4 h-4 mr-1" />
          {expanded ? 'Hide' : 'View'} Evidence
        </Button>

        <div className="flex gap-2">
          <Button variant="ghost" size="sm" className="h-8 text-xs">
            <Eye className="w-3 h-3" />
          </Button>
          <Button variant="ghost" size="sm" className="h-8 text-xs">
            <Share2 className="w-3 h-3" />
          </Button>
        </div>
      </div>
    </div>
  )
}
