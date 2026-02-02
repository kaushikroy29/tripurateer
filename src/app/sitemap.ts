import { MetadataRoute } from 'next'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = 'https://tripurateer.in'
    const currentDate = new Date()

    // Get all available result dates
    const { getAllResultDates } = await import('@/lib/storage');
    const dates = await getAllResultDates();

    const resultUrls: MetadataRoute.Sitemap = dates.map(date => ({
        url: `${baseUrl}/results/${date}`,
        lastModified: new Date(date), // Results for a past date rarely change
        changeFrequency: 'never',
        priority: 0.6,
    }));

    const staticPages: MetadataRoute.Sitemap = [
        {
            url: baseUrl,
            lastModified: currentDate,
            changeFrequency: 'always',
            priority: 1.0,
        },
        {
            url: `${baseUrl}/previous-results`,
            lastModified: currentDate,
            changeFrequency: 'daily',
            priority: 0.9,
        },
        {
            url: `${baseUrl}/common-numbers`,
            lastModified: currentDate,
            changeFrequency: 'daily',
            priority: 0.8,
        },
        {
            url: `${baseUrl}/dream-numbers`,
            lastModified: currentDate,
            changeFrequency: 'weekly',
            priority: 0.7,
        },
    ]

    return [...staticPages, ...resultUrls]
}

