'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Game } from '@/lib/wordpress';
import styles from './GameCard.module.css';
import { useRef, useEffect } from 'react';

interface GameCardProps {
    game: Game;
    onEmphasis?: (game: Game | null) => void;
    onLeave?: () => void;
    isActive?: boolean;
    isTrending?: boolean;
}

export default function GameCard({ game, onEmphasis, onLeave, isActive, isTrending }: GameCardProps) {
    const timerRef = useRef<NodeJS.Timeout | null>(null);
    const ignoreHoverRef = useRef(true);

    // Prevent accidental hover triggers on initial load (e.g. cursor placed where card loads)
    useEffect(() => {
        const t = setTimeout(() => {
            ignoreHoverRef.current = false;
        }, 800);
        return () => clearTimeout(t);
    }, []);

    const handleClick = (e: React.MouseEvent) => {
        const isMobile = window.innerWidth <= 1024;

        if (isMobile && !isActive) {
            // Stage 1: Show Info
            e.preventDefault();
            e.stopPropagation();
            onEmphasis?.(game);
        } else {
            // Stage 2: Play (Normal navigation)
            // No reset here to keep state stable until new page loads
        }
    };

    return (
        <div
            className={`${styles.card} ${isActive ? styles.active : ''}`}
            tabIndex={0}
            onMouseEnter={() => {
                // Only show emphasis/preview on desktop where it's a side-panel, 
                // to avoid mobile popup flickering during hover/navigation.
                if (!ignoreHoverRef.current && window.matchMedia('(hover: hover)').matches && window.innerWidth > 1024) {
                    onEmphasis?.(game);
                }
            }}
            onMouseLeave={() => {
                if (window.innerWidth > 1024) {
                    onLeave?.();
                }
            }}
            onFocus={() => {
                // TV navigation emphasis - typically large screens, but guard check is safe
                if (window.innerWidth > 1024) {
                    onEmphasis?.(game);
                }
            }}
        >
            <Link
                href={`/game/${game.slug}`}
                className={styles.link}
                onClick={handleClick}
                draggable={false}
            >
                <div className={styles.imageWrapper}>
                    {game.thumbnailUrl ? (
                        <Image
                            src={game.thumbnailUrl}
                            alt={game.title}
                            fill
                            className={styles.image} // object-fit: cover is in CSS
                            sizes="(max-width: 768px) 50vw, 300px"
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
                        {isTrending && (
                            <span className={styles.cyanText}>TRENDING</span>
                        )}
                        <span className={styles.price}>
                            {new Intl.NumberFormat('en-US', { notation: "compact", maximumFractionDigits: 1 }).format(game.totalPlays || 0)} Plays
                        </span>
                    </div>
                </div>
            </Link>
        </div>
    );
}
