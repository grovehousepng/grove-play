'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { Game, incrementPlayCount } from '@/lib/wordpress';
import styles from './GamePlayer.module.css';

interface GamePlayerProps {
    game: Game;
}

export default function GamePlayer({ game }: GamePlayerProps) {
    const [isPlaying, setIsPlaying] = useState(false);
    const [viewCount, setViewCount] = useState(game.totalPlays);

    // Controls State
    const playerRef = useRef<HTMLDivElement>(null);
    const [isMuted, setIsMuted] = useState(false);
    const [isFullscreen, setIsFullscreen] = useState(false);

    const handlePlay = () => {
        if (game.databaseId) {
            incrementPlayCount(game.databaseId);
        }
        setViewCount(prev => prev + 1);
        setIsPlaying(true);
    };

    const getCleanUrl = (url: string) => {
        if (!url) return '';
        if (url.includes('<iframe')) {
            const match = url.match(/src=["'](.*?)["']/);
            return match ? match[1] : url;
        }
        return url;
    };

    const toggleFullscreen = () => {
        if (!document.fullscreenElement) {
            playerRef.current?.requestFullscreen();
            setIsFullscreen(true);
        } else {
            document.exitFullscreen();
            setIsFullscreen(false);
        }
    };

    const [volume, setVolume] = useState(100);

    const toggleMute = () => {
        if (isMuted) {
            setIsMuted(false);
            setVolume(100);
        } else {
            setIsMuted(true);
            setVolume(0);
        }
    };

    const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newVol = Number(e.target.value);
        setVolume(newVol);
        setIsMuted(newVol === 0);
    };

    // Listen for fullscreen change to update state if user uses Esc
    useEffect(() => {
        const handleChange = () => {
            setIsFullscreen(!!document.fullscreenElement);
        };
        document.addEventListener('fullscreenchange', handleChange);
        return () => document.removeEventListener('fullscreenchange', handleChange);
    }, []);

    const [showControls, setShowControls] = useState(false);
    const controlsTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    // Auto-hide controls in fullscreen
    useEffect(() => {
        if (isFullscreen && showControls) {
            if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current);
            controlsTimeoutRef.current = setTimeout(() => {
                setShowControls(false);
            }, 3000);
        }
        return () => {
            if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current);
        };
    }, [isFullscreen, showControls]);

    const handleInteraction = () => {
        setShowControls(true);
    };

    return (
        <div className={styles.container}>
            <div
                ref={playerRef}
                className={`${styles.playerWrapper} ${isFullscreen ? styles.fullscreen : ''} ${!isPlaying ? styles.waiting : ''}`}
                style={{
                    aspectRatio: isFullscreen ? 'auto' : `${game.gameWidth || 16} / ${game.gameHeight || 9}`,
                    maxWidth: (game.gameWidth && !isFullscreen) ? `${game.gameWidth}px` : '100%'
                }}
                onMouseMove={() => isFullscreen && setShowControls(true)}
                onMouseLeave={() => isFullscreen && setShowControls(false)}
            >
                {!isPlaying ? (
                    <div className={styles.thumbnailWrapper} onClick={handlePlay}>
                        {game.thumbnailUrl ? (
                            <Image
                                src={game.thumbnailUrl}
                                alt={game.title}
                                fill
                                className={styles.thumbnail}
                                priority
                            />
                        ) : (
                            <div className={styles.placeholder}></div>
                        )}
                        <div className={styles.playOverlay}>
                            <div className={styles.playButton}>
                                <svg width="48" height="48" viewBox="0 0 24 24" fill="white">
                                    <polygon points="5 3 19 12 5 21 5 3"></polygon>
                                </svg>
                            </div>
                        </div>
                    </div>
                ) : (
                    <>
                        <iframe
                            src={getCleanUrl(game.gameUrl) + (isMuted ? '&mute=1' : '')}
                            className={styles.iframe}
                            allowFullScreen
                            scrolling="no"
                            allow="autoplay; fullscreen; gyroscope; accelerometer"
                        />

                        {/* Hover Zone for Fullscreen Bottom Detection */}
                        {isFullscreen && (
                            <div
                                className={styles.hoverZone}
                                onMouseEnter={handleInteraction}
                                onTouchStart={handleInteraction}
                                onTouchMove={handleInteraction}
                                onClick={handleInteraction}
                            >
                                <div className={styles.mobileHandle} />
                            </div>
                        )}

                        {/* Fullscreen Control Bar Overlay */}
                        {isFullscreen && (
                            <div
                                className={`${styles.controlBar} ${showControls ? styles.visible : styles.hidden}`}
                                onMouseEnter={handleInteraction}
                                onTouchStart={handleInteraction}
                            >
                                <div className={styles.leftControls}>
                                    <span className={styles.liveIndicator}>● LIVE</span>
                                </div>
                                <div className={styles.rightControls}>
                                    <div className={styles.volumeContainer}>
                                        <button onClick={toggleMute} className={styles.controlBtn}>
                                            {isMuted || volume === 0 ? (
                                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 5L6 9H2v6h4l5 4V5z" /><line x1="23" y1="9" x2="17" y2="15" /><line x1="17" y1="9" x2="23" y2="15" /></svg>
                                            ) : (
                                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path></svg>
                                            )}
                                        </button>
                                        <input
                                            type="range"
                                            min="0"
                                            max="100"
                                            value={volume}
                                            onChange={handleVolumeChange}
                                            className={styles.volumeSlider}
                                            style={{ backgroundSize: `${volume}% 100%` }}
                                        />
                                    </div>
                                    <button onClick={toggleFullscreen} className={styles.controlBtn}>
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3" /></svg>
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* Mobile Swipe Hint */}
                        {isFullscreen && (
                            <div className={styles.mobileHint}>
                                <span>Tam ekrandan çıkmak için yukarı kaydır</span>
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 19V5" /><path d="M5 12l7-7 7 7" /></svg>
                            </div>
                        )}
                    </>
                )}
            </div>

            {/* Static Controls for Normal Mode */}
            {!isFullscreen && isPlaying && (
                <div className={styles.staticControlBar}>
                    <div className={styles.leftControls}>
                        <span className={styles.liveIndicator}>● LIVE</span>
                    </div>
                    <div className={styles.rightControls}>
                        <div className={styles.volumeContainer}>
                            <button onClick={toggleMute} className={styles.controlBtn}>
                                {isMuted || volume === 0 ? (
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 5L6 9H2v6h4l5 4V5z" /><line x1="23" y1="9" x2="17" y2="15" /><line x1="17" y1="9" x2="23" y2="15" /></svg>
                                ) : (
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path></svg>
                                )}
                            </button>
                            <input
                                type="range"
                                min="0"
                                max="100"
                                value={volume}
                                onChange={handleVolumeChange}
                                className={styles.volumeSlider}
                                style={{ backgroundSize: `${volume}% 100%` }}
                            />
                        </div>
                        <button onClick={toggleFullscreen} className={styles.controlBtn}>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3" /></svg>
                        </button>
                    </div>
                </div>
            )}

            <div className={styles.info}>
                <h1 className={styles.title}>{game.title}</h1>
                <div className={styles.stats}>
                    <span>{viewCount.toLocaleString()} plays</span>
                </div>
                {game.content && (
                    <p className={styles.description}>
                        {game.content.replace(/<[^>]*>?/gm, '')}
                    </p>
                )}
            </div>
        </div>
    );
}
