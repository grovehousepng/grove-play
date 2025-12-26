import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET() {
    try {
        const games = await prisma.game.findMany({
            orderBy: { createdAt: 'desc' }
        });
        return NextResponse.json(games);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch games' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();

        // Handle Bulk Create (Array)
        if (Array.isArray(body)) {
            // SQLite does not support skipDuplicates in createMany, so we insert one by one
            let createdCount = 0;
            const errors = [];

            for (const g of body) {
                try {
                    await prisma.game.create({
                        data: {
                            title: g.title,
                            slug: g.slug || g.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
                            gameUrl: g.gameUrl,
                            gameType: g.gameType || 'emulator',
                            description: g.description,
                            thumbnailUrl: g.thumbnailUrl,
                            categories: g.categories,
                        }
                    });
                    createdCount++;
                } catch (e: any) {
                    // P2002 = Unique constraint failed (Slug already exists)
                    if (e.code === 'P2002') {
                        continue; // Skip duplicate
                    }
                    console.error('Insert error:', e);
                    errors.push(e.message);
                }
            }

            if (createdCount === 0 && errors.length > 0) {
                throw new Error(`All items failed. Sample error: ${errors[0]}`);
            }

            return NextResponse.json({ count: createdCount });
        }

        // Handle Single Create
        const { title, slug, gameUrl, gameType, description, thumbnailUrl, categories } = body;

        const game = await prisma.game.create({
            data: {
                title,
                slug,
                gameUrl,
                gameType: gameType || 'emulator',
                description,
                thumbnailUrl,
                categories,
            }
        });
        return NextResponse.json(game);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: `Failed to create game(s): ${error instanceof Error ? error.message : String(error)}` }, { status: 500 });
    }
}
