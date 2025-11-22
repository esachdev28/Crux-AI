'use client'

import Header from '@/components/header'
import Dashboard from '@/components/dashboard'
import Navigation from '@/components/navigation'

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <Header />
      <Dashboard />
    </div>
  )
}
