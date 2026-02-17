'use client';

import { useState } from 'react';

interface DreamNumbersListProps {
    dreams: { dream: string; numbers: string }[];
}

export default function DreamNumbersList({ dreams }: DreamNumbersListProps) {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredDreams = dreams.filter((item) =>
        item.dream.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <>
            <div className="relative z-10 w-full max-w-2xl mb-8">
                <input
                    type="text"
                    placeholder="Search for your dream (e.g., Snake)..."
                    className="w-full p-5 bg-white/90 backdrop-blur-md border border-gray-100 text-xl font-bold rounded-2xl shadow-xl focus:outline-none focus:ring-4 focus:ring-orange-100 transition-all placeholder-gray-400 text-gray-700"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            <div className="relative z-10 w-full max-w-2xl glass-card shadow-2xl border-0 rounded-2xl overflow-hidden mb-8">
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
                                    No dreams found matching &quot;{searchTerm}&quot;
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </>
    );
}
