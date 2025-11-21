'use client'

import React from 'react'
import ClaimCard from './claim-card'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

interface Claim {
  id: string
  text: string
  source: string
  status: 'TRUE' | 'FALSE' | 'MIXED' | 'UNVERIFIED'
  confidence: number
  timestamp: string
}

export default function MisinformationFeed({ claims }: { claims: Claim[] }) {
  return (
    <Card className="border-border/40 bg-card/50 backdrop-blur-sm">
      <CardHeader className="border-b border-border/40">
        <CardTitle>Real-Time Claim Stream</CardTitle>
        <CardDescription>Latest claims and verification status</CardDescription>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="space-y-3">
          {claims.map(claim => (
            <ClaimCard key={claim.id} claim={claim} />
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
