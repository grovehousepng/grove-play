'use client';

import React, { useEffect, useState } from 'react';
import Navbar from "@/components/Navbar/Navbar";
import GamePlayer from "@/components/GamePlayer/GamePlayer";
import GameCommentForm from "@/components/GameCommentForm/GameCommentForm";
import { fetchGraphQL, Game } from "@/lib/wordpress";

import { usePathname } from 'next/navigation';

export default function NotFound() {
    const pathname = usePathname();
    const [slug, setSlug] = useState<string | null>(null);
    const [game, setGame] = useState<Game | null>(null);
    const [loading, setLoading] = useState(false);
    const [isGameRoute, setIsGameRoute] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {
        if (pathname && pathname.startsWith('/game/')) {
            setIsGameRoute(true);
            const parts = pathname.split('/').filter(Boolean);
            const extractedSlug = parts[parts.length - 1];
            if (extractedSlug && extractedSlug !== 'game') {
                setSlug(extractedSlug);
            }
        }
    }, [pathname]);

    useEffect(() => {
        async function loadGame() {
            if (!slug) return;

            setLoading(true);
            try {
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
                    document.title = `${data.game.title} - Grove Play`;
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

        if (isGameRoute) {
            loadGame();
        }
    }, [slug, isGameRoute]);

    // If it's not a game route, or there's an error, show standard 404
    if (!isGameRoute || error) {
        return (
            <main style={{ minHeight: '100vh', background: '#050505', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <Navbar />
                <h1 style={{ color: 'white', fontSize: '4rem', marginBottom: '1rem' }}>404</h1>
                <p style={{ color: '#888' }}>This page could not be found.</p>
                <a href="/" style={{ marginTop: '2rem', color: '#00ffcc', textDecoration: 'none', border: '1px solid #00ffcc', padding: '10px 20px', borderRadius: '5px' }}>
                    Return Home
                </a>
            </main>
        );
    }

    if (loading || !game) {
        return (
            <main style={{ minHeight: '100vh', background: '#050505', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Navbar />
                <div style={{ color: 'white', fontFamily: 'var(--font-heading)', fontSize: '1.2rem' }}>
                    LOADING GAME...
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
