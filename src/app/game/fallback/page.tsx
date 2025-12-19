'use client';

import React, { useEffect, useState } from 'react';
import Navbar from "@/components/Navbar/Navbar";
import GamePlayer from "@/components/GamePlayer/GamePlayer";
import GameCommentForm from "@/components/GameCommentForm/GameCommentForm";
import { fetchGraphQL, Game } from "@/lib/wordpress";
import { usePathname } from 'next/navigation';

export default function GameFallbackPage() {
    const pathname = usePathname();
    const [slug, setSlug] = useState<string | null>(null);
    const [game, setGame] = useState<Game | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        // Extract slug from URL (e.g., /game/my-new-game -> my-new-game)
        if (pathname) {
            const parts = pathname.split('/').filter(Boolean);
            const extractedSlug = parts[parts.length - 1]; // Assume last part is slug
            if (extractedSlug && extractedSlug !== 'fallback') {
                setSlug(extractedSlug);
            }
        }
    }, [pathname]);

    useEffect(() => {
        async function loadGame() {
            if (!slug) return;

            setLoading(true);
            try {
                // Fetch game data client-side
                const query = `
                    query GetGameBySlug($id: ID!) {
                        game(id: $id, idType: SLUG) {
                            id
                            databaseId
                            title
                            slug
                            gameUrl
                            thumbnailUrl
                            totalPlays
                            gameWidth
                            gameHeight
                            content
                        }
                    }
                `;
                const data = await fetchGraphQL(query, { id: slug });
                if (data?.game) {
                    setGame(data.game);
                    // Update Page Title for rudimentary SEO
                    document.title = `${data.game.title} - Grove Games`;
                } else {
                    setError(true);
                }
            } catch (err) {
                console.error(err);
                setError(true);
            } finally {
                setLoading(false);
            }
        }

        loadGame();
    }, [slug]);

    if (loading) {
        return (
            <main style={{ minHeight: '100vh', background: '#050505', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Navbar />
                <div style={{ color: 'white', fontFamily: 'var(--font-heading)', fontSize: '1.5rem' }} className="animate-pulse">
                    LOADING GAME DATA...
                </div>
            </main>
        );
    }

    if (error || !game) {
        return (
            <main style={{ minHeight: '100vh', background: '#050505', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Navbar />
                <div style={{ textAlign: 'center' }}>
                    <h1 style={{ color: 'white', fontFamily: 'var(--font-heading)', marginBottom: '20px' }}>GAME NOT FOUND</h1>
                    <p style={{ color: '#888' }}>Could not load the requested game.</p>
                </div>
            </main>
        );
    }

    return (
        <main style={{ minHeight: '100vh', background: '#050505' }}>
            <Navbar />
            <div style={{ paddingTop: '80px' }}>
                <GamePlayer game={game} />
            </div>

            <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 20px 60px 20px' }}>
                <GameCommentForm gameId={game.databaseId} />
            </div>
        </main>
    );
}
