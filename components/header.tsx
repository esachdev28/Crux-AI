'use client'

import React from 'react'
import { AlertCircle, Zap, Globe } from 'lucide-react'

export default function Header() {
  return (
    <header className="border-b border-border/40 bg-card/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
              <Zap className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">CruxAI</h1>
              <p className="text-xs text-muted-foreground">Fact Verification Network</p>
            </div>
          </div>

          {/* Status */}
          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-2 px-3 py-2 rounded-lg bg-accent/10 border border-accent/30">
              <Globe className="w-4 h-4 text-accent" />
              <span className="text-sm text-foreground">Active Monitoring</span>
              <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            </div>

            <div className="text-right">
              <p className="text-sm font-medium text-foreground">127 Claims</p>
              <p className="text-xs text-muted-foreground">Last 24h</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
