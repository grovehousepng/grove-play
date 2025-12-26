'use client';

import { useState, useEffect } from 'react';

interface StarRatingProps {
    gameId: number;
    initialAverage: number;
    initialCount: number;
}

export default function StarRating({ gameId, initialAverage, initialCount }: StarRatingProps) {
    const [rating, setRating] = useState(initialAverage);
    const [count, setCount] = useState(initialCount);
    const [userRating, setUserRating] = useState(0);
    const [hover, setHover] = useState(0);
    const [hasVoted, setHasVoted] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        // Check local storage for previous vote
        const voted = localStorage.getItem(`vote_game_${gameId}`);
        if (voted) {
            setHasVoted(true);
            setUserRating(Number(voted));
        }
    }, [gameId]);

    const handleVote = async (value: number) => {
        if (hasVoted || loading) return;
        setLoading(true);

        try {
            const res = await fetch('/api/ratings', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ gameId, value })
            });

            if (res.ok) {
                const data = await res.json();
                setRating(data.average);
                setCount(data.count);
                setHasVoted(true);
                setUserRating(value);
                localStorage.setItem(`vote_game_${gameId}`, String(value));
            }
        } catch (e) {
            console.error(e);
        }
        setLoading(false);
    };

    return (
        <div style={{
            background: '#111',
            padding: '20px',
            borderRadius: '12px',
            border: '1px solid #222',
            marginBottom: '20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
        }}>
            <div>
                <h3 style={{ margin: 0, color: '#ec4899', fontSize: '1.2rem' }}>Rate this Game</h3>
                <div style={{ fontSize: '0.9rem', color: '#888', marginTop: '5px' }}>
                    {count} votes • Average: {Number(rating).toFixed(1)}/5
                </div>
            </div>

            <div style={{ display: 'flex', gap: '5px' }}>
                {[1, 2, 3, 4, 5].map((star) => (
                    <button
                        key={star}
                        onClick={() => handleVote(star)}
                        onMouseEnter={() => !hasVoted && setHover(star)}
                        onMouseLeave={() => !hasVoted && setHover(0)}
                        disabled={hasVoted}
                        style={{
                            background: 'none',
                            border: 'none',
                            cursor: hasVoted ? 'default' : 'pointer',
                            fontSize: '2rem',
                            color: (hover || userRating || rating) >= star ? '#ffd700' : '#444',
                            transition: 'color 0.2s'
                        }}
                    >
                        ★
                    </button>
                ))}
            </div>
        </div>
    );
}
