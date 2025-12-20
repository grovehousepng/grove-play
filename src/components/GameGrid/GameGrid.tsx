import { Game } from '@/lib/wordpress';
import GameCard from '../GameCard/GameCard';
import styles from './GameGrid.module.css';

interface GameGridProps {
    games: Game[];
    title?: string;
    onGameEmphasis?: (game: Game | null) => void;
    onGameLeave?: () => void;
    activeGameId?: string;
    trendingSlugs?: string[];
}

export default function GameGrid({ games, title, onGameEmphasis, onGameLeave, activeGameId, trendingSlugs }: GameGridProps) {
    if (!games || games.length === 0) return null;

    return (
        <section className={styles.gridSection}>
            {title && <h2 className={styles.title}>{title}</h2>}
            <div className={styles.grid}>
                {games.map((game) => (
                    <GameCard
                        key={game.slug}
                        game={game}
                        onEmphasis={onGameEmphasis}
                        onLeave={onGameLeave}
                        isActive={activeGameId === game.slug}
                        isTrending={trendingSlugs?.includes(game.slug)}
                    />
                ))}
            </div>
        </section>
    );
}
