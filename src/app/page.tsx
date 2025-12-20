'use client';

import { useState, useEffect, useRef } from 'react';
import Navbar from "@/components/Navbar/Navbar";
import GameGrid from "@/components/GameGrid/GameGrid";
import GameSlider from "@/components/GameSlider/GameSlider";
import InfoFlame from "@/components/InfoFlame/InfoFlame";
import { getGames, getPopularGames, Game } from "@/lib/wordpress";
import { useKeyNavigation } from "@/hooks/useKeyNavigation";
import styles from "./page.module.css";

export default function Home() {
  useKeyNavigation();
  const [popularGames, setPopularGames] = useState<Game[]>([]);
  const [allGames, setAllGames] = useState<Game[]>([]);
  const [activeGame, setActiveGame] = useState<Game | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const [isLocked, setIsLocked] = useState(false);

  const handleSetActiveGame = (game: Game | null) => {
    if (isLocked && game !== null) return; // Prevent changing game if locked (unless clearing)

    // Clear any pending timeout when a new game is selected
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setActiveGame(game);
  };

  const handleGameLeave = () => {
    if (isLocked) return;

    // Determine if we are on desktop. If so, start timeout.
    if (window.innerWidth > 1024) {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);

      timeoutRef.current = setTimeout(() => {
        setActiveGame(null);
        timeoutRef.current = null;
      }, 5000);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      // Parallel fetch: Newest for Slider, Popular for Grid
      let [newest, popular] = await Promise.all([
        getGames(20),       // 20 Newest games
        getPopularGames(60) // 60 Most played games
      ]);

      // Fallback: If popular query fails (e.g. plugin missing data), fill grid with standard games
      if (popular.length === 0) {
        const fallback = await getGames(80);
        popular = fallback.slice(20);
      }

      setPopularGames(newest);
      setAllGames(popular);
      console.log("Fetched New Games:", newest.map(g => g.title));
    };
    fetchData();
  }, []);

  // Determine Top 5 Trending Games based on current data
  const trendingSlugs = allGames.slice(0, 5).map(g => g.slug);

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
              games={allGames} // Display remaining games
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
