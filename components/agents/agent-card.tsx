'use client'

import React from 'react'
import { Activity, AlertCircle, Check } from 'lucide-react'

interface AgentCardProps {
  agent: {
    id: number
    name: string
    status: 'active' | 'idle'
    tasks: number
    processed: number
  }
}

export default function AgentCard({ agent }: AgentCardProps) {
  return (
    <div className="p-4 rounded-lg border border-border/30 bg-background/50 space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-foreground">{agent.name}</h3>
        <div className="flex items-center gap-2">
          {agent.status === 'active' ? (
            <>
              <Activity className="w-4 h-4 text-accent animate-pulse" />
              <span className="text-xs font-medium text-accent">Active</span>
            </>
          ) : (
            <>
              <Check className="w-4 h-4 text-muted-foreground" />
              <span className="text-xs font-medium text-muted-foreground">Idle</span>
            </>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 text-sm">
        <div>
          <p className="text-muted-foreground text-xs">Active Tasks</p>
          <p className="text-lg font-bold text-foreground">{agent.tasks}</p>
        </div>
        <div>
          <p className="text-muted-foreground text-xs">Processed</p>
          <p className="text-lg font-bold text-accent">{agent.processed}</p>
        </div>
      </div>

      <div className="h-1 bg-background/50 rounded-full border border-border/30 overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-primary to-accent"
          style={{
            width: `${Math.min((agent.tasks / 300) * 100, 100)}%`,
          }}
        />
      </div>
    </div>
  )
}
