'use client'

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Loader2, CheckCircle, XCircle, HelpCircle } from 'lucide-react'

interface VerificationResult {
  claim: string
  status: 'TRUE' | 'FALSE' | 'MIXED' | 'UNVERIFIED'
  confidence: number
  sources: Array<{ name: string; credibility: number }>
  explanation: string
  credibilityScore: string
}

export default function FactCheckWidget() {
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<VerificationResult | null>(null)

  const handleVerify = async () => {
    if (!input.trim()) return

    setLoading(true)
    try {
      const res = await fetch('/api/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ claim: input }),
      })
      const data = await res.json()
      setResult(data)
    } catch (error) {
      console.error('Verification error:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="border-border/40 bg-card/50 backdrop-blur-sm">
      <CardHeader>
        <CardTitle>Quick Fact Check</CardTitle>
        <CardDescription>Enter a claim to verify its accuracy</CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="flex gap-2">
          <Input
            placeholder="Enter a claim to verify..."
            value={input}
            onChange={e => setInput(e.target.value)}
            disabled={loading}
            className="bg-background/50 border-border/30"
          />
          <Button onClick={handleVerify} disabled={loading}>
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Checking
              </>
            ) : (
              'Verify'
            )}
          </Button>
        </div>

        {result && (
          <div className="p-4 rounded-lg border border-border/30 bg-background/50 space-y-3">
            <div className="flex items-start justify-between">
              <h4 className="font-medium text-foreground">{result.claim}</h4>
              <Badge
                className={
                  result.status === 'TRUE'
                    ? 'bg-green-500/20 text-green-400'
                    : result.status === 'FALSE'
                    ? 'bg-red-500/20 text-red-400'
                    : 'bg-yellow-500/20 text-yellow-400'
                }
              >
                {result.status}
              </Badge>
            </div>

            <div className="grid grid-cols-2 gap-3 text-sm">
              <div>
                <p className="text-muted-foreground">Confidence</p>
                <p className="font-bold text-foreground">{result.confidence}%</p>
              </div>
              <div>
                <p className="text-muted-foreground">Score</p>
                <p className="font-bold text-accent">{result.credibilityScore}/10</p>
              </div>
            </div>

            <p className="text-sm text-foreground/80">{result.explanation}</p>

            <div className="pt-2 border-t border-border/30">
              <p className="text-xs text-muted-foreground mb-2">Sources analyzed:</p>
              <div className="space-y-1">
                {result.sources.map((source, i) => (
                  <div key={i} className="flex items-center justify-between text-xs">
                    <span className="text-foreground">{source.name}</span>
                    <span className="text-muted-foreground">
                      {source.credibility.toFixed(1)}/10
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
