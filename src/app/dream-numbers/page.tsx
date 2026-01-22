'use client';

import { dreamNumbers } from '@/lib/dreamNumbers';
import { useState } from 'react';
import Link from 'next/link';

export default function DreamNumbersPage() {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredDreams = dreamNumbers.filter((item) =>
        item.dream.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <main className="min-h-screen bg-gray-50 flex flex-col items-center py-8 px-4 font-sans">
            <header className="flex flex-col items-center mb-6 w-full">
                <h1 className="text-3xl md:text-5xl font-black text-[var(--color-navy)] mb-2 uppercase text-center drop-shadow-sm">
                    Dream Numbers
                </h1>
                <div className="h-1 w-24 bg-gradient-to-r from-[var(--color-saffron)] to-[var(--color-india-green)] rounded-full"></div>
            </header>

            <div className="w-full max-w-2xl mb-8">
                <input
                    type="text"
                    placeholder="Search for your dream (e.g., Snake)..."
                    className="w-full p-4 border-2 border-[var(--color-navy)] text-xl font-bold rounded-xl shadow-lg focus:outline-none focus:ring-4 focus:ring-orange-200 transition-all placeholder-gray-400 text-gray-700"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            <div className="w-full max-w-2xl bg-white shadow-xl border-0 rounded-xl overflow-hidden mb-8">
                <table className="w-full text-left border-collapse">
                    <thead className="bg-[var(--color-navy)] text-white">
                        <tr>
                            <th className="p-4 text-xl uppercase tracking-wider w-1/2 font-black border-b-4 border-orange-500">Dream</th>
                            <th className="p-4 text-xl uppercase tracking-wider w-1/2 font-black border-b-4 border-green-600">Numbers</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredDreams.length > 0 ? (
                            filteredDreams.map((item, index) => (
                                <tr key={index} className={index % 2 === 0 ? 'bg-indigo-50' : 'bg-white'}>
                                    <td className="p-4 border-b border-gray-100 text-lg font-bold text-[var(--color-navy)] font-sans">
                                        {item.dream}
                                    </td>
                                    <td className="p-4 border-b border-gray-100 text-lg font-black text-orange-600 font-mono tracking-widest">
                                        {item.numbers}
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={2} className="p-8 text-center text-gray-500 font-bold text-lg">
                                    No dreams found matching "{searchTerm}"
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            <div className="mt-4 flex flex-wrap gap-4 justify-center w-full max-w-2xl">
                <Link
                    href="/"
                    className="bg-white hover:bg-gray-100 text-[var(--color-navy)] font-bold py-3 px-8 rounded-xl shadow-md border-b-4 border-gray-200 transition-all active:scale-95 text-lg flex-1 text-center min-w-[200px]"
                >
                    &larr; Back to Home
                </Link>
                <Link
                    href="/common-numbers"
                    className="bg-gradient-green text-white font-bold py-3 px-8 rounded-xl shadow-lg border-b-4 border-green-800 transition-all active:scale-95 text-lg flex-1 text-center min-w-[200px]"
                >
                    Common Numbers
                </Link>
            </div>
        </main>
    );
}
