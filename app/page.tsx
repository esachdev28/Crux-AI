'use client'

import { useState, useEffect } from 'react'
import Header from '@/components/header'
import Dashboard from '@/components/dashboard'
import CrisisMode from '@/components/crisis-mode'
import Navigation from '@/components/navigation'

export default function Home() {
  const [crisisMode, setCrisisMode] = useState(false)
  const [crisisKeywords] = useState(['earthquake', 'flood', 'virus', 'election', 'riot', 'attack'])

  // Simulate crisis detection
  useEffect(() => {
    const timer = setInterval(() => {
      // Randomly trigger crisis mode for demo
      const randomTrigger = Math.random() > 0.95
      setCrisisMode(randomTrigger)
    }, 30000)

    return () => clearInterval(timer)
  }, [])

  if (crisisMode) {
    return <CrisisMode onDismiss={() => setCrisisMode(false)} />
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <Header />
      <Dashboard />
    </div>
  )
}
