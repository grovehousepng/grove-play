import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { gameId, value } = body;

        if (!gameId || !value || value < 1 || value > 5) {
            return NextResponse.json({ error: 'Invalid data' }, { status: 400 });
        }

        const rating = await prisma.rating.create({
            data: {
                gameId: Number(gameId),
                value: Number(value)
            }
        });

        // Recalculate average (Optional, but nice to return)
        const aggregates = await prisma.rating.aggregate({
            where: { gameId: Number(gameId) },
            _avg: { value: true },
            _count: { value: true }
        });

        return NextResponse.json({
            success: true,
            average: aggregates._avg.value || value,
            count: aggregates._count.value
        });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to rate' }, { status: 500 });
    }
}
