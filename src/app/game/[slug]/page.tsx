import { getGameBySlug, getGames } from "@/lib/wordpress";
import GamePlayer from "@/components/GamePlayer/GamePlayer";
import Navbar from "@/components/Navbar/Navbar";
import GameCommentForm from "@/components/GameCommentForm/GameCommentForm";
import { notFound } from "next/navigation";
import { Metadata } from "next";

export const revalidate = 0;

export async function generateStaticParams() {
    const games = await getGames(100);
    return games.map((game) => ({
        slug: game.slug,
    }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const game = await getGameBySlug(slug);

    if (!game) {
        return {
            title: "Game Not Found - Grove Play",
        };
    }

    // Strip HTML from excerpt for meta description
    const description = `Play ${game.title} online for free at Grove Play. No downloads required.`;

    return {
        title: `${game.title} - Play Online | Grove Play`,
        description: description,
        openGraph: {
            title: `${game.title} - Grove Play`,
            description: description,
            images: [game.thumbnailUrl],
            type: 'website',
        },
        twitter: {
            card: 'summary_large_image',
            title: game.title,
            description: description,
            images: [game.thumbnailUrl],
        },
    };
}

interface GamePageProps {
    params: Promise<{ slug: string }>;
}

export default async function GamePage({ params }: GamePageProps) {
    const { slug } = await params;
    const game = await getGameBySlug(slug);

    if (!game) {
        notFound();
    }

    // Schema.org Structured Data (Rich Snippet)
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": game.title,
        "applicationCategory": "Game",
        "operatingSystem": "Any",
        "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "USD"
        },
        "description": `Play ${game.title} online for free at Grove Play. No downloads required.`,
        "image": game.thumbnailUrl,
        "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.8", // Dynamic rating would go here
            "reviewCount": game.totalPlays > 0 ? game.totalPlays : 1, // Using plays as proxy for review count demo
            "bestRating": "5",
            "worstRating": "1"
        },
        "author": {
            "@type": "Organization",
            "name": "Grove Play"
        },
        "datePublished": new Date().toISOString(), // Fallback date
    };

    return (
        <main style={{ minHeight: '100vh', background: '#050505' }}>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <Navbar />
            <div style={{ paddingTop: '80px' }}>
                <GamePlayer game={game} />
            </div>

            <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 20px 60px 20px' }}>
                <GameCommentForm gameId={game.databaseId} />

                {/* Comments List */}
                <div style={{ marginTop: '40px' }}>
                    <h3 style={{ color: '#fff', fontSize: '1.5rem', marginBottom: '20px' }}>
                        Comments ({game.comments?.nodes?.length || 0})
                    </h3>

                    {game.comments?.nodes && game.comments.nodes.length > 0 ? (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                            {game.comments.nodes.map((comment) => (
                                <div key={comment.databaseId} style={{
                                    background: 'rgba(255,255,255,0.05)',
                                    padding: '20px',
                                    borderRadius: '12px',
                                    border: '1px solid rgba(255,255,255,0.1)'
                                }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '10px' }}>
                                        <div style={{
                                            width: '40px', height: '40px', borderRadius: '50%',
                                            background: '#333', overflow: 'hidden', flexShrink: 0
                                        }}>
                                            {comment.author?.node?.avatar?.url ? (
                                                <img src={comment.author.node.avatar.url} alt="" style={{ width: '100%', height: '100%' }} />
                                            ) : (
                                                <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#666', fontSize: '12px' }}>?</div>
                                            )}
                                        </div>
                                        <div>
                                            <div style={{ color: '#fff', fontWeight: '600' }}>{comment.author?.node?.name || 'Anonymous'}</div>
                                            <div style={{ color: '#666', fontSize: '0.85rem' }}>{new Date(comment.date).toLocaleDateString()}</div>
                                        </div>
                                    </div>
                                    <div style={{ color: '#ccc', lineHeight: '1.6', fontSize: '0.95rem' }} dangerouslySetInnerHTML={{ __html: comment.content }} />
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div style={{
                            textAlign: 'center', padding: '40px',
                            background: 'rgba(255,255,255,0.02)', borderRadius: '12px',
                            color: '#888', fontStyle: 'italic'
                        }}>
                            No comments yet. Be the first to share your thoughts!
                        </div>
                    )}
                </div>
            </div>
        </main>
    );
}
