'use client';

import { dreamNumbers } from '@/lib/dreamNumbers';
import { useState } from 'react';
import Link from 'next/link';
import { FAQJsonLd, BreadcrumbJsonLd } from '@/components/JsonLd';

export default function DreamNumbersPage() {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredDreams = dreamNumbers.filter((item) =>
        item.dream.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const faqs = [
        {
            question: 'What are Teer dream numbers?',
            answer: 'Teer dream numbers are lucky numbers associated with specific dreams. In the Teer tradition, dreams are believed to predict winning numbers.'
        },
        {
            question: 'How do I find my dream number?',
            answer: 'Search for your dream in our directory. Each dream symbol is mapped to specific lucky numbers based on traditional interpretations.'
        },
        {
            question: 'Are dream numbers accurate for Teer?',
            answer: 'Dream numbers are based on traditional folklore and cultural beliefs. They are for entertainment and should not be considered guaranteed predictions.'
        }
    ];

    const breadcrumbs = [
        { name: 'Home', url: 'https://tripurateer.in' },
        { name: 'Dream Numbers', url: 'https://tripurateer.in/dream-numbers' }
    ];

    return (
        <>
            <FAQJsonLd faqs={faqs} id="dream-numbers-faq" />
            <BreadcrumbJsonLd items={breadcrumbs} />
            <main className="min-h-screen teer-background flex flex-col items-center py-8 px-4 font-sans relative">
                <div className="absolute inset-0 bg-white/10 backdrop-blur-[2px]"></div>

                <header className="relative z-10 flex flex-col items-center mb-8 w-full">
                    <div className="w-24 h-24 mb-4 animate-float">
                        <img src="/logo.png" alt="Logo" className="w-full h-full object-contain rounded-full border-2 border-white shadow-lg" />
                    </div>
                    <h1 className="text-3xl md:text-5xl font-black text-[var(--color-navy)] mb-2 uppercase text-center drop-shadow-sm flex items-center justify-center gap-3">
                        Dream Numbers
                    </h1>
                    <div className="h-1.5 w-32 bg-gradient-to-r from-[var(--color-saffron)] via-white to-[var(--color-india-green)] rounded-full shadow-sm mt-2"></div>
                </header>

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
                                        No dreams found matching "{searchTerm}"
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                <div className="relative z-10 mt-4 flex flex-wrap gap-4 justify-center w-full max-w-2xl">
                    <Link
                        href="/"
                        className="bg-white/80 backdrop-blur-sm hover:bg-white text-[var(--color-navy)] font-black py-4 px-8 rounded-2xl shadow-lg transition-all active:scale-95 text-lg flex-1 text-center min-w-[200px] border border-white"
                    >
                        &larr; BACK HOME
                    </Link>
                    <Link
                        href="/common-numbers"
                        className="bg-gradient-to-r from-green-700 to-green-600 text-white font-black py-4 px-8 rounded-2xl shadow-lg transition-all active:scale-95 text-lg flex-1 text-center min-w-[200px]"
                    >
                        COMMON NUMBERS
                    </Link>
                </div>
            </main>
        </>
    );
}

