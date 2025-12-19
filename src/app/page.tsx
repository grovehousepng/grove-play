'use client';

import { useState, useEffect } from 'react';
import Navbar from "@/components/Navbar/Navbar";
import GameGrid from "@/components/GameGrid/GameGrid";
import GameSlider from "@/components/GameSlider/GameSlider";
import InfoFlame from "@/components/InfoFlame/InfoFlame";
import { getGames, getPopularGames, Game } from "@/lib/wordpress";
import styles from "./page.module.css";

export default function Home() {
  const [popularGames, setPopularGames] = useState<Game[]>([]);
  const [allGames, setAllGames] = useState<Game[]>([]);
  const [activeGame, setActiveGame] = useState<Game | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      // Parallel fetch: Newest for Slider, Popular for Grid
      let [newest, popular] = await Promise.all([
        getGames(20),       // 20 Newest games
        getPopularGames(40) // 40 Most played games
      ]);

      // Fallback: If popular query fails (e.g. plugin missing data), fill grid with standard games
      if (popular.length === 0) {
        const fallback = await getGames(60);
        popular = fallback.slice(20);
      }

      setPopularGames(newest);
      setAllGames(popular);
    };
    fetchData();
  }, []);

  return (
    <div className="main-wrapper">
      <Navbar />

      <div className={styles.layout}>
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
              onGameEmphasis={setActiveGame}
            />
          </div>

          <div className={styles.section}>
            <div className={styles.sectionHeader}>
              <h2 className={styles.title}>POPULAR</h2>
            </div>
            <GameGrid
              games={allGames} // Display remaining games
              onGameEmphasis={setActiveGame}
            />
          </div>
        </div>

        {/* Right Panel: Info Flame */}
        <aside className={styles.infoCol}>
          <InfoFlame
            game={activeGame}
            onClose={() => setActiveGame(null)}
          />
        </aside>
      </div>
    </div>
  );
}
