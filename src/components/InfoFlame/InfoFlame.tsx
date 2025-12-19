'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Game } from '@/lib/wordpress';
import styles from './InfoFlame.module.css';

interface InfoFlameProps {
    game: Game | null;
    onClose?: () => void;
}

const InfoFlame = ({ game, onClose }: InfoFlameProps) => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [isClosing, setIsClosing] = useState(false);

    const handlePlay = () => {
        if (!game) return;
        setIsLoading(true);
        // Simulate a small delay for effect or just navigate
        setTimeout(() => {
            router.push(`/game/${game.slug}`);
            // Reset loading if they come back (optional, but component might remount)
        }, 500);
    };

    const handleClose = (e: React.SyntheticEvent) => {
        e.stopPropagation();
        // Do not preventDefault on Click, or it might block partial behaviors, 
        // but for TouchEnd we MUST preventDefault to stop ghost clicks.
        if (e.type === 'touchend') {
            e.preventDefault();
        }

        // Start closing animation
        setIsClosing(true);

        // Wait for animation to finish before removing game
        setTimeout(() => {
            onClose?.();
            setIsClosing(false);
        }, 300); // 300ms matches CSS animation
    };

    return (
        <>
            {/* interaction blocker during closing to prevent ghost clicks */}
            {isClosing && (
                <div
                    style={{ position: 'fixed', inset: 0, zIndex: 99999, background: 'transparent' }}
                    onClick={(e) => { e.stopPropagation(); e.preventDefault(); }}
                    onTouchStart={(e) => { e.stopPropagation(); e.preventDefault(); }}
                    onTouchEnd={(e) => { e.stopPropagation(); e.preventDefault(); }}
                />
            )}

            {/* Backdrop for mobile popup */}
            {game && <div
                className={`${styles.backdrop} ${isClosing ? styles.closing : ''}`}
                onClick={handleClose}
                onTouchEnd={handleClose}
            />}

            <div
                className={`${styles.panel} ${game ? styles.active : ''} ${isClosing ? styles.closing : ''}`}
                onClick={(e) => e.stopPropagation()} // Stop bubbling from inside panel
            >
                <button
                    className={styles.closeBtn}
                    onClick={handleClose}
                    onTouchEnd={handleClose}
                >×</button>

                <div className={styles.popupLogo}>
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M6 12h4M8 10v4M15 13h.01M18 11h.01M10 6H4a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h6l2-2 2 2h6a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-6l-2 2-2-2Z" />
                    </svg>
                    <span className={styles.logoText}>GROVE PLAYS</span>
                </div>

                <h2 className={styles.sectionTitle}>{game ? 'GAME INFO' : 'ABOUT US'}</h2>

                <div className={styles.content}>
                    {game ? (
                        <div className={styles.activeContent}>
                            <div className={styles.imageContainer} onClick={handlePlay}>
                                {game.thumbnailUrl && (
                                    <Image
                                        src={game.thumbnailUrl}
                                        alt={game.title}
                                        width={game.gameWidth || 800}
                                        height={game.gameHeight || 600}
                                        className={styles.bgImage}
                                        priority
                                        style={{ width: '100%', height: 'auto', objectFit: 'contain' }}
                                    />
                                )}
                            </div>
                            <div className={styles.details}>
                                <h3 className={styles.gameTitle}>{game.title}</h3>
                                <p className={styles.desc}>
                                    {game.content ? game.content.replace(/<[^>]*>?/gm, '').slice(0, 300) : 'No description available.'}
                                </p>

                                <button className={styles.contactBtn} onClick={handlePlay} disabled={isLoading}>
                                    <span className={styles.btnContent}>
                                        {isLoading ? (
                                            <>
                                                <span className={styles.spinner}></span>
                                                OPENING...
                                            </>
                                        ) : (
                                            <>
                                                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M5 3l14 9-14 9V3z" /></svg>
                                                PLAY NOW
                                            </>
                                        )}
                                    </span>
                                </button>

                                <div className={styles.stats}>
                                    <span className={styles.pill}>Cyberpunk 2077</span>
                                    <span className={styles.pill}>{game.totalPlays.toLocaleString()} Plays</span>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className={styles.defaultContent}>
                            <Link href="/" className={styles.logoBox} style={{ textDecoration: 'none' }}>
                                <div className={styles.logoIcon}>
                                    <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M6 12h4M8 10v4M15 13h.01M18 11h.01M10 6H4a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h6l2-2 2 2h6a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-6l-2 2-2-2Z" />
                                    </svg>
                                </div>
                                <h1 className={styles.logoName}>GROVE PLAYS</h1>
                            </Link>
                            <div className={styles.about}>
                                <div className={styles.featureList}>
                                    <div className={styles.featureItem}>
                                        <div className={styles.featureIcon}>
                                            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" /><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" /><path d="M9 12H4s.55-3.03 2-4c1.62-1.1 4-1 4-1s.38 2.38-1 4z" /><path d="M12 15v5s3.03-.55 4-2c1.1-1.62 1-4 1-4s-2.38-.38-4 1z" /></svg>
                                        </div>
                                        <p><strong>No Downloads Required:</strong> Dive into the action instantly on any platform, anytime, with just one click.</p>
                                    </div>
                                    <div className={styles.featureItem}>
                                        <div className={styles.featureIcon}>
                                            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="6" x2="10" y1="12" y2="12" /><line x1="8" x2="8" y1="10" y2="14" /><line x1="15" x2="15.01" y1="13" y2="13" /><line x1="18" x2="18.01" y1="11" y2="11" /><rect width="20" height="12" x="2" y="6" rx="2" /></svg>
                                        </div>
                                        <p><strong>Seamless Access:</strong> Take the arcade excitement from your pocket to your TV screen without boundaries.</p>
                                    </div>
                                    <div className={styles.featureItem}>
                                        <div className={styles.featureIcon}>
                                            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m11 17 2 2a1 1 0 1 0 3-3" /><path d="m14 14 2.5 2.5a1 1 0 1 0 3-3l-3.88-3.88a3 3 0 0 0-4.24 0l-.88.88a1 1 0 1 1-1.42-1.42l.88-.88a5 5 0 0 1 7.07 0l2.12 2.12a5 5 0 0 1 0 7.07l-2.12 2.12a5 5 0 0 1-7.07 0L11 17" /><path d="m14 14-9 9" /><path d="M3 14v9h9" /><path d="m12 12 4 4" /></svg>
                                        </div>
                                        <p><strong>Developer Friendly:</strong> Want to grow with us and showcase your games on our platform? Our doors are always open.</p>
                                    </div>
                                </div>

                                <a href="mailto:groveplay@foundry-an.de" className={styles.contactBtn}>
                                    <span className={styles.btnContent}>
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" /></svg>
                                        groveplay@foundry-an.de
                                    </span>
                                </a>
                            </div>
                            <div className={styles.versionTag}>v4.20</div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default InfoFlame;
