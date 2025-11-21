'use client'

import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Search, Filter, Database } from 'lucide-react'
import { Button } from '@/components/ui/button'

const evidenceItems = [
  {
    id: 'ev-1',
    claim: 'Vaccine causes heart issues',
    sources: 12,
    credibility: 8.2,
    status: 'FALSE',
    evidence: ['Clinical trials show no correlation', 'WHO statement', '5M+ vaccinated with no issues'],
  },
  {
    id: 'ev-2',
    claim: 'Election fraud in 2024',
    sources: 34,
    credibility: 5.1,
    status: 'UNVERIFIED',
    evidence: ['Court documents', 'State election officials', 'News reports'],
  },
  {
    id: 'ev-3',
    claim: 'AI will replace all jobs',
    sources: 8,
    credibility: 4.7,
    status: 'MIXED',
    evidence: ['Economic reports', 'Tech analyses', 'Historical labor data'],
  },
  {
    id: 'ev-4',
    claim: 'New breakthrough in renewable energy',
    sources: 15,
    credibility: 9.1,
    status: 'TRUE',
    evidence: ['Published research', 'University confirmation', 'Industry experts'],
  },
]

export default function EvidenceExplorer({ onSelectClaim }: { onSelectClaim: (id: string) => void }) {
  const [searchTerm, setSearchTerm] = useState('')

  const filtered = evidenceItems.filter(item =>
    item.claim.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <Card className="border-border/40 bg-card/50 backdrop-blur-sm">
      <CardHeader className="border-b border-border/40">
        <CardTitle className="flex items-center gap-2">
          <Database className="w-5 h-5 text-accent" />
          Evidence Repository
        </CardTitle>
        <CardDescription>Fact-check database with source verification</CardDescription>
      </CardHeader>

      <CardContent className="pt-6">
        {/* Search */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search claims..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="pl-10 bg-background/50 border-border/30"
            />
          </div>
        </div>

        {/* Evidence List */}
        <div className="space-y-3">
          {filtered.map(item => (
            <button
              key={item.id}
              onClick={() => onSelectClaim(item.id)}
              className="w-full text-left p-4 rounded-lg border border-border/30 bg-background/50 hover:border-primary/50 hover:bg-primary/5 transition-all group"
            >
              <div className="flex items-start justify-between mb-2">
                <p className="font-medium text-foreground group-hover:text-primary transition-colors flex-1">
                  {item.claim}
                </p>
                <span className={`text-xs font-bold px-2 py-1 rounded-full ${
                  item.status === 'TRUE' ? 'bg-green-500/20 text-green-400' :
                  item.status === 'FALSE' ? 'bg-red-500/20 text-red-400' :
                  'bg-yellow-500/20 text-yellow-400'
                }`}>
                  {item.status}
                </span>
              </div>

              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>{item.sources} sources analyzed</span>
                <div className="flex items-center gap-1">
                  <div className="w-12 h-1 rounded-full bg-background/50 border border-border/30 overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-accent to-primary"
                      style={{ width: `${item.credibility * 10}%` }}
                    />
                  </div>
                  <span>{item.credibility.toFixed(1)}/10</span>
                </div>
              </div>
            </button>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
