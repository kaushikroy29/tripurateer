import { LotteryResult, CreateResultInput } from './types';

// In-memory store for development
let mockResults: LotteryResult[] = [
    {
        id: '1',
        date: new Date().toISOString().split('T')[0], // Today
        round1: '',
        round2: '',
    },
    {
        id: '2',
        date: new Date(Date.now() - 86400000).toISOString().split('T')[0], // Yesterday
        round1: '45',
        round2: '89',
    }
];

export interface SiteSettings {
    noticeText: string;
    youtubeVideoId: string;
}

let mockSettings: SiteSettings = {
    noticeText: 'Welcome to TripuraTeer.com! Results are updated daily. Stay tuned for live updates.',
    youtubeVideoId: 'jfKfPfyJRdk'
};

export async function getResultByDate(date: string): Promise<LotteryResult | null> {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 100));
    return mockResults.find((r) => r.date === date) || null;
}

export async function getPreviousResults(beforeDate: string): Promise<LotteryResult[]> {
    await new Promise((resolve) => setTimeout(resolve, 100));
    return mockResults
        .filter((r) => r.date < beforeDate)
        .sort((a, b) => b.date.localeCompare(a.date));
}

export async function saveResult(data: CreateResultInput): Promise<LotteryResult> {
    await new Promise((resolve) => setTimeout(resolve, 100));

    const existingIndex = mockResults.findIndex((r) => r.date === data.date);
    if (existingIndex >= 0) {
        mockResults[existingIndex] = { ...mockResults[existingIndex], ...data };
        return mockResults[existingIndex];
    } else {
        const newResult = { ...data, id: Math.random().toString(36).substring(7) };
        mockResults.push(newResult);
        return newResult;
    }
}

export async function getSiteSettings(): Promise<SiteSettings> {
    await new Promise((resolve) => setTimeout(resolve, 50));
    return mockSettings;
}

export async function updateSiteSettings(settings: Partial<SiteSettings>): Promise<SiteSettings> {
    await new Promise((resolve) => setTimeout(resolve, 50));
    mockSettings = { ...mockSettings, ...settings };
    return mockSettings;
}
