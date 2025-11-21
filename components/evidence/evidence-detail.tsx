'use client'

import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { AlertCircle, CheckCircle, LinkIcon } from 'lucide-react'

const evidenceData: { [key: string]: any } = {
  'ev-1': {
    claim: 'Vaccine causes heart issues',
    status: 'FALSE',
    confidence: 94,
    sources: [
      { name: 'WHO Report 2024', type: 'Official', credibility: 9.8 },
      { name: 'Clinical Trial Data', type: 'Research', credibility: 9.5 },
      { name: 'Medical Journal', type: 'Academic', credibility: 9.2 },
    ],
    explanation: 'Extensive clinical trials with millions of participants show no causal link between vaccines and heart issues. WHO monitoring systems track adverse events globally.',
  },
  'ev-2': {
    claim: 'Election fraud in 2024',
    status: 'UNVERIFIED',
    confidence: 45,
    sources: [
      { name: 'Election Official Records', type: 'Government', credibility: 8.9 },
      { name: 'News Investigation', type: 'Media', credibility: 7.1 },
      { name: 'Court Documents', type: 'Legal', credibility: 9.0 },
    ],
    explanation: 'Multiple claims require verification from official sources. Ongoing investigations by state election authorities.',
  },
}

export default function EvidenceDetail({ claimId }: { claimId: string }) {
  const data = evidenceData[claimId]

  if (!data) {
    return (
      <Card className="border-border/40 bg-card/50 backdrop-blur-sm">
        <CardContent className="pt-6">
          <p className="text-muted-foreground text-sm">Select a claim to view details</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="border-border/40 bg-card/50 backdrop-blur-sm">
      <CardHeader className="border-b border-border/40">
        <CardTitle>Verification Details</CardTitle>
        <CardDescription>{data.claim}</CardDescription>
      </CardHeader>

      <CardContent className="pt-6 space-y-6">
        {/* Status */}
        <div>
          <p className="text-sm text-muted-foreground mb-2">Status</p>
          <Badge variant="outline" className={data.status === 'FALSE' ? 'bg-red-500/20 text-red-400' : 'bg-yellow-500/20 text-yellow-400'}>
            {data.status}
          </Badge>
        </div>

        {/* Confidence */}
        <div>
          <p className="text-sm text-muted-foreground mb-2">Confidence Level</p>
          <div className="space-y-2">
            <div className="w-full h-2 rounded-full bg-background/50 border border-border/30 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-accent to-primary"
                style={{ width: `${data.confidence}%` }}
              />
            </div>
            <p className="text-sm font-bold">{data.confidence}%</p>
          </div>
        </div>

        {/* Sources */}
        <div>
          <p className="text-sm text-muted-foreground mb-3">Sources</p>
          <div className="space-y-2">
            {data.sources.map((source: any, i: number) => (
              <div key={i} className="p-3 rounded-lg bg-background/50 border border-border/30">
                <div className="flex items-start justify-between mb-1">
                  <p className="font-medium text-sm text-foreground">{source.name}</p>
                  <Badge variant="secondary" className="text-xs">{source.type}</Badge>
                </div>
                <p className="text-xs text-muted-foreground">Credibility: {source.credibility}/10</p>
              </div>
            ))}
          </div>
        </div>

        {/* Explanation */}
        <div>
          <p className="text-sm text-muted-foreground mb-2">Summary</p>
          <p className="text-sm text-foreground/80 leading-relaxed">{data.explanation}</p>
        </div>
      </CardContent>
    </Card>
  )
}
