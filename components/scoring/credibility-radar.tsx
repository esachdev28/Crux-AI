'use client'

import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Legend } from 'recharts'

interface CredibilityMetrics {
  sourceReliability: number
  evidenceStrength: number
  trustworthiness: number
  consistency: number
  expertConsensus: number
}

export default function CredibilityRadar({ metrics }: { metrics: CredibilityMetrics }) {
  const data = [
    { subject: 'Source Reliability', A: metrics.sourceReliability * 10, fullMark: 100 },
    { subject: 'Evidence Strength', A: metrics.evidenceStrength * 10, fullMark: 100 },
    { subject: 'Trustworthiness', A: metrics.trustworthiness * 10, fullMark: 100 },
    { subject: 'Consistency', A: metrics.consistency * 10, fullMark: 100 },
    { subject: 'Expert Consensus', A: metrics.expertConsensus * 10, fullMark: 100 },
  ]

  const overallScore = ((Object.values(metrics).reduce((a, b) => a + b, 0) / Object.keys(metrics).length) * 10).toFixed(1)

  return (
    <Card className="border-border/40 bg-card/50 backdrop-blur-sm h-full">
      <CardHeader>
        <CardTitle>Credibility Analysis</CardTitle>
        <CardDescription>Multi-dimensional credibility assessment</CardDescription>
      </CardHeader>

      <CardContent className="flex flex-col items-center">
        <div className="w-full h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
              <PolarGrid stroke="hsl(var(--border))" />
              <PolarAngleAxis dataKey="subject" tick={{ fill: 'hsl(var(--foreground))', fontSize: 12 }} />
              <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
              <Radar
                name="Credibility"
                dataKey="A"
                stroke="hsl(var(--primary))"
                fill="hsl(var(--primary))"
                fillOpacity={0.3}
              />
              <Legend />
            </RadarChart>
          </ResponsiveContainer>
        </div>

        <div className="mt-4 text-center">
          <p className="text-sm text-muted-foreground mb-1">Overall Score</p>
          <p className="text-4xl font-bold text-primary">
            {overallScore}
            <span className="text-lg text-muted-foreground font-normal">/100</span>
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
