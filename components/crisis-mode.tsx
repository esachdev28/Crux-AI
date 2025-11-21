'use client'

import React from 'react'
import { AlertTriangle, MapPin, Share2, Phone, X } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface CrisisModeProps {
  onDismiss: () => void
}

export default function CrisisMode({ onDismiss }: CrisisModeProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-950/40 via-background to-background">
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-96 h-96 bg-red-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl animate-pulse" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <AlertTriangle className="w-8 h-8 text-destructive animate-pulse" />
            <h1 className="text-3xl font-bold text-foreground">CRISIS ALERT</h1>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onDismiss}
            className="text-muted-foreground hover:text-foreground"
          >
            <X className="w-6 h-6" />
          </Button>
        </div>

        {/* Alert Cards */}
        <div className="space-y-4 mb-8">
          {[
            {
              title: 'Breaking: Major Earthquake Detected',
              region: 'Pacific Ring of Fire',
              severity: 'CRITICAL',
              verified: true,
            },
            {
              title: 'Government Emergency Alert Issued',
              region: 'Multiple Regions',
              severity: 'HIGH',
              verified: true,
            },
            {
              title: 'Misinformation Alert: False Evacuation Routes',
              region: 'Region A',
              severity: 'CRITICAL',
              verified: false,
            },
          ].map((alert, i) => (
            <div
              key={i}
              className="p-4 rounded-lg border border-destructive/50 bg-destructive/10 backdrop-blur-sm"
            >
              <div className="flex items-start justify-between mb-2">
                <div>
                  <p className="font-bold text-foreground">{alert.title}</p>
                  <div className="flex items-center gap-4 mt-2 text-sm">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <MapPin className="w-4 h-4" />
                      {alert.region}
                    </div>
                    <span className={alert.verified ? 'text-accent' : 'text-destructive'}>
                      {alert.verified ? '✓ Verified' : '⚠ Unverified'}
                    </span>
                  </div>
                </div>
                <div className="px-3 py-1 rounded-full bg-destructive/20 text-destructive text-xs font-medium">
                  {alert.severity}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3">
          <Button className="bg-primary hover:bg-primary/90" size="lg">
            <Phone className="w-4 h-4 mr-2" />
            Emergency Services
          </Button>
          <Button variant="outline" size="lg">
            <Share2 className="w-4 h-4 mr-2" />
            Share Verified Info
          </Button>
          <Button variant="ghost" size="lg" onClick={onDismiss}>
            Return to Dashboard
          </Button>
        </div>
      </div>
    </div>
  )
}
