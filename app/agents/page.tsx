'use client'

import React, { useState, useEffect } from 'react'
import Header from '@/components/header'
import Navigation from '@/components/navigation'
import AgentMonitor from '@/components/agents/agent-monitor'
import ActivityLog from '@/components/agents/activity-log'

export default function AgentsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <AgentMonitor />
          </div>
          <div>
            <ActivityLog />
          </div>
        </div>
      </main>
    </div>
  )
}
