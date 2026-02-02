import Link from 'next/link';
import { FAQJsonLd, BreadcrumbJsonLd } from '@/components/JsonLd';
import DreamNumbersList from '@/components/DreamNumbersList';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Teer Dream Numbers - Dream Meaning & Target Numbers | Tripura Teer",
    description: "Find your lucky Teer numbers based on your dreams. Complete list of dream meanings and their associated direct numbers.",
    alternates: {
        canonical: 'https://tripurateer.in/dream-numbers',
    },
};

export default function DreamNumbersPage() {
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

                <DreamNumbersList />

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

