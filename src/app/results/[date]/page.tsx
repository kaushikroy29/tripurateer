import { getResultByDate } from '@/lib/storage';
import Link from 'next/link';
import type { Metadata } from 'next';
import { FAQJsonLd, BreadcrumbJsonLd } from '@/components/JsonLd';
import { notFound } from 'next/navigation';

type Props = {
    params: { date: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const date = new Date(params.date).toLocaleDateString('en-IN', {
        day: 'numeric', month: 'long', year: 'numeric'
    });

    return {
        title: `Tripura Teer Results for ${date} | Day & Night`,
        description: `Check Tripura Teer winning numbers for ${date}. View First Round and Second Round results for both Day and Night Teer games.`,
        keywords: ['Tripura Teer Result', 'Teer Result Today', `Teer Result ${date}`, 'Tripura Teer Target', 'Day Teer', 'Night Teer'],
        openGraph: {
            title: `Tripura Teer Results for ${date}`,
            description: `Winning numbers for Tripura Teer Day and Night games on ${date}.`,
            url: `https://tripurateer.in/results/${params.date}`,
        },
    };
}

export const revalidate = 3600; // Revalidate every hour

export default async function DateResultPage({ params }: Props) {
    const { date } = params;

    // Validate date format YYYY-MM-DD
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(date)) {
        notFound();
    }

    const result = await getResultByDate(date);

    // Format date for display
    const displayDate = new Date(date).toLocaleDateString('en-IN', {
        weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'
    });

    if (!result) {
        return (
            <main className="min-h-screen teer-background flex flex-col items-center py-12 px-4 font-sans relative">
                <div className="absolute inset-0 bg-white/10 backdrop-blur-[2px]"></div>
                <div className="relative z-10 text-center bg-white/90 p-8 rounded-2xl shadow-xl max-w-md w-full">
                    <h1 className="text-2xl font-bold text-[var(--color-navy)] mb-4">No Results Found</h1>
                    <p className="text-gray-600 mb-6">We couldn't find any Teer results for {displayDate}.</p>
                    <Link
                        href="/previous-results"
                        className="inline-block bg-[var(--color-navy)] text-white font-bold py-3 px-6 rounded-xl hover:bg-blue-900 transition-colors"
                    >
                        View All Results
                    </Link>
                </div>
            </main>
        );
    }

    const breadcrumbs = [
        { name: 'Home', url: 'https://tripurateer.in' },
        { name: 'Previous Results', url: 'https://tripurateer.in/previous-results' },
        { name: displayDate, url: `https://tripurateer.in/results/${date}` }
    ];

    const faqs = [
        {
            question: `What were the Tripura Teer results for ${displayDate}?`,
            answer: `On ${displayDate}, the Day Teer First Round result was ${result.round1 || 'Pending'} and Second Round was ${result.round2 || 'Pending'}. Night Teer First Round was ${result.night_round1 || 'Pending'} and Second Round was ${result.night_round2 || 'Pending'}.`
        }
    ];

    return (
        <>
            <FAQJsonLd faqs={faqs} id={`faq-${date}`} />
            <BreadcrumbJsonLd items={breadcrumbs} />

            <main className="min-h-screen teer-background flex flex-col items-center py-8 px-4 font-sans relative">
                <div className="absolute inset-0 bg-white/10 backdrop-blur-[2px]"></div>

                <header className="relative z-10 flex flex-col items-center mb-8 w-full max-w-3xl">
                    <div className="w-20 h-20 mb-4 animate-float">
                        <img src="/logo.png" alt="Logo" className="w-full h-full object-contain rounded-full border-2 border-white shadow-lg" />
                    </div>
                    <h1 className="text-2xl md:text-4xl font-black text-[var(--color-navy)] mb-2 uppercase text-center drop-shadow-sm">
                        Teer Results for <span className="block text-[var(--color-saffron)] mt-1">{displayDate}</span>
                    </h1>
                    <div className="h-1.5 w-32 bg-gradient-to-r from-[var(--color-saffron)] via-white to-[var(--color-india-green)] rounded-full shadow-sm mt-3"></div>
                </header>

                <div className="relative z-10 w-full max-w-lg mb-8">
                    {/* Day Teer Card */}
                    <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-xl overflow-hidden mb-6 border border-orange-100 transform transition-transform hover:scale-[1.01]">
                        <div className="bg-gradient-to-r from-orange-500 to-amber-500 p-4 text-white text-center">
                            <h2 className="text-xl font-bold uppercase tracking-wider flex items-center justify-center gap-2">
                                <span className="text-2xl">☀️</span> Day Teer Results
                            </h2>
                        </div>
                        <div className="p-6 grid grid-cols-2 gap-4 text-center">
                            <div className="p-4 bg-orange-50 rounded-xl border border-orange-100">
                                <div className="text-sm text-gray-500 uppercase font-semibold mb-1">First Round (3:45 PM)</div>
                                <div className="text-4xl font-black text-[var(--color-navy)] tracking-tight">
                                    {result.round1 ? result.round1 : <span className="text-gray-300 text-2xl">--</span>}
                                </div>
                            </div>
                            <div className="p-4 bg-orange-50 rounded-xl border border-orange-100">
                                <div className="text-sm text-gray-500 uppercase font-semibold mb-1">Second Round (4:45 PM)</div>
                                <div className="text-4xl font-black text-[var(--color-navy)] tracking-tight">
                                    {result.round2 ? result.round2 : <span className="text-gray-300 text-2xl">--</span>}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Night Teer Card */}
                    <div className="bg-[#1a1b4b]/95 backdrop-blur-md rounded-2xl shadow-xl overflow-hidden border border-indigo-900/30 transform transition-transform hover:scale-[1.01]">
                        <div className="bg-gradient-to-r from-indigo-900 to-[#1a1b4b] p-4 text-white text-center border-b border-indigo-800">
                            <h2 className="text-xl font-bold uppercase tracking-wider flex items-center justify-center gap-2">
                                <span className="text-2xl">🌙</span> Night Teer Results
                            </h2>
                        </div>
                        <div className="p-6 grid grid-cols-2 gap-4 text-center">
                            <div className="p-4 bg-indigo-900/30 rounded-xl border border-indigo-800/30">
                                <div className="text-sm text-indigo-200 uppercase font-semibold mb-1">First Round (9:10 PM)</div>
                                <div className="text-4xl font-black text-white tracking-tight">
                                    {result.night_round1 ? result.night_round1 : <span className="text-indigo-400/30 text-2xl">--</span>}
                                </div>
                            </div>
                            <div className="p-4 bg-indigo-900/30 rounded-xl border border-indigo-800/30">
                                <div className="text-sm text-indigo-200 uppercase font-semibold mb-1">Second Round (10:10 PM)</div>
                                <div className="text-4xl font-black text-white tracking-tight">
                                    {result.night_round2 ? result.night_round2 : <span className="text-indigo-400/30 text-2xl">--</span>}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="relative z-10 w-full max-w-lg flex flex-col sm:flex-row gap-4">
                    <Link
                        href="/previous-results"
                        className="flex-1 bg-white/80 hover:bg-white text-[var(--color-navy)] font-bold py-3 px-6 rounded-xl shadow-md text-center transition-all border border-gray-200"
                    >
                        &larr; All Previous Results
                    </Link>
                    <Link
                        href="/"
                        className="flex-1 bg-[var(--color-navy)] hover:bg-blue-900 text-white font-bold py-3 px-6 rounded-xl shadow-md text-center transition-all"
                    >
                        Go to Home
                    </Link>
                </div>
            </main>
        </>
    );
}
