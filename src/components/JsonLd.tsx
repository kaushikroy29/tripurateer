
// Helper to get current time in Indian Standard Time (IST - UTC+5:30)
function getIndianTime(): Date {
    const now = new Date();
    // Get UTC time, then add 5 hours 30 minutes for IST
    const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
    const istOffset = 5.5 * 60 * 60 * 1000; // 5.5 hours in milliseconds
    return new Date(utc + istOffset);
}

// Helper to get IST date string in YYYY-MM-DD format
function getIndianDateString(): string {
    const ist = getIndianTime();
    const year = ist.getFullYear();
    const month = String(ist.getMonth() + 1).padStart(2, '0');
    const day = String(ist.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

// Organization Schema
export function OrganizationJsonLd() {
    const schema = {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: 'Tripura Teer',
        alternateName: 'Tripura Teer Result',
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
        alternateName: ['Tripura Teer Result', 'Teer Result'],
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
    const today = getIndianDateString();

    // Check if the event for today is past (simple heuristic or passed prop)
    // For now, we assume we are generating schema for the "relevant" upcoming or active event
    // The startTime prop usually includes timezone offset like "15:45:00+05:30"
    // We strip the offset from input if present to combine with today's date safely, 
    // BUT the prop passed from page.tsx is "15:45:00+05:30".
    // We need to form a valid ISO string. 
    // If we just concat `${today}T${startTime}`, we get "2024-03-01T15:45:00+05:30" which is correct ISO.

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
    const today = getIndianDateString();

    // We use the current Indian time for datePublished/Modified to indicate freshness
    const now = getIndianTime();
    const isoNow = now.toISOString().split('.')[0] + '+05:30'; // Approximate ISO with IST offset

    const schema = {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: `Tripura Teer Result Today - ${today}`,
        description: `Live Tripura Teer Result for ${today}. Get fastest updates for Day Teer (FR/SR) and Night Teer results.`,
        datePublished: `${today}T08:00:00+05:30`, // Assume published morning
        dateModified: isoNow,
        mainEntity: {
            '@type': 'ItemList',
            name: `Tripura Teer Results ${today}`,
            description: `Daily Teer lottery results from Tripura for ${today}`,
            numberOfItems: 4,
            itemListElement: [
                {
                    '@type': 'ListItem',
                    position: 1,
                    name: 'Day Teer First Round',
                    description: 'Day Teer FR result at 4:05 PM IST'
                },
                {
                    '@type': 'ListItem',
                    position: 2,
                    name: 'Day Teer Second Round',
                    description: 'Day Teer SR result at 5:00 PM IST'
                },
                {
                    '@type': 'ListItem',
                    position: 3,
                    name: 'Night Teer First Round',
                    description: 'Night Teer FR result at 9:30 PM IST'
                },
                {
                    '@type': 'ListItem',
                    position: 4,
                    name: 'Night Teer Second Round',
                    description: 'Night Teer SR result at 10:30 PM IST'
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
