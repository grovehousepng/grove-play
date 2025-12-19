'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Game } from '@/lib/wordpress';
import styles from './GameCard.module.css';
import { useRef, useEffect } from 'react';

interface GameCardProps {
    game: Game;
    onEmphasis?: (game: Game | null) => void;
}

export default function GameCard({ game, onEmphasis }: GameCardProps) {
    const timerRef = useRef<NodeJS.Timeout | null>(null);
    const ignoreHoverRef = useRef(true);

    // Prevent accidental hover triggers on initial load (e.g. cursor placed where card loads)
    useEffect(() => {
        const t = setTimeout(() => {
            ignoreHoverRef.current = false;
        }, 800);
        return () => clearTimeout(t);
    }, []);

    const handleClick = () => {
        // No special logic needed for mobile anymore, standard navigation is preferred
        onEmphasis?.(null);
    };

    return (
        <div
            className={styles.card}
            tabIndex={0}
            onMouseEnter={() => {
                if (!ignoreHoverRef.current) {
                    onEmphasis?.(game);
                }
            }}
            onMouseLeave={() => onEmphasis?.(null)}
        >
            <Link href={`/game/${game.slug}`} className={styles.link} onClick={handleClick}>
                <div className={styles.imageWrapper}>
                    {game.thumbnailUrl ? (
                        <Image
                            src={game.thumbnailUrl}
                            alt={game.title}
                            width={300}
                            height={300}
                            className={styles.image}
                        />
                    ) : (
                        <div className={styles.placeholder}>No Image</div>
                    )}
                    <div className={styles.overlay}>
                        <div className={styles.playIcon}>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                                <polygon points="5 3 19 12 5 21 5 3"></polygon>
                            </svg>
                        </div>
                    </div>
                </div>

                <div className={styles.info}>
                    <h3 className={styles.title}>{game.title}</h3>
                    <div className={styles.meta}>
                        <span className={styles.cyanText}>TRENDING</span>
                        <span className={styles.price}>{game.totalPlays?.toLocaleString() || 0} Plays</span>
                    </div>
                </div>
            </Link>
        </div>
    );
}
