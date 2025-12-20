import { Game } from '@/lib/wordpress';
import GameCard from '../GameCard/GameCard';
import styles from './GameSlider.module.css';

interface GameSliderProps {
    games: Game[];
    title: string;
    onGameEmphasis?: (game: Game | null) => void;
    onGameLeave?: () => void;
    activeGameId?: string;
    trendingSlugs?: string[];
}

export default function GameSlider({ games, title, onGameEmphasis, onGameLeave, activeGameId, trendingSlugs }: GameSliderProps) {
    if (!games || games.length === 0) return null;

    return (
        <section className={styles.slider}>
            <h2 className={styles.title}>{title}</h2>
            <div className={styles.sliderContainer}>
                {games.map((game) => (
                    <div key={game.slug} className={styles.cardWrapper}>
                        <GameCard
                            game={game}
                            onEmphasis={onGameEmphasis}
                            onLeave={onGameLeave}
                            isActive={activeGameId === game.slug}
                            isTrending={trendingSlugs?.includes(game.slug)}
                        />
                    </div>
                ))}
            </div>
        </section>
    );
}
