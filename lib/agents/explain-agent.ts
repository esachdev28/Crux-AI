
export class ExplainAgent {
    public generateExplanation(claimText: string, verdict: string, lang: 'en' | 'hi' = 'en'): string {
        if (lang === 'hi') {
            if (verdict === 'FALSE') return `यह दावा गलत है। हमारे सत्यापन से पता चला है कि आधिकारिक स्रोतों ने इसका खंडन किया है।`
            if (verdict === 'VERIFIED') return `यह दावा सही है। विश्वसनीय स्रोतों द्वारा इसकी पुष्टि की गई है।`
            return `इस दावे की अभी पुष्टि नहीं हुई है। कृपया आधिकारिक सूचना की प्रतीक्षा करें।`
        }

        if (verdict === 'FALSE') return `This claim is FALSE. Our verification found that official sources have debunked this information.`
        if (verdict === 'VERIFIED') return `This claim is VERIFIED. It has been confirmed by multiple reliable sources.`
        return `This claim is UNVERIFIED. Please wait for official confirmation before sharing.`
    }
}
