import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Dream Numbers | Teer Dream Interpretation Guide',
    description: 'Find your lucky Teer numbers based on dreams. Complete dream interpretation guide for Tripura Teer lottery with traditional meanings and corresponding lucky numbers.',
    keywords: ['Teer Dream Numbers', 'Dream Interpretation', 'Lucky Numbers', 'Teer Prediction', 'Dream Meaning Teer', 'Tripura Teer Dreams'],
    openGraph: {
        title: 'Dream Numbers | Teer Dream Interpretation Guide',
        description: 'Find your lucky Teer numbers based on dreams. Complete dream interpretation guide.',
        url: 'https://tripurateer.in/dream-numbers',
    },
};

export default function DreamNumbersLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
