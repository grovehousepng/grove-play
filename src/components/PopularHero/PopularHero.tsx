import { Game } from '@/lib/wordpress';
import styles from './PopularHero.module.css';

interface PopularHeroProps {
    games: Game[];
}

export default function PopularHero({ games }: PopularHeroProps) {
    const featured = games[0];

    if (!featured) return null;

    return (
        <div className={styles.popularBolus}>
            <h2 className={styles.title}>Popular Bolus</h2>

            <div className={styles.glassCard}>
                <div className={styles.gamepadIcon}>
                    <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M6 12h4M8 10v4M15 13h.01M18 11h.01M10 6H4a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h6l2-2 2 2h6a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-6l-2 2-2-2Z" />
                    </svg>
                </div>

                <div className={styles.dotIndicators}>
                    <span className={styles.activeDot}></span>
                    <span></span>
                    <span></span>
                </div>
            </div>

            <div className={styles.info}>
                <h3 className={styles.subtitle}>Popular Giarms</h3>
                <p className={styles.description}>
                    Romty Name Oyunlarını yerli portal yoluyla tam erişimle oyna.
                </p>
                <button className={styles.sorlerBtn}>Sorler</button>
            </div>
        </div>
    );
}
