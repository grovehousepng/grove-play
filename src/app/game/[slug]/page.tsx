import { prisma } from "@/lib/db";
import GamePlayer from "@/components/GamePlayer/GamePlayer";
import Navbar from "@/components/Navbar/Navbar";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import CommentsSection from "@/components/CommentsSection";
import PlayTracker from "@/components/PlayTracker";

export const revalidate = 0;

export async function generateStaticParams() {
    const games = await prisma.game.findMany({
        select: { slug: true },
        take: 100
    });
    return games.map((game) => ({
        slug: game.slug,
    }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const game = await prisma.game.findUnique({ where: { slug } });

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
            images: [game.thumbnailUrl || ''],
            type: 'website',
        },
        twitter: {
            card: 'summary_large_image',
            title: game.title,
            description: description,
            images: [game.thumbnailUrl || ''],
        },
    };
}

interface GamePageProps {
    params: Promise<{ slug: string }>;
}

import StarRating from "@/components/StarRating";

export default async function GamePage({ params }: GamePageProps) {
    const { slug } = await params;
    const dbGame = await prisma.game.findUnique({
        where: { slug },
        include: {
            comments: {
                where: { approved: true }, // ONLY SHOW APPROVED COMMENTS
                orderBy: { createdAt: 'desc' }
            }
        }
    });

    if (!dbGame) {
        notFound();
    }

    // Fetch Ratings
    const ratingAgg = await prisma.rating.aggregate({
        where: { gameId: dbGame.id },
        _avg: { value: true },
        _count: { value: true }
    });

    // Map Prisma DB structure to Frontend Game Interface
    const game = {
        databaseId: dbGame.id,
        title: dbGame.title,
        slug: dbGame.slug,
        gameUrl: dbGame.gameUrl,
        thumbnailUrl: dbGame.thumbnailUrl || '',
        totalPlays: dbGame.playCount,
        gameType: dbGame.gameType,
        gameWidth: 0,
        gameHeight: 0,
        content: dbGame.description || '',
        comments: { nodes: [] } // Legacy prop
    };

    // Schema.org Structured Data
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": game.title,
        "applicationCategory": "Game",
        "operatingSystem": "Any",
        "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
        "description": `Play ${game.title} online for free.`,
        "image": game.thumbnailUrl,
        "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": ratingAgg._avg.value ? ratingAgg._avg.value.toFixed(1) : "5.0",
            "reviewCount": ratingAgg._count.value > 0 ? ratingAgg._count.value : 1,
            "bestRating": "5",
            "worstRating": "1"
        },
        "author": { "@type": "Organization", "name": "Grove Play" },
        "datePublished": new Date().toISOString(),
    };

    return (
        <main style={{ minHeight: '100vh', background: '#050505' }}>
            <PlayTracker gameId={dbGame.id} />

            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <Navbar />
            <div style={{ paddingTop: '80px' }}>
                <GamePlayer game={game} />
            </div>

            <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 20px 60px 20px' }}>

                {/* Star Rating */}
                <div style={{ marginTop: '40px' }}>
                    <StarRating
                        gameId={dbGame.id}
                        initialAverage={ratingAgg._avg.value || 0}
                        initialCount={ratingAgg._count.value}
                    />
                </div>

                {/* New Comments Section */}
                <CommentsSection gameId={dbGame.id} initialComments={dbGame.comments} />
            </div>
        </main>
    );
}
