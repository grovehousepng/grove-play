'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './FooterGame.module.css';

export default function FooterGame() {
    const [score, setScore] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [gameOver, setGameOver] = useState(false);
    const [items, setItems] = useState([]);
    const [paddlePos, setPaddlePos] = useState(50);
    const containerRef = useRef(null);
    const requestRef = useRef();

    const spawnItem = () => {
        const id = Math.random();
        const type = Math.random() > 0.2 ? 'point' : 'bad'; // 80% points, 20% bad
        const x = Math.random() * 90 + 5;
        setItems(prev => [...prev, { id, x, y: -10, type, speed: 2 + Math.random() * 2 }]);
    };

    const gameLoop = () => {
        setItems(prev => {
            const nextItems = [];
            for (const item of prev) {
                const nextY = item.y + item.speed;
                
                // Collision Detection
                if (nextY > 80 && nextY < 95) {
                    const distance = Math.abs(item.x - paddlePos);
                    if (distance < 15) {
                        if (item.type === 'point') {
                            setScore(s => s + 10);
                        } else {
                            setGameOver(true);
                            setIsPlaying(false);
                        }
                        continue; // Caught
                    }
                }

                if (nextY < 100) {
                    nextItems.push({ ...item, y: nextY });
                }
            }
            return nextItems;
        });

        if (isPlaying) {
            requestRef.current = requestAnimationFrame(gameLoop);
        }
    };

    useEffect(() => {
        if (isPlaying && !gameOver) {
            const interval = setInterval(spawnItem, 1000);
            requestRef.current = requestAnimationFrame(gameLoop);
            return () => {
                clearInterval(interval);
                cancelAnimationFrame(requestRef.current);
            };
        }
    }, [isPlaying, gameOver, paddlePos]);

    const handleMouseMove = (e) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        setPaddlePos(Math.max(10, Math.min(90, x)));
    };

    const handleTouchMove = (e) => {
        if (!containerRef.current || !e.touches[0]) return;
        const rect = containerRef.current.getBoundingClientRect();
        const x = ((e.touches[0].clientX - rect.left) / rect.width) * 100;
        setPaddlePos(Math.max(10, Math.min(90, x)));
    };

    const startGame = () => {
        setScore(0);
        setItems([]);
        setGameOver(false);
        setIsPlaying(true);
    };

    return (
        <div 
            className={styles.gameContainer} 
            ref={containerRef}
            onMouseMove={handleMouseMove}
            onTouchMove={handleTouchMove}
        >
            <div className={styles.score}>SKOR: {score}</div>
            
            {!isPlaying && !gameOver && (
                <div className={styles.overlay}>
                    <h3>GROVE DEFENDER</h3>
                    <p>Logoları Yakala, Hatalardan Kaç!</p>
                    <button onClick={startGame} className={styles.mainBtn}>OYUNA BAŞLA</button>
                </div>
            )}

            {gameOver && (
                <div className={styles.overlay}>
                    <h3 style={{ color: '#FF4B4B' }}>EYVAH!</h3>
                    <p>Final Skoru: {score}</p>
                    <button onClick={startGame} className={styles.mainBtn}>TEKRAR DENE</button>
                </div>
            )}

            {isPlaying && (
                <div className={styles.stage}>
                    {items.map(item => (
                        <div 
                            key={item.id} 
                            className={`${styles.item} ${styles[item.type]}`}
                            style={{ left: `${item.x}%`, top: `${item.y}%` }}
                        >
                            {item.type === 'point' ? '🌱' : '👾'}
                        </div>
                    ))}
                    <div 
                        className={styles.paddle}
                        style={{ left: `${paddlePos}%` }}
                    >
                        <div className={styles.paddleInner}></div>
                    </div>
                </div>
            )}
        </div>
    );
}
