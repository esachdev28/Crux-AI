'use client'

import React, { useState, useEffect } from 'react'
import Navigation from '@/components/navigation'
import Header from '@/components/header'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { AlertTriangle, MapPin, Share2, Bell } from 'lucide-react'
import { Button } from '@/components/ui/button'
import BilingualToggle from '@/components/bilingual-toggle'

export default function CrisisPage() {
  const [language, setLanguage] = useState<'en' | 'hi'>('en')
  const [crisisAlerts, setCrisisAlerts] = useState<any[]>([])

  useEffect(() => {
    const fetchAlerts = async () => {
      try {
        const res = await fetch('/api/crisis')
        const data = await res.json()
        setCrisisAlerts(data.alerts || [])
      } catch (error) {
        console.error('Failed to fetch crisis alerts:', error)
      }
    }

    fetchAlerts()
    const interval = setInterval(fetchAlerts, 10000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header with Language Toggle */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <Bell className="w-6 h-6 text-destructive" />
            <h1 className="text-2xl font-bold text-foreground">
              {language === 'en' ? 'Crisis Alerts' : 'संकट सूचनाएं'}
            </h1>
          </div>
          <BilingualToggle onLanguageChange={setLanguage} />
        </div>

        {/* Active Alerts */}
        {crisisAlerts.length > 0 ? (
          <div className="space-y-4">
            {crisisAlerts.map(alert => (
              <Card
                key={alert.id}
                className="border-destructive/50 bg-destructive/10 backdrop-blur-sm"
              >
                <CardHeader className="border-b border-destructive/30">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-destructive">{alert.title}</CardTitle>
                      <CardDescription className="text-destructive/80 mt-1">
                        {alert.keywords.join(', ')}
                      </CardDescription>
                    </div>
                    <Badge
                      className={
                        alert.severity === 'CRITICAL'
                          ? 'bg-red-500/20 text-red-400'
                          : alert.severity === 'HIGH'
                          ? 'bg-orange-500/20 text-orange-400'
                          : 'bg-yellow-500/20 text-yellow-400'
                      }
                    >
                      {alert.severity}
                    </Badge>
                  </div>
                </CardHeader>

                <CardContent className="pt-6">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 text-sm">
                      <MapPin className="w-4 h-4 text-muted-foreground" />
                      <span className="text-foreground">{alert.region}</span>
                      <span className="ml-auto text-muted-foreground">
                        {alert.verified ? '✓ Verified' : '⚠ Unverified'}
                      </span>
                    </div>

                    <div className="flex gap-2 pt-2">
                      <Button variant="default" size="sm">
                        <Bell className="w-4 h-4 mr-2" />
                        {language === 'en' ? 'Broadcast Alert' : 'सूचना प्रसारित करें'}
                      </Button>
                      <Button variant="outline" size="sm">
                        <Share2 className="w-4 h-4 mr-2" />
                        {language === 'en' ? 'Share' : 'साझा करें'}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="border-border/40 bg-card/50 backdrop-blur-sm">
            <CardContent className="pt-12 text-center">
              <AlertTriangle className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
              <p className="text-muted-foreground">
                {language === 'en'
                  ? 'No active crisis alerts at this moment'
                  : 'इस समय कोई सक्रिय संकट सूचना नहीं'}
              </p>
            </CardContent>
          </Card>
        )}

        {/* Recommended Actions */}
        <Card className="mt-8 border-border/40 bg-card/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>
              {language === 'en' ? 'Recommended Actions' : 'अनुशंसित कार्य'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm text-foreground">
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-accent" />
                {language === 'en'
                  ? 'Prioritize verified government and health authority updates'
                  : 'सत्यापित सरकार और स्वास्थ्य प्राधिकरण अपडेट को प्राथमिकता दें'}
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-accent" />
                {language === 'en'
                  ? 'Flag unverified claims as potential misinformation'
                  : 'अपरिवर्तित दावों को संभावित गलत सूचना के रूप में फ्लैग करें'}
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-accent" />
                {language === 'en'
                  ? 'Push verified updates instantly to all users'
                  : 'सत्यापित अपडेट सभी उपयोगकर्ताओं को तुरंत भेजें'}
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-accent" />
                {language === 'en'
                  ? 'Enable bilingual alert broadcasting'
                  : 'द्विभाषी अलर्ट प्रसारण सक्षम करें'}
              </li>
            </ul>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
