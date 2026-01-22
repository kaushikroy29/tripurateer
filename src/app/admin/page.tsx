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
        <main className="min-h-screen bg-gray-100 flex flex-col items-center py-10 px-4">
            <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-lg border-2 border-black">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold uppercase">Admin Panel</h1>
                    <button
                        onClick={handleLogout}
                        className="text-red-600 hover:text-red-800 font-bold text-sm underline"
                    >
                        Logout
                    </button>
                </div>

                <div className="flex mb-6 border-b border-gray-200">
                    <button
                        onClick={() => setSettingsTab(false)}
                        className={`flex-1 py-2 font-bold ${!settingsTab ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
                    >
                        Results
                    </button>
                    <button
                        onClick={() => setSettingsTab(true)}
                        className={`flex-1 py-2 font-bold ${settingsTab ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
                    >
                        Settings
                    </button>
                </div>

                {!settingsTab ? (
                    <form action={handleResultUpdate} className="flex flex-col gap-6">
                        <div>
                            <label className="block font-bold mb-1">Date</label>
                            <input
                                name="date"
                                type="date"
                                defaultValue={today}
                                required
                                className="w-full border-2 border-gray-300 p-2 rounded text-lg"
                            />
                        </div>

                        {/* Day Teer Section */}
                        <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
                            <h3 className="font-bold text-lg mb-3 text-orange-800 uppercase flex items-center gap-2">
                                ☀️ Day Teer <span className="text-xs bg-orange-200 px-2 py-0.5 rounded text-orange-800">3:45 PM / 4:45 PM</span>
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
                                🌙 Night Teer <span className="text-xs bg-indigo-200 px-2 py-0.5 rounded text-indigo-800">9:10 PM / 10:10 PM</span>
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
                            className="mt-2 bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-lg text-lg transition-colors shadow-md"
                        >
                            Save Results
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
                            className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded text-lg transition-colors"
                        >
                            Update Settings
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
