'use client'

import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { TrendingUp } from 'lucide-react'

const rumors = [
  { text: 'Celebrity health claim', mentions: 2847, trend: '+156%' },
  { text: 'Political statement fact-check', mentions: 2103, trend: '+89%' },
  { text: 'Viral tech announcement', mentions: 1856, trend: '+234%' },
  { text: 'Health misinformation', mentions: 1243, trend: '-12%' },
  { text: 'Election fraud allegations', mentions: 987, trend: '+45%' },
]

export default function TrendingRumors() {
  return (
    <Card className="border-border/40 bg-card/50 backdrop-blur-sm h-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-accent" />
          Trending Claims
        </CardTitle>
        <CardDescription>Top mentions this hour</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        {rumors.map((rumor, i) => (
          <div key={i} className="p-3 rounded-lg bg-background/50 border border-border/30 space-y-1">
            <p className="text-sm font-medium text-foreground line-clamp-1">{rumor.text}</p>
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">{rumor.mentions} mentions</span>
              <span className="text-accent font-medium">{rumor.trend}</span>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
