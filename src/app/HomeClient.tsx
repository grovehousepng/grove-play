'use client';

import { useState, useRef, useEffect } from 'react';
import Navbar from "@/components/Navbar/Navbar";
import GameGrid from "@/components/GameGrid/GameGrid";
import GameSlider from "@/components/GameSlider/GameSlider";
import InfoFlame from "@/components/InfoFlame/InfoFlame";
import { useKeyNavigation } from "@/hooks/useKeyNavigation";
import styles from "./page.module.css";

import { Game } from "@/lib/wordpress";

export default function HomeClient({ initialGames }: { initialGames: Game[] }) {
    useKeyNavigation();
    const [activeGame, setActiveGame] = useState<Game | null>(null);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);
    const [isLocked, setIsLocked] = useState(false);

    // Split games (client logic can sort/filter if needed, but we get them passed in)
    // Assuming initialGames are already sorted by newest from server
    const popularGames = initialGames.slice(0, 20); // Top 20 for slider
    const allGames = initialGames; // All games for grid (or rest)

    const handleSetActiveGame = (game: Game | null) => {
        if (isLocked && game !== null) return;
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
            timeoutRef.current = null;
        }
        setActiveGame(game);
    };

    const handleGameLeave = () => {
        if (isLocked) return;
        if (window.innerWidth > 1024) {
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
            timeoutRef.current = setTimeout(() => {
                setActiveGame(null);
                timeoutRef.current = null;
            }, 5000);
        }
    };

    // Trending based on Play Counts
    const trendingSlugs = [...initialGames]
        .sort((a, b) => b.totalPlays - a.totalPlays)
        .slice(0, 5)
        .map(g => g.slug);

    return (
        <div className="main-wrapper" onClick={() => handleSetActiveGame(null)}>
            <Navbar />

            <div className={styles.layout} onClick={(e) => e.stopPropagation()}>
                {/* Left Panel: Game Content */}
                <div className={styles.gameContent}>
                    <div className={styles.section}>
                        <div className={styles.sectionHeader}>
                            <h2 className={styles.title}>NEW GAMES</h2>
                            <span className={styles.badge}>FRESH</span>
                        </div>
                        <GameSlider
                            title=""
                            games={popularGames}
                            onGameEmphasis={handleSetActiveGame}
                            onGameLeave={handleGameLeave}
                            activeGameId={activeGame?.slug}
                            trendingSlugs={trendingSlugs}
                        />
                    </div>

                    <div className={styles.section}>
                        <div className={styles.sectionHeader}>
                            <h2 className={styles.title}>POPULAR</h2>
                        </div>
                        <GameGrid
                            games={allGames}
                            onGameEmphasis={handleSetActiveGame}
                            onGameLeave={handleGameLeave}
                            activeGameId={activeGame?.slug}
                            trendingSlugs={trendingSlugs}
                        />
                    </div>
                </div>

                {/* Right Panel: Info Flame */}
                <aside
                    className={styles.infoCol}
                    onMouseEnter={() => {
                        setIsLocked(true);
                        if (timeoutRef.current) clearTimeout(timeoutRef.current);
                    }}
                    onMouseLeave={() => setIsLocked(false)}
                >
                    <InfoFlame
                        game={activeGame}
                        onClose={() => handleSetActiveGame(null)}
                    />
                </aside>
            </div>
        </div>
    );
}
