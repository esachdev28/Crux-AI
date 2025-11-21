'use client'

import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import AgentCard from './agent-card'
import { generateAgentLogs } from '@/lib/mock-data'

export default function AgentMonitor() {
  const [agents, setAgents] = useState([
    { id: 1, name: 'ScanAgent', status: 'active' as const, tasks: 234, processed: 1840 },
    { id: 2, name: 'VerifyAgent', status: 'active' as const, tasks: 156, processed: 890 },
    { id: 3, name: 'ScoreAgent', status: 'idle' as const, tasks: 0, processed: 756 },
    { id: 4, name: 'ExplainAgent', status: 'active' as const, tasks: 89, processed: 645 },
  ])

  useEffect(() => {
    const interval = setInterval(() => {
      setAgents(prev =>
        prev.map(agent => ({
          ...agent,
          tasks: agent.status === 'active' ? agent.tasks + Math.floor(Math.random() * 10) : 0,
          processed: agent.processed + Math.floor(Math.random() * 5),
        }))
      )
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  return (
    <Card className="border-border/40 bg-card/50 backdrop-blur-sm">
      <CardHeader className="border-b border-border/40">
        <CardTitle>AI Agent Orchestration</CardTitle>
        <CardDescription>Real-time agent performance metrics</CardDescription>
      </CardHeader>

      <CardContent className="pt-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {agents.map(agent => (
            <AgentCard key={agent.id} agent={agent} />
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
