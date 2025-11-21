'use client'

import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

interface CredibilityMetrics {
  sourceReliability: number
  evidenceStrength: number
  trustworthiness: number
  consistency: number
  expertConsensus: number
}

export default function CredibilityRadar({ metrics }: { metrics: CredibilityMetrics }) {
  return (
    <Card className="border-border/40 bg-card/50 backdrop-blur-sm">
      <CardHeader>
        <CardTitle>Credibility Analysis</CardTitle>
        <CardDescription>Multi-dimensional credibility assessment</CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        {Object.entries(metrics).map(([key, value]) => (
          <div key={key}>
            <div className="flex items-center justify-between text-sm mb-1">
              <span className="text-foreground capitalize">
                {key.replace(/([A-Z])/g, ' $1').trim()}
              </span>
              <span className="font-bold text-accent">{(value * 10).toFixed(0)}/100</span>
            </div>
            <div className="w-full h-2 rounded-full bg-background/50 border border-border/30 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-primary to-accent transition-all"
                style={{ width: `${value * 10}%` }}
              />
            </div>
          </div>
        ))}

        <div className="pt-4 border-t border-border/30">
          <div className="text-center">
            <p className="text-sm text-muted-foreground mb-1">Overall Score</p>
            <p className="text-3xl font-bold text-accent">
              {((Object.values(metrics).reduce((a, b) => a + b) / Object.keys(metrics).length) * 10).toFixed(1)}
              /10
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
