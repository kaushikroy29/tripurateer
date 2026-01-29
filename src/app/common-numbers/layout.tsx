import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Common Numbers | Teer Target & Prediction Numbers',
    description: 'Get today\'s Tripura Teer common numbers, target numbers, house and ending predictions. Mathematical calculations based on previous results for better predictions.',
    keywords: ['Teer Common Numbers', 'Teer Target Numbers', 'Teer House Ending', 'Teer Prediction', 'Tripura Teer Formula', 'Lucky Numbers Today'],
    openGraph: {
        title: 'Common Numbers | Teer Target & Prediction Numbers',
        description: 'Get today\'s Tripura Teer common numbers, target numbers, house and ending predictions.',
        url: 'https://tripurateer.in/common-numbers',
    },
};

export default function CommonNumbersLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
