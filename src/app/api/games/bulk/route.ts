import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function DELETE(request: Request) {
    try {
        // Delete ALL games provided (e.g. valid approach for "Reset")
        // Or we could take a list of IDs. For now, "Reset" feature usually wipes everything.
        // Let's implement full wipe for the "Tools > Reset" feature.

        await prisma.game.deleteMany({});

        return NextResponse.json({ success: true, message: 'All games deleted' });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to delete games' }, { status: 500 });
    }
}
