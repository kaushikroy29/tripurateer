'use client';

import { updateResult, updateSettings, updateCommonNumbers, updateDreamNumbers } from '../actions';
import { logout } from '@/lib/auth';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

type TabType = 'results' | 'common' | 'dreams' | 'settings';

export default function AdminPage() {
    const today = new Date().toISOString().split('T')[0];
    const [message, setMessage] = useState('');
    const [activeTab, setActiveTab] = useState<TabType>('results');
    const [dreamRows, setDreamRows] = useState([{ dream: '', numbers: '' }]);
    const router = useRouter();

    function showMessage(text: string) {
        setMessage(text);
        setTimeout(() => setMessage(''), 3000);
    }

    async function handleResultUpdate(formData: FormData) {
        const res = await updateResult(formData);
        if (res?.success) showMessage('Result updated successfully!');
    }

    async function handleSettingsUpdate(formData: FormData) {
        const res = await updateSettings(formData);
        if (res?.success) showMessage('Settings updated successfully!');
    }

    async function handleCommonNumbersUpdate(formData: FormData) {
        const res = await updateCommonNumbers(formData);
        if (res?.success) showMessage('Common numbers updated!');
    }

    async function handleDreamNumbersUpdate(formData: FormData) {
        // Inject the dreams JSON into formData
        formData.set('dreams', JSON.stringify(dreamRows.filter(r => r.dream.trim() || r.numbers.trim())));
        const res = await updateDreamNumbers(formData);
        if (res?.success) showMessage('Dream numbers updated!');
    }

    async function handleLogout() {
        await logout();
        router.push('/admin/login');
        router.refresh();
    }

    function addDreamRow() {
        setDreamRows([...dreamRows, { dream: '', numbers: '' }]);
    }

    function removeDreamRow(index: number) {
        setDreamRows(dreamRows.filter((_, i) => i !== index));
    }

    function updateDreamRow(index: number, field: 'dream' | 'numbers', value: string) {
        const updated = [...dreamRows];
        updated[index][field] = value;
        setDreamRows(updated);
    }

    const tabs: { key: TabType; label: string; icon: string }[] = [
        { key: 'results', label: 'RESULTS', icon: '📝' },
        { key: 'common', label: 'COMMON', icon: '🎯' },
        { key: 'dreams', label: 'DREAMS', icon: '💭' },
        { key: 'settings', label: 'SETTINGS', icon: '⚙️' },
    ];

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

                {/* Tab Navigation */}
                <div className="grid grid-cols-4 p-1 bg-gray-100/50 rounded-xl mb-8 gap-1 border border-gray-100">
                    {tabs.map((tab) => (
                        <button
                            key={tab.key}
                            onClick={() => setActiveTab(tab.key)}
                            className={`py-2 rounded-lg font-black text-xs transition-all ${activeTab === tab.key ? 'bg-white text-[var(--color-navy)] shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                        >
                            {tab.icon}<br />{tab.label}
                        </button>
                    ))}
                </div>

                {/* Results Tab */}
                {activeTab === 'results' && (
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
                )}

                {/* Common Numbers Tab */}
                {activeTab === 'common' && (
                    <form action={handleCommonNumbersUpdate} className="flex flex-col gap-6">
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

                        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                            <h3 className="font-bold text-lg mb-3 text-blue-800 uppercase flex items-center gap-2">
                                🎯 Common Numbers
                            </h3>
                            <div className="flex flex-col gap-4">
                                <div>
                                    <label className="block font-bold mb-1 text-gray-700 text-sm">Direct Numbers</label>
                                    <input
                                        name="direct"
                                        type="text"
                                        placeholder="e.g. 57, 82, 12, 49, 05"
                                        className="w-full border-2 border-gray-300 p-3 rounded text-lg font-black focus:border-blue-500 outline-none"
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block font-bold mb-1 text-gray-700 text-sm">House</label>
                                        <input
                                            name="house"
                                            type="text"
                                            placeholder="e.g. 5, 8"
                                            className="w-full border-2 border-gray-300 p-3 rounded text-center text-lg font-black focus:border-purple-500 outline-none"
                                        />
                                    </div>
                                    <div>
                                        <label className="block font-bold mb-1 text-gray-700 text-sm">Ending</label>
                                        <input
                                            name="ending"
                                            type="text"
                                            placeholder="e.g. 2, 7"
                                            className="w-full border-2 border-gray-300 p-3 rounded text-center text-lg font-black focus:border-pink-500 outline-none"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="mt-4 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white font-black py-4 rounded-xl text-lg transition-all shadow-lg active:scale-95 uppercase tracking-wider"
                        >
                            Publish Common Numbers
                        </button>
                    </form>
                )}

                {/* Dream Numbers Tab */}
                {activeTab === 'dreams' && (
                    <form action={handleDreamNumbersUpdate} className="flex flex-col gap-6">
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

                        <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                            <div className="flex justify-between items-center mb-3">
                                <h3 className="font-bold text-lg text-purple-800 uppercase flex items-center gap-2">
                                    💭 Dream Numbers
                                </h3>
                                <button
                                    type="button"
                                    onClick={addDreamRow}
                                    className="bg-purple-600 text-white px-3 py-1 rounded-full text-xs font-bold hover:bg-purple-700 transition-colors"
                                >
                                    + Add Row
                                </button>
                            </div>

                            <div className="flex flex-col gap-3 max-h-[400px] overflow-y-auto pr-1">
                                {dreamRows.map((row, index) => (
                                    <div key={index} className="flex gap-2 items-center bg-white p-2 rounded-lg border border-purple-100">
                                        <input
                                            type="text"
                                            placeholder="Dream (e.g. Snake)"
                                            value={row.dream}
                                            onChange={(e) => updateDreamRow(index, 'dream', e.target.value)}
                                            className="flex-1 border-2 border-gray-200 p-2 rounded text-sm font-bold focus:border-purple-500 outline-none"
                                        />
                                        <input
                                            type="text"
                                            placeholder="Numbers (e.g. 7, 9)"
                                            value={row.numbers}
                                            onChange={(e) => updateDreamRow(index, 'numbers', e.target.value)}
                                            className="flex-1 border-2 border-gray-200 p-2 rounded text-sm font-black font-mono focus:border-purple-500 outline-none"
                                        />
                                        {dreamRows.length > 1 && (
                                            <button
                                                type="button"
                                                onClick={() => removeDreamRow(index)}
                                                className="text-red-500 hover:text-red-700 font-black text-lg px-1"
                                                title="Remove row"
                                            >
                                                ✕
                                            </button>
                                        )}
                                    </div>
                                ))}
                            </div>
                            <p className="text-xs text-purple-600 mt-2 font-semibold">
                                {dreamRows.filter(r => r.dream.trim()).length} dream(s) added
                            </p>
                        </div>

                        <button
                            type="submit"
                            className="mt-4 bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-700 hover:to-purple-600 text-white font-black py-4 rounded-xl text-lg transition-all shadow-lg active:scale-95 uppercase tracking-wider"
                        >
                            Publish Dream Numbers
                        </button>
                    </form>
                )}

                {/* Settings Tab */}
                {activeTab === 'settings' && (
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
