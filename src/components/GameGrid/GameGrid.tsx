import { Game } from '@/lib/wordpress';
import GameCard from '../GameCard/GameCard';
import styles from './GameGrid.module.css';

interface GameGridProps {
    games: Game[];
    title?: string;
    onGameEmphasis?: (game: Game | null) => void;
}

export default function GameGrid({ games, title, onGameEmphasis }: GameGridProps) {
    if (!games || games.length === 0) return null;

    return (
        <section className={styles.gridSection}>
            {title && <h2 className={styles.title}>{title}</h2>}
            <div className={styles.grid}>
                {games.map((game) => (
                    <GameCard
                        key={game.id}
                        game={game}
                        onEmphasis={onGameEmphasis}
                    />
                ))}
            </div>
        </section>
    );
}
