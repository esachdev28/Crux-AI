'use client'

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'

interface BilingualToggleProps {
  onLanguageChange: (lang: 'en' | 'hi') => void
}

export default function BilingualToggle({ onLanguageChange }: BilingualToggleProps) {
  const [language, setLanguage] = useState<'en' | 'hi'>('en')

  const handleToggle = (lang: 'en' | 'hi') => {
    setLanguage(lang)
    onLanguageChange(lang)
  }

  return (
    <div className="flex gap-2">
      <Button
        variant={language === 'en' ? 'default' : 'outline'}
        onClick={() => handleToggle('en')}
        className="text-sm"
      >
        English
      </Button>
      <Button
        variant={language === 'hi' ? 'default' : 'outline'}
        onClick={() => handleToggle('hi')}
        className="text-sm"
      >
        हिंदी
      </Button>
    </div>
  )
}
