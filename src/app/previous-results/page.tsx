import { getPreviousResults } from '@/lib/storage';
import Link from 'next/link';
import type { Metadata } from 'next';
import { FAQJsonLd, BreadcrumbJsonLd } from '@/components/JsonLd';

export const metadata: Metadata = {
    title: 'Previous Teer Results | Day & Night Result History',
    description: 'View complete history of Tripura Teer lottery results including Day Teer FR/SR and Night Teer FR/SR. Browse all previous winning numbers and result archives.',
    keywords: ['Tripura Teer Previous Results', 'Teer Result History', 'Old Teer Results', 'Teer Archive', 'Day Teer History', 'Night Teer History'],
    openGraph: {
        title: 'Previous Teer Results | Day & Night Result History',
        description: 'View complete history of Tripura Teer lottery results including Day Teer and Night Teer rounds.',
        url: 'https://tripurateer.in/previous-results',
    },
    alternates: {
        canonical: 'https://tripurateer.in/previous-results',
    },
};

export const revalidate = 0;

export default async function PreviousResults() {
    const today = new Date().toISOString().split('T')[0];
    const history = await getPreviousResults(today);

    const faqs = [
        {
            question: 'What time are Tripura Teer results announced?',
            answer: 'Day Teer results are announced at 4:05 PM (FR) and 5:00 PM (SR). Night Teer results are announced at 9:30 PM (FR) and 10:30 PM (SR).'
        },
        {
            question: 'Where can I find old Tripura Teer results?',
            answer: 'You can find all previous Tripura Teer results on our Previous Results page, which includes complete history of Day and Night Teer results.'
        },
        {
            question: 'How often are Teer results updated?',
            answer: 'Teer results are updated daily, immediately after each round is completed. Results are available for all days except Sundays.'
        }
    ];

    const breadcrumbs = [
        { name: 'Home', url: 'https://tripurateer.in' },
        { name: 'Previous Results', url: 'https://tripurateer.in/previous-results' }
    ];

    return (
        <>
            <FAQJsonLd faqs={faqs} id="previous-results-faq" />
            <BreadcrumbJsonLd items={breadcrumbs} />
            <main className="min-h-screen teer-background flex flex-col items-center py-8 px-4 font-sans relative">
                <div className="absolute inset-0 bg-white/10 backdrop-blur-[2px]"></div>

                <header className="relative z-10 flex flex-col items-center mb-8 w-full">
                    <div className="w-24 h-24 mb-4 animate-float">
                        <img src="/logo.png" alt="Logo" className="w-full h-full object-contain rounded-full border-2 border-white shadow-lg" />
                    </div>
                    <h1 className="text-3xl md:text-5xl font-black text-[var(--color-navy)] mb-2 uppercase text-center drop-shadow-sm flex items-center justify-center gap-3">
                        Previous Results
                    </h1>
                    <div className="h-1.5 w-32 bg-gradient-to-r from-[var(--color-saffron)] via-white to-[var(--color-india-green)] rounded-full shadow-sm mt-2"></div>
                </header>

                <div className="relative z-10 w-full max-w-2xl overflow-x-auto glass-card shadow-2xl border-0 rounded-2xl mb-8">
                    <table className="w-full border-collapse text-center text-xl font-bold">
                        <thead className="bg-[var(--color-navy)] text-white">
                            <tr>
                                <th className="p-4 uppercase tracking-wider border-b-4 border-orange-500">Date</th>
                                <th className="p-4 uppercase tracking-wider border-b-4 border-white bg-orange-50 text-[var(--color-navy)]">Day F/R</th>
                                <th className="p-4 uppercase tracking-wider border-b-4 border-white bg-orange-50 text-[var(--color-navy)]">Day S/R</th>
                                <th className="p-4 uppercase tracking-wider border-b-4 border-indigo-300 bg-indigo-50 text-[var(--color-navy)]">Night F/R</th>
                                <th className="p-4 uppercase tracking-wider border-b-4 border-indigo-300 bg-indigo-50 text-[var(--color-navy)]">Night S/R</th>
                            </tr>
                        </thead>
                        <tbody>
                            {history.map((item, index) => (
                                <tr key={item.id} className={`${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'} hover:bg-orange-50 transition-colors`}>
                                    <td className="p-4 text-lg text-[var(--color-navy)] border-b border-gray-200">
                                        <Link href={`/results/${item.date}`} className="hover:text-orange-600 hover:underline transition-colors">
                                            {new Date(item.date).toLocaleDateString('en-IN', {
                                                day: 'numeric', month: 'short', year: 'numeric'
                                            })}
                                        </Link>
                                    </td>
                                    <td className="p-4 text-red-600 font-black border-b border-gray-200 bg-orange-50/30">{item.round1}</td>
                                    <td className="p-4 text-green-700 font-black border-b border-gray-200 border-r border-gray-300 bg-orange-50/30">{item.round2}</td>
                                    <td className="p-4 text-indigo-600 font-black border-b border-gray-200 bg-indigo-50/30">{item.night_round1 || '-'}</td>
                                    <td className="p-4 text-purple-600 font-black border-b border-gray-200 bg-indigo-50/30">{item.night_round2 || '-'}</td>
                                </tr>
                            ))}

                            {history.length === 0 && (
                                <tr>
                                    <td colSpan={5} className="p-8 text-center text-gray-400 font-medium">
                                        No previous results found.
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
                        href="/dream-numbers"
                        className="bg-gradient-to-r from-orange-600 to-orange-500 text-white font-black py-4 px-8 rounded-2xl shadow-lg transition-all active:scale-95 text-lg flex-1 text-center min-w-[200px]"
                    >
                        DREAM NUMBERS
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

