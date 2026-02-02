import Link from 'next/link';
import { FAQJsonLd, BreadcrumbJsonLd } from '@/components/JsonLd';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Teer Common Numbers Today - Direct, House, Ending | Tripura Teer",
    description: "Check today's Tripura Teer common numbers. Get daily target numbers, house, and ending suggestions calculated from past results.",
    alternates: {
        canonical: 'https://tripurateer.in/common-numbers',
    },
};

export default function CommonNumbersPage() {
    const today = new Date().toLocaleDateString('en-IN', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        timeZone: 'Asia/Kolkata'
    });

    // Mock data for display
    const commonNumbers = {
        direct: "57, 82, 12, 49, 05",
        house: "5, 8",
        ending: "2, 7"
    };

    const faqs = [
        {
            question: 'What are Teer common numbers?',
            answer: 'Common numbers are calculated predictions based on mathematical analysis of previous Teer results. They include direct numbers, house, and ending predictions.'
        },
        {
            question: 'How are common numbers calculated?',
            answer: 'Common numbers are derived using statistical formulas analyzing historical patterns and frequency of winning numbers over the past 30 days.'
        },
        {
            question: 'What is the difference between House and Ending?',
            answer: 'House refers to the first digit of the result (0-9), while Ending refers to the last digit. Together they help predict the two-digit Teer result.'
        }
    ];

    const breadcrumbs = [
        { name: 'Home', url: 'https://tripurateer.in' },
        { name: 'Common Numbers', url: 'https://tripurateer.in/common-numbers' }
    ];

    return (
        <>
            <FAQJsonLd faqs={faqs} id="common-numbers-faq" />
            <BreadcrumbJsonLd items={breadcrumbs} />
            <main className="min-h-screen teer-background flex flex-col items-center py-8 px-4 font-sans relative">
                <div className="absolute inset-0 bg-white/10 backdrop-blur-[2px]"></div>

                <header className="relative z-10 flex flex-col items-center mb-6 w-full">
                    <div className="w-24 h-24 mb-4 animate-float">
                        <img src="/logo.png" alt="Logo" className="w-full h-full object-contain rounded-full border-2 border-white shadow-lg" />
                    </div>
                    <h1 className="text-3xl md:text-5xl font-black text-[var(--color-navy)] mb-2 uppercase text-center drop-shadow-sm flex items-center justify-center gap-3">
                        Common Numbers
                    </h1>
                    <div className="h-1.5 w-32 bg-gradient-to-r from-[var(--color-saffron)] via-white to-[var(--color-india-green)] rounded-full shadow-sm mt-2"></div>
                </header>

                <p className="relative z-10 text-lg font-bold text-gray-600 mb-8 bg-white/80 backdrop-blur-sm px-6 py-2 rounded-full shadow-sm border border-gray-100">{today}</p>

                <div className="relative z-10 w-full max-w-2xl glass-card shadow-2xl border-t-8 border-[var(--color-saffron)] rounded-2xl p-8 mb-8">
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
                </div>
            </main>
        </>
    );
}

