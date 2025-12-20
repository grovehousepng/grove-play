import { MetadataRoute } from 'next';
import { getGames } from '@/lib/wordpress';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = 'https://groveplay.com'; // Production URL

    // effective limit 1000 for sitemap in this example, adjust helper if needed
    const games = await getGames(1000);

    const gameUrls = games.map((game) => ({
        url: `${baseUrl}/game/${game.slug}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.8,
    }));

    return [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 1,
        },
        {
            url: `${baseUrl}/about`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.5,
        },
        ...gameUrls,
    ];
}
