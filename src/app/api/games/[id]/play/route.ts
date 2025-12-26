import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function POST(request: Request, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

    try {
        const game = await prisma.game.update({
            where: { id: parseInt(id) },
            data: {
                playCount: {
                    increment: 1
                }
            }
        });

        return NextResponse.json({ playCount: game.playCount });
    } catch (error) {
        return NextResponse.json({ error: 'Failed' }, { status: 500 });
    }
}
