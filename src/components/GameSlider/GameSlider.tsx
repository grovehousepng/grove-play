import { Game } from '@/lib/wordpress';
import GameCard from '../GameCard/GameCard';
import styles from './GameSlider.module.css';

interface GameSliderProps {
    games: Game[];
    title: string;
    onGameEmphasis?: (game: Game | null) => void;
}

export default function GameSlider({ games, title, onGameEmphasis }: GameSliderProps) {
    if (!games || games.length === 0) return null;

    return (
        <section className={styles.slider}>
            <h2 className={styles.title}>{title}</h2>
            <div className={styles.sliderContainer}>
                {games.map((game) => (
                    <div key={game.id} className={styles.cardWrapper}>
                        <GameCard
                            game={game}
                            onEmphasis={onGameEmphasis}
                        />
                    </div>
                ))}
            </div>
        </section>
    );
}
