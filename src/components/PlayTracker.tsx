'use client';
import { useEffect } from 'react';

export default function PlayTracker({ gameId }: { gameId: number }) {
    useEffect(() => {
        // Increment play count on mount
        fetch(`/api/games/${gameId}/play`, { method: 'POST' }).catch(() => { });
    }, [gameId]);

    return null; // Invisible component
}
