import { MetadataRoute } from 'next';
import { prisma } from '@/lib/db';

const BASE_URL = 'https://groveplay.com';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const games = await prisma.game.findMany({
        select: {
            slug: true,
            updatedAt: true,
        },
        take: 50000, // Reasonable limit
    });

    const gameUrls = games.map((game: { slug: string; updatedAt: Date }) => ({
        url: `${BASE_URL}/game/${game.slug}`,
        lastModified: game.updatedAt,
        changeFrequency: 'weekly' as const,
        priority: 0.8,
    }));

    return [
        {
            url: BASE_URL,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 1.0,
        },
        ...gameUrls,
    ];
}
