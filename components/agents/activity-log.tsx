'use client'

import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { generateActivityLogs } from '@/lib/mock-data'

export default function ActivityLog() {
  const [logs, setLogs] = useState(generateActivityLogs(8))

  useEffect(() => {
    const interval = setInterval(() => {
      setLogs(prev => {
        const newLog = generateActivityLogs(1)[0]
        return [newLog, ...prev.slice(0, 7)]
      })
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  return (
    <Card className="border-border/40 bg-card/50 backdrop-blur-sm h-full">
      <CardHeader className="border-b border-border/40">
        <CardTitle className="text-lg">Activity Feed</CardTitle>
        <CardDescription>Latest agent operations</CardDescription>
      </CardHeader>

      <CardContent className="pt-4">
        <div className="space-y-2 text-xs">
          {logs.map((log, i) => (
            <div key={i} className="p-2 rounded border border-border/30 bg-background/50">
              <div className="flex items-start justify-between gap-2">
                <p className="text-muted-foreground">{log.agent}</p>
                <span className={`${
                  log.type === 'success' ? 'text-accent' :
                  log.type === 'warning' ? 'text-yellow-400' :
                  'text-red-400'
                } whitespace-nowrap`}>{log.type}</span>
              </div>
              <p className="text-foreground/70 mt-1">{log.message}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
