
export interface ScanResult {
    id: string
    text: string
    source: string
    timestamp: string
    potential_harm: number
}

export class ScanAgent {
    public async scan(source: string): Promise<ScanResult[]> {
        // Simulate scanning delay
        await new Promise(resolve => setTimeout(resolve, 1000))

        // If NewsData API key is present and source is 'news', fetch real news
        if (process.env.NEWSDATA_API_KEY && (source === 'news' || source.includes('news'))) {
            try {
                const response = await fetch(`https://newsdata.io/api/1/news?apikey=${process.env.NEWSDATA_API_KEY}&language=en&q=misinformation OR fake news OR virus OR lockdown`)
                const data = await response.json()
                if (data.results) {
                    return data.results.map((article: any) => ({
                        id: article.article_id,
                        text: article.title,
                        source: article.source_id,
                        timestamp: article.pubDate,
                        potential_harm: 0.5 // Default score for now
                    }))
                }
            } catch (error) {
                console.error('Failed to fetch news:', error)
            }
        }

        // Mock data based on source
        if (source.includes('twitter') || source.includes('x.com')) {
            return [
                {
                    id: `tw-${Date.now()}`,
                    text: 'BREAKING: Government announces immediate lockdown starting tomorrow due to new virus variant!',
                    source: 'Twitter / X',
                    timestamp: new Date().toISOString(),
                    potential_harm: 0.8
                },
                {
                    id: `tw-${Date.now()}-2`,
                    text: 'Aliens landed in Nevada, photos inside.',
                    source: 'Twitter / X',
                    timestamp: new Date().toISOString(),
                    potential_harm: 0.3
                }
            ]
        }

        return [
            {
                id: `news-${Date.now()}`,
                text: 'Local elections results delayed due to counting error.',
                source: 'News Feed',
                timestamp: new Date().toISOString(),
                potential_harm: 0.6
            }
        ]
    }
}
