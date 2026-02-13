'use client';

import { updateResult, updateSettings } from '../actions';
import { logout } from '@/lib/auth';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminPage() {
    const today = new Date().toISOString().split('T')[0];
    const [message, setMessage] = useState('');
    const [settingsTab, setSettingsTab] = useState(false);
    const router = useRouter();

    async function handleResultUpdate(formData: FormData) {
        const res = await updateResult(formData);
        if (res?.success) {
            setMessage('Result updated successfully!');
            setTimeout(() => setMessage(''), 3000);
        }
    }

    async function handleSettingsUpdate(formData: FormData) {
        const res = await updateSettings(formData);
        if (res?.success) {
            setMessage('Settings updated successfully!');
            setTimeout(() => setMessage(''), 3000);
        }
    }

    async function handleLogout() {
        await logout();
        router.push('/admin/login');
        router.refresh();
    }

    return (
        <main className="min-h-screen teer-background flex flex-col items-center py-10 px-4 relative overflow-hidden">
            <div className="absolute inset-0 bg-white/10 backdrop-blur-[2px]"></div>

            <div className="relative z-10 w-full max-w-md glass-card p-8 rounded-3xl shadow-2xl border-white/20">
                <div className="flex flex-col items-center mb-8">
                    <div className="w-20 h-20 mb-3 animate-float">
                        <img src="/logo.png" alt="Logo" className="w-full h-full object-contain rounded-full border-2 border-white shadow-lg" />
                    </div>
                    <div className="flex justify-between items-center w-full">
                        <h1 className="text-2xl font-black uppercase text-[var(--color-navy)] tracking-tight">Admin Control</h1>
                        <button
                            onClick={handleLogout}
                            className="bg-red-50 text-red-600 hover:bg-red-100 px-3 py-1 rounded-full font-bold text-xs transition-colors border border-red-100"
                        >
                            Log Out
                        </button>
                    </div>
                </div>

                <div className="flex p-1 bg-gray-100/50 rounded-xl mb-8 gap-1 border border-gray-100">
                    <button
                        onClick={() => setSettingsTab(false)}
                        className={`flex-1 py-2.5 rounded-lg font-black text-sm transition-all ${!settingsTab ? 'bg-white text-[var(--color-navy)] shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                    >
                        📝 RESULTS
                    </button>
                    <button
                        onClick={() => setSettingsTab(true)}
                        className={`flex-1 py-2.5 rounded-lg font-black text-sm transition-all ${settingsTab ? 'bg-white text-[var(--color-navy)] shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                    >
                        ⚙️ SETTINGS
                    </button>
                </div>

                {!settingsTab ? (
                    <form action={handleResultUpdate} className="flex flex-col gap-6">
                        <div className="mb-2">
                            <label className="block font-black text-xs text-[var(--color-navy)] uppercase mb-1.5 ml-1">Select Date</label>
                            <input
                                name="date"
                                type="date"
                                defaultValue={today}
                                required
                                className="w-full bg-white border border-gray-200 p-3 rounded-xl text-lg font-bold focus:ring-2 focus:ring-blue-100 focus:border-blue-400 outline-none transition-all shadow-sm"
                            />
                        </div>

                        {/* Day Teer Section */}
                        <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
                            <h3 className="font-bold text-lg mb-3 text-orange-800 uppercase flex items-center gap-2">
                                ☀️ Day Teer <span className="text-xs bg-orange-200 px-2 py-0.5 rounded text-orange-800">4:05 PM / 5:00 PM</span>
                            </h3>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block font-bold mb-1 text-gray-700 text-sm">Round 1</label>
                                    <input
                                        name="round1"
                                        type="text"
                                        placeholder="XX"
                                        maxLength={2}
                                        className="w-full border-2 border-gray-300 p-2 rounded text-center text-xl font-black focus:border-orange-500 outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="block font-bold mb-1 text-gray-700 text-sm">Round 2</label>
                                    <input
                                        name="round2"
                                        type="text"
                                        placeholder="XX"
                                        maxLength={2}
                                        className="w-full border-2 border-gray-300 p-2 rounded text-center text-xl font-black focus:border-orange-500 outline-none"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Night Teer Section */}
                        <div className="bg-indigo-50 p-4 rounded-lg border border-indigo-200">
                            <h3 className="font-bold text-lg mb-3 text-indigo-900 uppercase flex items-center gap-2">
                                🌙 Night Teer <span className="text-xs bg-indigo-200 px-2 py-0.5 rounded text-indigo-800">9:30 PM / 10:30 PM</span>
                            </h3>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block font-bold mb-1 text-gray-700 text-sm">Round 1</label>
                                    <input
                                        name="nightRound1"
                                        type="text"
                                        placeholder="XX"
                                        maxLength={2}
                                        className="w-full border-2 border-gray-300 p-2 rounded text-center text-xl font-black focus:border-indigo-500 outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="block font-bold mb-1 text-gray-700 text-sm">Round 2</label>
                                    <input
                                        name="nightRound2"
                                        type="text"
                                        placeholder="XX"
                                        maxLength={2}
                                        className="w-full border-2 border-gray-300 p-2 rounded text-center text-xl font-black focus:border-indigo-500 outline-none"
                                    />
                                </div>
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="mt-4 bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 text-white font-black py-4 rounded-xl text-lg transition-all shadow-lg active:scale-95 uppercase tracking-wider"
                        >
                            Publish Results
                        </button>
                    </form>
                ) : (
                    <form action={handleSettingsUpdate} className="flex flex-col gap-4">
                        <div>
                            <label className="block font-bold mb-1">Notice Text</label>
                            <textarea
                                name="noticeText"
                                placeholder="Enter notice message..."
                                rows={3}
                                className="w-full border-2 border-gray-300 p-2 rounded"
                            />
                        </div>
                        <div>
                            <label className="block font-bold mb-1">YouTube Video ID</label>
                            <input
                                name="youtubeVideoId"
                                type="text"
                                placeholder="e.g. jfKfPfyJRdk"
                                className="w-full border-2 border-gray-300 p-2 rounded"
                            />
                            <p className="text-xs text-gray-500 mt-1">The ID is the part after v= in the URL</p>
                        </div>

                        <button
                            type="submit"
                            className="mt-4 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white font-black py-4 rounded-xl text-lg transition-all shadow-lg active:scale-95 uppercase tracking-wider"
                        >
                            Apply Changes
                        </button>
                    </form>
                )}

                {message && (
                    <div className="mt-4 p-3 bg-green-100 text-green-800 rounded text-center font-bold animate-pulse">
                        {message}
                    </div>
                )}

                <div className="mt-6 pt-4 border-t border-gray-200">
                    <a href="/" className="block text-center text-blue-600 underline">Back to Home</a>
                </div>
            </div>
        </main>
    );
}
