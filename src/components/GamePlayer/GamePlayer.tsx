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
    const iframeRef = useRef<HTMLIFrameElement>(null);
    const [isMuted, setIsMuted] = useState(false);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [volume, setVolume] = useState(100);
    const [showControls, setShowControls] = useState(false);
    const controlsTimeoutRef = useRef<NodeJS.Timeout | null>(null);

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

    // Prevent iframe from adding to browser history using location.replace()
    useEffect(() => {
        if (isPlaying && iframeRef.current) {
            const finalUrl = getCleanUrl(game.gameUrl) + (isMuted ? '&mute=1' : '');
            const t = setTimeout(() => {
                try {
                    iframeRef.current?.contentWindow?.location.replace(finalUrl);
                } catch (e) {
                    if (iframeRef.current) iframeRef.current.src = finalUrl;
                }
            }, 50);
            return () => clearTimeout(t);
        }
    }, [isPlaying, game.gameUrl, isMuted]);

    // Listen for fullscreen change to update state if user uses Esc
    useEffect(() => {
        const handleChange = () => {
            setIsFullscreen(!!document.fullscreenElement);
        };
        document.addEventListener('fullscreenchange', handleChange);
        return () => document.removeEventListener('fullscreenchange', handleChange);
    }, []);

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
                            ref={iframeRef}
                            className={styles.iframe}
                            title={game.title}
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

                    {/* Share Buttons */}
                    <div className={styles.shareRow}>
                        <a href={`https://www.instagram.com/`} target="_blank" rel="noopener noreferrer" className={`${styles.shareBtn} ${styles.shareIg}`} title="Instagram">
                            <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" /></svg>
                        </a>
                        <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(typeof window !== 'undefined' ? window.location.href : '')}`} target="_blank" rel="noopener noreferrer" className={`${styles.shareBtn} ${styles.shareFb}`} title="Share to Facebook">
                            <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.791-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>
                        </a>
                        <a href={`https://api.whatsapp.com/send?text=${encodeURIComponent(game.title)}%20${encodeURIComponent(typeof window !== 'undefined' ? window.location.href : '')}`} target="_blank" rel="noopener noreferrer" className={`${styles.shareBtn} ${styles.shareWa}`} title="Share to WhatsApp">
                            <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" /></svg>
                        </a>
                        <a href={`https://www.reddit.com/submit?url=${encodeURIComponent(typeof window !== 'undefined' ? window.location.href : '')}&title=${encodeURIComponent(game.title)}`} target="_blank" rel="noopener noreferrer" className={`${styles.shareBtn} ${styles.shareReddit}`} title="Share to Reddit">
                            <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18"><path d="M2.204 14.049c-.06.276-.091.56-.091.847 0 3.443 4.402 6.249 9.814 6.249 5.41 0 9.812-2.804 9.812-6.249 0-.274-.029-.546-.082-.809l-.015-.032c-.021-.055-.029-.11-.029-.165-.302-1.175-1.117-2.245-2.296-3.104-.8.192-1.647.214-2.481.063l.732-3.445 4.36 1.026c.369 1.109 1.419 1.911 2.659 1.911 1.554 0 2.813-1.26 2.813-2.814 0-1.554-1.259-2.814-2.813-2.814-1.328 0-2.438.924-2.735 2.15l-4.996-1.177c-.114-.027-.235-.002-.321.082-.086.084-.122.204-.097.32l.966 4.542c-2.327-1.127-5.118-1.782-8.086-1.802l-.101-.003-.092.003c-2.89.02-5.617.65-7.91 1.737-1.205.864-2.037 1.954-2.309 3.16-.002.008-.003.016-.003.024s.002.016.004.024zm10.741 5.09c-2.583 0-4.085-1.074-4.085-1.564 0-.109.09-.199.2-.199.508 0 1.265.485 3.886.485 2.502 0 3.327-.478 3.876-.485.111-.001.2.088.2.199.001.492-1.497 1.564-4.077 1.564zm-5.461-4.717c.725 0 1.313.585 1.313 1.309 0 .724-.588 1.309-1.313 1.309-.724 0-1.313-.585-1.313-1.309 0-.724.589-1.309 1.313-1.309zm10.923 0c.725 0 1.313.585 1.313 1.309 0 .724-.588 1.309-1.313 1.309-.723 0-1.312-.585-1.312-1.309 0-.724.589-1.309 1.312-1.309z" /></svg>
                        </a>
                        <a href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(typeof window !== 'undefined' ? window.location.href : '')}&text=${encodeURIComponent(game.title)}`} target="_blank" rel="noopener noreferrer" className={`${styles.shareBtn} ${styles.shareX}`} title="Share to X">
                            <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
                        </a>
                    </div>
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
