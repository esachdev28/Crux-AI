# CruxAI - Connecting Facts, Restoring Faith

A real-time agentic AI misinformation detection and fact verification system built for impact at hackathons and beyond.

## Overview

CruxAI is a cutting-edge platform that continuously scans multiple sources for emerging misinformation, verifies claims using APIs and RAG datasets, performs credibility scoring, and activates crisis mode for emergency situations.

### Key Features

- **Real-Time Monitoring**: Scans Twitter/X, RSS feeds, news, Reddit, and simulated WhatsApp sources
- **4-Agent AI Orchestration**: Specialized agents for scanning, verifying, scoring, and explaining
- **Multi-Source Verification**: Google Fact Check API, PolitiFact, Snopes datasets
- **Credibility Scoring**: Multi-dimensional analysis (source reliability, evidence strength, historical trustworthiness)
- **Crisis Mode**: Auto-detection of disaster/pandemic/election/security keywords with emergency alerts
- **Bilingual Support**: English & Hindi for global accessibility
- **Real-Time Dashboard**: Live claim feeds, trending rumors, agent activity monitoring
- **Evidence Explorer**: Comprehensive fact-check database with source traceability

## Architecture

\`\`\`
CruxAI/
├── app/
│   ├── page.tsx                 # Main dashboard
│   ├── evidence/page.tsx        # Evidence explorer
│   ├── agents/page.tsx          # Agent monitor
│   ├── scoring/page.tsx         # Credibility scoring
│   ├── crisis/page.tsx          # Crisis alerts
│   ├── api/
│   │   ├── verify/route.ts      # Fact-check API
│   │   ├── scan/route.ts        # Source scanning API
│   │   ├── score/route.ts       # Credibility scoring API
│   │   ├── explain/route.ts     # Explanation generation API
│   │   └── crisis/route.ts      # Crisis detection API
│   ├── layout.tsx
│   └── globals.css
├── components/
│   ├── header.tsx
│   ├── navigation.tsx
│   ├── crisis-mode.tsx
│   ├── dashboard.tsx
│   ├── bilingual-toggle.tsx
│   ├── feed/
│   │   ├── misinformation-feed.tsx
│   │   └── claim-card.tsx
│   ├── stats/
│   │   ├── crisis-stats.tsx
│   │   └── stat-card.tsx
│   ├── charts/
│   │   └── trending-rumors.tsx
│   ├── evidence/
│   │   ├── evidence-explorer.tsx
│   │   └── evidence-detail.tsx
│   ├── agents/
│   │   ├── agent-monitor.tsx
│   │   ├── agent-card.tsx
│   │   └── activity-log.tsx
│   ├── fact-check/
│   │   └── fact-check-widget.tsx
│   └── scoring/
│       └── credibility-radar.tsx
├── lib/
│   ├── mock-data.ts             # Simulated data generation
│   ├── crisis-detection.ts      # Crisis keyword detection
│   └── translations.ts          # Bilingual translations
└── public/

\`\`\`

## The 4 AI Agents

### ScanAgent
- **Function**: Continuously scans multiple sources every 30 seconds
- **Tasks**: Extracts claims, detects trending keywords, identifies emerging rumors
- **Output**: Suspicious items queued for verification

### VerifyAgent
- **Function**: Runs fact-check APIs and searches RAG datasets
- **Tasks**: Fact Check API queries, embedding search, evidence extraction
- **Output**: Truth status (TRUE/FALSE/MIXED/UNVERIFIED)

### ScoreAgent
- **Function**: Calculates multi-dimensional credibility scores
- **Metrics**: 
  - Source reliability score
  - Evidence strength score
  - Historical trustworthiness
  - Sentiment analysis
  - Stance detection
- **Output**: Final credibility rating (0-10)

### ExplainAgent
- **Function**: Creates human-friendly explanations
- **Languages**: English + Hindi
- **Output**: Simple language summaries for dashboard and messaging apps

## Crisis Mode

CruxAI automatically detects crisis keywords and activates emergency response:

### Monitored Categories
- **Disasters**: Earthquake, flood, tsunami, cyclone, hurricane, tornado
- **Pandemic**: Virus, outbreak, epidemic, pandemic, disease
- **Political**: Election, riot, protest, government, coup, unrest
- **Security**: Attack, explosion, shooting, terror, threat
- **Health**: Healthcare, hospital, emergency, casualty, injury

### Crisis Response
- Prioritizes government/health authority information
- Marks unverified claims as potential misinformation
- Broadcasts verified updates instantly
- Enables bilingual alerts

## Key Pages

### Dashboard (`/`)
- Real-time claim stream with status badges
- Stats cards (Verified, False, Needs Review, Emerging)
- Trending rumors with mention counts
- Live updates every 8 seconds

### Evidence Explorer (`/evidence`)
- Full fact-check database
- Claims with source count and credibility scores
- Detailed evidence breakdown per claim
- Source credibility ratings

### Agent Monitor (`/agents`)
- Real-time agent performance metrics
- Task counts and processing status
- Activity log with live updates
- Agent status indicators

### Credibility Scoring (`/scoring`)
- Quick fact-check widget
- Multi-dimensional credibility radar
- Detailed score breakdown
- Source analysis

### Crisis Alerts (`/crisis`)
- Active crisis alerts with severity levels
- Verified/unverified status
- Recommended actions for crisis response
- Bilingual alert interface

## API Endpoints

### POST /api/verify
Fact-checks a claim and returns verification result.

\`\`\`json
{
  "claim": "Claim text here",
  "status": "TRUE | FALSE | MIXED | UNVERIFIED",
  "confidence": 85,
  "credibilityScore": "8.2",
  "sources": [...],
  "explanation": "..."
}
\`\`\`

### GET /api/scan
Simulates ScanAgent scanning multiple sources.

\`\`\`json
{
  "sourcesScanned": 4,
  "claimsDetected": 156,
  "trendingKeywords": [...],
  "crisisKeywordDetected": false
}
\`\`\`

### POST /api/score
Calculates credibility score for a claim.

\`\`\`json
{
  "claimId": "claim-123",
  "sourceReliabilityScore": "8.2",
  "evidenceStrengthScore": "7.9",
  "historicalTrustworthinessScore": "8.5",
  "finalCredibilityScore": "8.2"
}
\`\`\`

### POST /api/explain
Generates bilingual explanations.

\`\`\`json
{
  "claim": "...",
  "simpleExplanation": "...",
  "language": "en | hi",
  "credibilityLevel": "high | low"
}
\`\`\`

### GET /api/crisis
Detects crisis keywords and generates alerts.

\`\`\`json
{
  "crisisDetected": true,
  "alerts": [...],
  "recommendedActions": [...]
}
\`\`\`

## Technologies Used

- **Framework**: Next.js 16 with App Router
- **UI**: shadcn/ui + Tailwind CSS v4
- **Real-Time**: WebSocket-ready components
- **Language**: TypeScript
- **Styling**: OKLch color space for advanced theming
- **Animations**: Custom animations for alerts and real-time updates

## Getting Started

### Installation

\`\`\`bash
# Clone the project
git clone <repo-url>

# Install dependencies (via shadcn CLI or manual npm install)
npm install

# Run development server
npm run dev

# Open http://localhost:3000
\`\`\`

### Environment Variables

Currently runs with simulated data. To integrate real APIs:

\`\`\`env
NEXT_PUBLIC_GOOGLE_FACTCHECK_API_KEY=your_api_key
NEXT_PUBLIC_POLITIFACT_API_KEY=your_api_key
NEXT_PUBLIC_SNOPES_API_KEY=your_api_key
\`\`\`

## Design System

### Color Palette
- **Primary**: Deep purple (RGB 102, 51, 153)
- **Secondary**: Indigo (RGB 75, 0, 130)
- **Accent**: Bright cyan/green (RGB 0, 255, 200)
- **Background**: Deep dark (RGB 20, 20, 30)
- **Foreground**: Off-white (RGB 250, 250, 255)

### Typography
- **Headings**: Geist (sans-serif)
- **Body**: Geist (sans-serif)
- **Code**: Geist Mono

## Deployment

### Option 1: Vercel (Recommended)
\`\`\`bash
npm run deploy
\`\`\`

### Option 2: Docker
\`\`\`bash
docker build -t cruxai .
docker run -p 3000:3000 cruxai
\`\`\`

## Future Enhancements

- Integration with real fact-check APIs
- WebSocket for true real-time updates
- Vector database (FAISS/Pinecone) for RAG
- WhatsApp/Telegram bot integration
- Advanced sentiment analysis
- Multi-language support expansion
- ML model fine-tuning
- Mobile app version

## Team & Credits

Built for hackathons to demonstrate cutting-edge AI agent orchestration for social good.

## License

MIT

---

**CruxAI**: Connecting Facts, Restoring Faith in the age of information overload.
