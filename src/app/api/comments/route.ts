import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { gameId, content, author } = body;

        if (!gameId || !content) {
            return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
        }

        const comment = await prisma.comment.create({
            data: {
                gameId: parseInt(gameId),
                content,
                author: author || 'Anonymous'
            }
        });

        return NextResponse.json(comment);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to post comment' }, { status: 500 });
    }
}

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const gameId = searchParams.get('gameId');
    const isAdmin = searchParams.get('admin') === 'true';

    const where: any = {};
    if (gameId) where.gameId = parseInt(gameId);
    if (!isAdmin) where.approved = true;

    const comments = await prisma.comment.findMany({
        where,
        include: { game: { select: { title: true } } }, // Include game title for admin list
        orderBy: { createdAt: 'desc' }
    });

    return NextResponse.json(comments);
}

export async function PUT(request: Request) {
    try {
        const body = await request.json();
        const { id, approved } = body;

        await prisma.comment.update({
            where: { id: parseInt(id) },
            data: { approved }
        });

        return NextResponse.json({ success: true });
    } catch (e) {
        return NextResponse.json({ error: 'Failed' }, { status: 500 });
    }
}

export async function DELETE(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');

        if (!id) return NextResponse.json({ error: 'Missing ID' }, { status: 400 });

        await prisma.comment.delete({
            where: { id: parseInt(id) }
        });

        return NextResponse.json({ success: true });
    } catch (e) {
        return NextResponse.json({ error: 'Failed' }, { status: 500 });
    }
}
