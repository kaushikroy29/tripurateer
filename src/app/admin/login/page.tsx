'use client';

import { useState } from 'react';
import { login } from '@/lib/auth';
import { useRouter } from 'next/navigation';

export default function AdminLoginPage() {
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    async function handleLogin(formData: FormData) {
        setLoading(true);
        setError('');

        const result = await login(formData);

        if (result.success) {
            router.push('/admin');
            router.refresh();
        } else {
            setError(result.error || 'Login failed');
        }
        setLoading(false);
    }

    return (
        <main className="min-h-screen bg-gradient-to-b from-orange-50 via-white to-green-50 flex items-center justify-center px-4">
            <div className="w-full max-w-sm bg-white p-8 rounded-2xl shadow-2xl border-t-4 border-[var(--color-saffron)]">
                <h1 className="text-2xl font-black text-center text-[var(--color-navy)] mb-6 uppercase">
                    🔐 Admin Login
                </h1>

                <form action={handleLogin} className="flex flex-col gap-4">
                    <div>
                        <label className="block font-bold mb-1 text-gray-700">Username</label>
                        <input
                            name="username"
                            type="text"
                            required
                            autoComplete="username"
                            className="w-full border-2 border-gray-300 p-3 rounded-lg text-lg focus:border-blue-500 focus:outline-none"
                            placeholder="Enter username"
                        />
                    </div>

                    <div>
                        <label className="block font-bold mb-1 text-gray-700">Password</label>
                        <input
                            name="password"
                            type="password"
                            required
                            autoComplete="current-password"
                            className="w-full border-2 border-gray-300 p-3 rounded-lg text-lg focus:border-blue-500 focus:outline-none"
                            placeholder="Enter password"
                        />
                    </div>

                    {error && (
                        <div className="p-3 bg-red-100 text-red-700 rounded-lg text-center font-bold">
                            {error}
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="mt-2 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold py-3 rounded-lg text-lg transition-all disabled:opacity-50"
                    >
                        {loading ? 'Logging in...' : 'Login'}
                    </button>
                </form>

                <div className="mt-6 pt-4 border-t border-gray-200">
                    <a href="/" className="block text-center text-blue-600 underline">← Back to Home</a>
                </div>
            </div>
        </main>
    );
}
