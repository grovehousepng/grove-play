'use client';

import React, { useState } from 'react';
import { fetchGraphQL } from '@/lib/wordpress';
import styles from './GameCommentForm.module.css';

interface GameCommentFormProps {
    gameId: number;
}

export default function GameCommentForm({ gameId }: GameCommentFormProps) {
    const [rating, setRating] = useState(0);
    const [hoverRating, setHoverRating] = useState(0);
    const [formData, setFormData] = useState({
        author: '',
        email: '',
        content: ''
    });
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [errorMessage, setErrorMessage] = useState('');

    const handleStarClick = (score: number) => setRating(score);
    const handleStarHover = (score: number) => setHoverRating(score);
    const handleStarLeave = () => setHoverRating(0);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (rating === 0) {
            setStatus('error');
            setErrorMessage('Please select a star rating.');
            return;
        }

        setStatus('loading');

        const mutation = `
            mutation CreateGameComment($gameId: Int!, $author: String!, $email: String!, $content: String!, $clientMutationId: String!) {
                createComment(input: {
                    commentOn: $gameId,
                    author: $author,
                    authorEmail: $email,
                    content: $content,
                    clientMutationId: $clientMutationId
                }) {
                    success
                    comment {
                        id
                        content
                    }
                }
            }
        `;

        try {
            // Passing rating inside clientMutationId as a JSON string for the backend to parse
            const clientMutationId = JSON.stringify({ rating: rating, source: 'grove-games-frontend' });

            const data = await fetchGraphQL(mutation, {
                gameId: gameId,
                author: formData.author,
                email: formData.email,
                content: formData.content,
                clientMutationId: clientMutationId
            });

            if (data?.createComment?.success) {
                setStatus('success');
                setFormData({ author: '', email: '', content: '' });
                setRating(0);
            } else {
                throw new Error('Mutation failed');
            }
        } catch (error) {
            console.error('Comment error:', error);
            setStatus('error');
            setErrorMessage('Failed to submit comment. Please try again.');
        }
    };

    return (
        <div className={styles.container}>
            <h3 className={styles.title}>Leave a Review</h3>

            <form className={styles.form} onSubmit={handleSubmit}>
                {/* Rating Stars */}
                <div className={styles.group}>
                    <label className={styles.label}>Rate this game</label>
                    <div className={styles.stars} onMouseLeave={handleStarLeave}>
                        {[1, 2, 3, 4, 5].map((star) => (
                            <button
                                key={star}
                                type="button"
                                className={`${styles.starBtn} ${(hoverRating || rating) >= star ? styles.active : ''}`}
                                onClick={() => handleStarClick(star)}
                                onMouseEnter={() => handleStarHover(star)}
                            >
                                <svg width="32" height="32" viewBox="0 0 24 24" fill={(hoverRating || rating) >= star ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2">
                                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                                </svg>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Info Row */}
                <div className={styles.row}>
                    <div className={styles.group}>
                        <label className={styles.label}>Name</label>
                        <input
                            type="text"
                            name="author"
                            required
                            className={styles.input}
                            value={formData.author}
                            onChange={handleChange}
                            placeholder="Your Name"
                        />
                    </div>
                    <div className={styles.group}>
                        <label className={styles.label}>Email</label>
                        <input
                            type="email"
                            name="email"
                            required
                            className={styles.input}
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="your@email.com"
                        />
                    </div>
                </div>

                {/* Comment */}
                <div className={styles.group}>
                    <label className={styles.label}>Your Review</label>
                    <textarea
                        name="content"
                        required
                        className={styles.textarea}
                        value={formData.content}
                        onChange={handleChange}
                        placeholder="What did you think about the game?"
                    />
                </div>

                <button type="submit" className={styles.submitBtn} disabled={status === 'loading'}>
                    {status === 'loading' ? 'Submitting...' : 'Post Review'}
                </button>

                {/* Status Messages */}
                {status === 'success' && (
                    <div className={`${styles.message} ${styles.success}`}>
                        Review submitted successfully! It will appear after moderation.
                    </div>
                )}
                {status === 'error' && (
                    <div className={`${styles.message} ${styles.error}`}>
                        {errorMessage}
                    </div>
                )}
            </form>
        </div>
    );
}
