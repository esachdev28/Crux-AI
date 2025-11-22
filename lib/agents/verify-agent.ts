
export interface VerificationResult {
    claimId: string
    isFactChecked: boolean
    sources: Array<{ name: string, url: string, reliability: number }>
    similarClaims: Array<{ text: string, verdict: string }>
}

export class VerifyAgent {
    public async verify(claimText: string): Promise<VerificationResult> {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1500))

        const isSuspicious = claimText.toLowerCase().includes('lockdown') || claimText.toLowerCase().includes('virus')

        return {
            claimId: 'generated-id',
            isFactChecked: true,
            sources: [
                { name: 'Google Fact Check', url: 'https://toolbox.google.com/factcheck/explorer', reliability: 0.95 },
                { name: 'Snopes', url: 'https://www.snopes.com', reliability: 0.9 }
            ],
            similarClaims: isSuspicious ? [
                { text: 'Lockdown rumors debunked by health ministry', verdict: 'FALSE' }
            ] : []
        }
    }
}
