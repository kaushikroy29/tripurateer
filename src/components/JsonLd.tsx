'use client';

// Organization Schema
export function OrganizationJsonLd() {
    const schema = {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: 'Tripura Teer',
        url: 'https://tripurateer.in',
        logo: 'https://tripurateer.in/logo.png',
        sameAs: [],
        description: 'Official Tripura Teer lottery results website providing fast and accurate daily teer results, dream numbers, and common numbers.',
        foundingDate: '2024',
        areaServed: {
            '@type': 'Country',
            name: 'India'
        }
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
}

// WebSite Schema with SearchAction
export function WebSiteJsonLd() {
    const schema = {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: 'Tripura Teer',
        url: 'https://tripurateer.in',
        description: 'Get the latest Tripura Teer results, common numbers, and dream numbers. Fast and accurate updates daily.',
        potentialAction: {
            '@type': 'SearchAction',
            target: {
                '@type': 'EntryPoint',
                urlTemplate: 'https://tripurateer.in/dream-numbers?search={search_term_string}'
            },
            'query-input': 'required name=search_term_string'
        },
        publisher: {
            '@type': 'Organization',
            name: 'Tripura Teer',
            logo: {
                '@type': 'ImageObject',
                url: 'https://tripurateer.in/logo.png'
            }
        }
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
}

// Event Schema for Teer Results
interface TeerEventProps {
    name: string;
    description: string;
    startTime: string;
    location: string;
}

export function TeerEventJsonLd({ name, description, startTime, location }: TeerEventProps) {
    const today = new Date().toISOString().split('T')[0];
    const schema = {
        '@context': 'https://schema.org',
        '@type': 'Event',
        name: name,
        description: description,
        startDate: `${today}T${startTime}`,
        eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
        eventStatus: 'https://schema.org/EventScheduled',
        location: {
            '@type': 'Place',
            name: location,
            address: {
                '@type': 'PostalAddress',
                addressLocality: 'Agartala',
                addressRegion: 'Tripura',
                addressCountry: 'IN'
            }
        },
        organizer: {
            '@type': 'Organization',
            name: 'Tripura Teer',
            url: 'https://tripurateer.in'
        }
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
}

// FAQ Schema
interface FAQItem {
    question: string;
    answer: string;
}

interface FAQProps {
    faqs: FAQItem[];
    id?: string;
}

export function FAQJsonLd({ faqs, id = 'faq' }: FAQProps) {
    const schema = {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqs.map((faq) => ({
            '@type': 'Question',
            name: faq.question,
            acceptedAnswer: {
                '@type': 'Answer',
                text: faq.answer
            }
        }))
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
}

// BreadcrumbList Schema
interface BreadcrumbItem {
    name: string;
    url: string;
}

interface BreadcrumbProps {
    items: BreadcrumbItem[];
}

export function BreadcrumbJsonLd({ items }: BreadcrumbProps) {
    const schema = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: items.map((item, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            name: item.name,
            item: item.url
        }))
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
}

// Gambling/Lottery Result Schema
export function LotteryResultJsonLd() {
    const today = new Date().toISOString().split('T')[0];
    const schema = {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: 'Tripura Teer Result Today',
        description: 'Live Tripura Teer lottery results including Day Teer and Night Teer rounds. Updated daily with First Round (FR) and Second Round (SR) results.',
        datePublished: today,
        dateModified: today,
        mainEntity: {
            '@type': 'ItemList',
            name: 'Teer Results',
            description: 'Daily Teer lottery results from Tripura',
            numberOfItems: 4,
            itemListElement: [
                {
                    '@type': 'ListItem',
                    position: 1,
                    name: 'Day Teer First Round',
                    description: 'Day Teer FR result at 3:45 PM IST'
                },
                {
                    '@type': 'ListItem',
                    position: 2,
                    name: 'Day Teer Second Round',
                    description: 'Day Teer SR result at 4:45 PM IST'
                },
                {
                    '@type': 'ListItem',
                    position: 3,
                    name: 'Night Teer First Round',
                    description: 'Night Teer FR result at 9:10 PM IST'
                },
                {
                    '@type': 'ListItem',
                    position: 4,
                    name: 'Night Teer Second Round',
                    description: 'Night Teer SR result at 10:10 PM IST'
                }
            ]
        }
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
}
