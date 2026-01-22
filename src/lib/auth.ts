'use server';

import { cookies } from 'next/headers';

const ADMIN_USERNAME = process.env.ADMIN_USERNAME || 'admin';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'teer2025';
const SESSION_NAME = 'admin_session';

export async function login(formData: FormData) {
    const username = formData.get('username') as string;
    const password = formData.get('password') as string;

    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
        const cookieStore = await cookies();
        cookieStore.set(SESSION_NAME, 'authenticated', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 60 * 60 * 24, // 1 day
            path: '/',
        });
        return { success: true };
    }

    return { success: false, error: 'Invalid credentials' };
}

export async function logout() {
    const cookieStore = await cookies();
    cookieStore.delete(SESSION_NAME);
    return { success: true };
}

export async function checkAuth(): Promise<boolean> {
    const cookieStore = await cookies();
    const session = cookieStore.get(SESSION_NAME);
    return session?.value === 'authenticated';
}
