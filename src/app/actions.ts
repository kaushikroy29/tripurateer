'use server';

import { saveResult, updateSiteSettings } from '@/lib/storage';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function updateResult(formData: FormData) {
    const date = formData.get('date') as string;
    const round1 = formData.get('round1') as string;
    const round2 = formData.get('round2') as string;
    const nightRound1 = formData.get('nightRound1') as string;
    const nightRound2 = formData.get('nightRound2') as string;

    if (!date) return { error: 'Date is required' };

    await saveResult({
        date,
        round1: round1 || '',
        round2: round2 || '',
        night_round1: nightRound1 || '',
        night_round2: nightRound2 || '',
    });

    revalidatePath('/');
    revalidatePath('/previous-results');
    revalidatePath('/admin');

    return { success: true };
}

export async function updateSettings(formData: FormData) {
    const noticeText = formData.get('noticeText') as string;
    const youtubeVideoId = formData.get('youtubeVideoId') as string;

    await updateSiteSettings({
        noticeText,
        youtubeVideoId
    });

    revalidatePath('/');
    revalidatePath('/admin');

    return { success: true };
}
