import { supabase } from './supabase';
import { LotteryResult, CreateResultInput, CommonNumbers, DreamNumbersEntry } from './types';

export interface SiteSettings {
    noticeText: string;
    youtubeVideoId: string;
}

const defaultSettings: SiteSettings = {
    noticeText: 'Welcome to TripuraTeer.com! Results are updated daily. Stay tuned for live updates.',
    youtubeVideoId: 'jfKfPfyJRdk'
};

export async function getResultByDate(date: string): Promise<LotteryResult | null> {
    const { data, error } = await supabase
        .from('results')
        .select('*')
        .eq('date', date)
        .single();

    if (error || !data) return null;
    return data as LotteryResult;
}

export async function getPreviousResults(beforeDate: string): Promise<LotteryResult[]> {
    const { data, error } = await supabase
        .from('results')
        .select('*')
        .lt('date', beforeDate)
        .order('date', { ascending: false })
        .limit(30);

    if (error || !data) return [];
    return data as LotteryResult[];
}

export async function getAllResultDates(): Promise<string[]> {
    const { data, error } = await supabase
        .from('results')
        .select('date')
        .order('date', { ascending: false });

    if (error || !data) return [];
    return data.map(r => r.date);
}

export async function saveResult(data: CreateResultInput): Promise<LotteryResult> {
    // Check if result exists for this date
    const existing = await getResultByDate(data.date);

    if (existing) {
        // Update existing
        // Use new data if provided, otherwise keep existing data
        // This allows updating just one round without clearing others
        const { data: updated, error } = await supabase
            .from('results')
            .update({
                round1: data.round1 || existing.round1,
                round2: data.round2 || existing.round2,
                night_round1: data.night_round1 || existing.night_round1,
                night_round2: data.night_round2 || existing.night_round2
            })
            .eq('date', data.date)
            .select()
            .single();

        if (error) throw error;
        return updated as LotteryResult;
    } else {
        // Insert new
        const { data: inserted, error } = await supabase
            .from('results')
            .insert({
                date: data.date,
                round1: data.round1,
                round2: data.round2,
                night_round1: data.night_round1,
                night_round2: data.night_round2
            })
            .select()
            .single();

        if (error) throw error;
        return inserted as LotteryResult;
    }
}

export async function getSiteSettings(): Promise<SiteSettings> {
    const { data, error } = await supabase
        .from('settings')
        .select('*')
        .eq('id', 1)
        .single();

    if (error || !data) return defaultSettings;

    return {
        noticeText: data.notice_text || defaultSettings.noticeText,
        youtubeVideoId: data.youtube_video_id || defaultSettings.youtubeVideoId
    };
}

export async function updateSiteSettings(settings: Partial<SiteSettings>): Promise<SiteSettings> {
    const current = await getSiteSettings();
    const updated = { ...current, ...settings };

    const { error } = await supabase
        .from('settings')
        .upsert({
            id: 1,
            notice_text: updated.noticeText,
            youtube_video_id: updated.youtubeVideoId
        });

    if (error) {
        console.error('Supabase error:', error);
    }

    return updated;
}

// ===== Common Numbers =====

export async function getCommonNumbersByDate(date: string): Promise<CommonNumbers | null> {
    const { data, error } = await supabase
        .from('common_numbers')
        .select('*')
        .eq('date', date)
        .single();

    if (error || !data) return null;
    return data as CommonNumbers;
}

export async function saveCommonNumbers(input: Omit<CommonNumbers, 'id'>): Promise<CommonNumbers> {
    const existing = await getCommonNumbersByDate(input.date);

    if (existing) {
        const { data: updated, error } = await supabase
            .from('common_numbers')
            .update({
                direct: input.direct,
                house: input.house,
                ending: input.ending
            })
            .eq('date', input.date)
            .select()
            .single();

        if (error) throw error;
        return updated as CommonNumbers;
    } else {
        const { data: inserted, error } = await supabase
            .from('common_numbers')
            .insert({
                date: input.date,
                direct: input.direct,
                house: input.house,
                ending: input.ending
            })
            .select()
            .single();

        if (error) throw error;
        return inserted as CommonNumbers;
    }
}

// ===== Dream Numbers =====

export async function getDreamNumbersByDate(date: string): Promise<DreamNumbersEntry | null> {
    const { data, error } = await supabase
        .from('dream_numbers')
        .select('*')
        .eq('date', date)
        .single();

    if (error || !data) return null;
    return data as DreamNumbersEntry;
}

export async function saveDreamNumbers(input: Omit<DreamNumbersEntry, 'id'>): Promise<DreamNumbersEntry> {
    const existing = await getDreamNumbersByDate(input.date);

    if (existing) {
        const { data: updated, error } = await supabase
            .from('dream_numbers')
            .update({ dreams: input.dreams })
            .eq('date', input.date)
            .select()
            .single();

        if (error) throw error;
        return updated as DreamNumbersEntry;
    } else {
        const { data: inserted, error } = await supabase
            .from('dream_numbers')
            .insert({
                date: input.date,
                dreams: input.dreams
            })
            .select()
            .single();

        if (error) throw error;
        return inserted as DreamNumbersEntry;
    }
}
