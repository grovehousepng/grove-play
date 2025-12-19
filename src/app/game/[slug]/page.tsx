import { getGameBySlug, getGames } from "@/lib/wordpress";
import GamePlayer from "@/components/GamePlayer/GamePlayer";
import Navbar from "@/components/Navbar/Navbar";
import GameCommentForm from "@/components/GameCommentForm/GameCommentForm";
import { notFound } from "next/navigation";

export const revalidate = 60;

export async function generateStaticParams() {
    const games = await getGames(100);
    return games.map((game) => ({
        slug: game.slug,
    }));
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

    return (
        <main style={{ minHeight: '100vh', background: '#050505' }}>
            <Navbar />
            <div style={{ paddingTop: '80px' }}>
                <GamePlayer game={game} />
            </div>

            <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 20px 60px 20px' }}>
                <GameCommentForm gameId={game.databaseId} />
            </div>
        </main>
    );
}
