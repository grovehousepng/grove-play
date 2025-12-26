'use client';

import { useState } from 'react';

interface Comment {
    id: number;
    content: string;
    author: string;
    createdAt: Date;
}

export default function CommentsSection({ gameId, initialComments }: { gameId: number, initialComments: any[] }) {
    const [comments, setComments] = useState<Comment[]>(initialComments);
    const [form, setForm] = useState({ author: '', content: '' });
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!form.content.trim()) return;

        setLoading(true);
        try {
            const res = await fetch('/api/comments', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ gameId, ...form })
            });
            if (res.ok) {
                const newComment = await res.json();
                setComments([newComment, ...comments]);
                setForm({ author: '', content: '' });
            }
        } catch (err) {
            alert('Hata oluştu.');
        }
        setLoading(false);
    };

    return (
        <div style={{ marginTop: '2rem', padding: '20px', background: '#000', borderRadius: '12px', border: '1px solid #222' }}>
            <h3 style={{ color: '#ec4899', marginBottom: '1rem', borderBottom: '1px solid #333', paddingBottom: '10px' }}>Comments ({comments.length})</h3>

            {/* Form */}
            <form onSubmit={handleSubmit} style={{ marginBottom: '2rem' }}>
                <div style={{ display: 'grid', gap: '15px', marginBottom: '15px' }}>
                    <input
                        placeholder="Your Name (Optional)"
                        value={form.author}
                        onChange={e => setForm({ ...form, author: e.target.value })}
                        style={{ padding: '12px', borderRadius: '8px', border: '1px solid #333', background: '#111', color: '#fff', width: '100%' }}
                    />
                    <textarea
                        placeholder="Write your comment..."
                        value={form.content}
                        onChange={e => setForm({ ...form, content: e.target.value })}
                        required
                        style={{ padding: '12px', borderRadius: '8px', border: '1px solid #333', background: '#111', color: '#fff', minHeight: '100px', width: '100%', resize: 'vertical' }}
                    />
                </div>
                <button
                    type="submit"
                    disabled={loading}
                    style={{ padding: '10px 24px', background: '#ec4899', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold', opacity: loading ? 0.7 : 1 }}
                >
                    {loading ? 'Posting...' : 'Post Comment'}
                </button>
            </form>

            {/* List */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {comments.length === 0 && <div style={{ color: '#666', fontStyle: 'italic' }}>No comments yet. Be the first to comment!</div>}

                {comments.map(comment => (
                    <div key={comment.id} style={{ padding: '15px', background: '#111', borderRadius: '8px', border: '1px solid #222' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                            <strong style={{ color: '#ec4899' }}>{comment.author || 'Anonymous'}</strong>
                            <span style={{ fontSize: '12px', color: '#666' }}>
                                {new Date(comment.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                            </span>
                        </div>
                        <p style={{ color: '#ddd', margin: 0, lineHeight: '1.5' }}>{comment.content}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
