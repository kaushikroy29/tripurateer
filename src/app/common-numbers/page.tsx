'use client';

import Link from 'next/link';

export default function CommonNumbersPage() {
    const today = new Date().toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

    // Mock data for display
    const commonNumbers = {
        direct: "57, 82, 12, 49, 05",
        house: "5, 8",
        ending: "2, 7"
    };

    return (
        <main className="min-h-screen bg-[url('/pattern.png')] bg-gray-50 flex flex-col items-center py-8 px-4 font-sans">
            <header className="flex flex-col items-center mb-6 w-full">
                <h1 className="text-3xl md:text-5xl font-black text-[var(--color-navy)] mb-2 uppercase text-center drop-shadow-sm flex items-center justify-center gap-3">
                    <img src="/teer-icon.png" alt="Decoration" className="h-12 w-auto invert" />
                    Common Numbers
                    <img src="/teer-icon.png" alt="Decoration" className="h-12 w-auto scale-x-[-1] invert" />
                </h1>
                <div className="h-1 w-24 bg-gradient-to-r from-[var(--color-saffron)] to-[var(--color-india-green)] rounded-full"></div>
            </header>

            <p className="text-xl font-bold text-gray-600 mb-8 bg-white px-6 py-2 rounded-full shadow-sm border border-gray-100">{today}</p>

            <div className="w-full max-w-2xl bg-white shadow-xl border-t-8 border-[var(--color-saffron)] rounded-xl p-6 mb-8 transform hover:scale-[1.01] transition-transform">
                <div className="mb-6 p-4 bg-yellow-50 border-l-4 border-[var(--color-saffron)] text-yellow-900 font-bold rounded-r-lg shadow-sm">
                    Disclaimer: These numbers are based on specialized calculations from past results. Success is not guaranteed.
                </div>

                <div className="grid gap-6">
                    <div className="bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 p-6 rounded-xl text-center shadow-md">
                        <h2 className="text-2xl font-black text-[var(--color-navy)] uppercase mb-2 tracking-wide">Direct Numbers</h2>
                        <p className="text-4xl md:text-5xl font-black text-blue-700 tracking-wider drop-shadow-sm">{commonNumbers.direct}</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-gradient-to-br from-purple-50 to-purple-100 border border-purple-200 p-6 rounded-xl text-center shadow-md">
                            <h2 className="text-xl font-black text-purple-900 uppercase mb-2">House</h2>
                            <p className="text-4xl font-black text-purple-700">{commonNumbers.house}</p>
                        </div>
                        <div className="bg-gradient-to-br from-pink-50 to-pink-100 border border-pink-200 p-6 rounded-xl text-center shadow-md">
                            <h2 className="text-xl font-black text-pink-900 uppercase mb-2">Ending</h2>
                            <p className="text-4xl font-black text-pink-700">{commonNumbers.ending}</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-4 flex flex-wrap gap-4 justify-center w-full max-w-2xl">
                <Link
                    href="/"
                    className="bg-white hover:bg-gray-100 text-[var(--color-navy)] font-bold py-3 px-8 rounded-xl shadow-md border-b-4 border-gray-200 transition-all active:scale-95 text-lg flex-1 text-center min-w-[200px]"
                >
                    &larr; Back to Home
                </Link>
                <Link
                    href="/dream-numbers"
                    className="bg-gradient-saffron text-white font-bold py-3 px-8 rounded-xl shadow-lg border-b-4 border-orange-700 transition-all active:scale-95 text-lg flex-1 text-center min-w-[200px]"
                >
                    Dream Numbers
                </Link>
            </div>
        </main>
    );
}
