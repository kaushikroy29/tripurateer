'use server';

import { saveResult, updateSiteSettings, saveCommonNumbers, saveDreamNumbers } from '@/lib/storage';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function updateResult(formData: FormData) {
    const date = formData.get('date') as string;
    const round1 = formData.get('round1') as string;
    const round2 = formData.get('round2') as string;
    const nightRound1 = formData.get('nightRound1') as string;
    const nightRound2 = formData.get('nightRound2') as string;

    if (!date) return { error: 'Date is required' };

    try {
        await saveResult({
            date,
            round1: round1 || '',
            round2: round2 || '',
            night_round1: nightRound1 || '',
            night_round2: nightRound2 || '',
        });
    } catch (e) {
        console.error('Failed to update result:', e);
        return { error: 'Failed to update result' };
    }

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

export async function updateCommonNumbers(formData: FormData) {
    const date = formData.get('date') as string;
    const direct = formData.get('direct') as string;
    const house = formData.get('house') as string;
    const ending = formData.get('ending') as string;

    if (!date) return { error: 'Date is required' };

    try {
        await saveCommonNumbers({
            date,
            direct: direct || '',
            house: house || '',
            ending: ending || '',
        });
    } catch (e) {
        console.error('Failed to update common numbers:', e);
        return { error: 'Failed to update common numbers' };
    }

    revalidatePath('/common-numbers');
    revalidatePath('/admin');

    return { success: true };
}

export async function updateDreamNumbers(formData: FormData) {
    const date = formData.get('date') as string;
    const dreamsJson = formData.get('dreams') as string;

    if (!date) return { error: 'Date is required' };

    try {
        const dreams = JSON.parse(dreamsJson || '[]');
        await saveDreamNumbers({
            date,
            dreams,
        });
    } catch (e) {
        console.error('Failed to update dream numbers:', e);
        return { error: 'Failed to update dream numbers' };
    }

    revalidatePath('/dream-numbers');
    revalidatePath('/admin');

    return { success: true };
}
