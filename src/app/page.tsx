import { prisma } from "@/lib/db";
import HomeClient from "./HomeClient";

// Force dynamic because we want fresh data (e.g. play counts) 
// or use revalidate if we want some caching.
export const revalidate = 0;

export default async function Home() {
  try {
    const games = await prisma.game.findMany(); // Fetch all to sort in memory

    // Heuristic for "World Popularity" based on title keywords
    const getPopularityScore = (title: string) => {
      const t = title.toLowerCase();
      if (t.includes('pokemon')) return 100;
      if (t.includes('mario')) return 90;
      if (t.includes('zelda')) return 85;
      if (t.includes('sonic')) return 80;
      if (t.includes('gta')) return 75;
      if (t.includes('grand theft auto')) return 75;
      if (t.includes('dragon ball')) return 70;
      if (t.includes('metal slug')) return 65;
      if (t.includes('street fighter')) return 60;
      if (t.includes('mortal kombat')) return 60;
      if (t.includes('tekken')) return 60;
      if (t.includes('crash bandicoot')) return 55;
      if (t.includes('donkey kong')) return 50;
      if (t.includes('kirby')) return 45;
      if (t.includes('final fantasy')) return 40;
      if (t.includes('castlevania')) return 35;
      if (t.includes('metroid')) return 35;
      if (t.includes('mega man')) return 30;
      if (t.includes('pac-man')) return 25;
      if (t.includes('tetris')) return 25;
      if (t.includes('doom')) return 20;
      return 0;
    };

    // Sort: 1. PlayCount (Desc) -> 2. Popularity Score (Desc) -> 3. Title (Asc)
    games.sort((a, b) => {
      if (b.playCount !== a.playCount) return b.playCount - a.playCount;

      const scoreA = getPopularityScore(a.title);
      const scoreB = getPopularityScore(b.title);
      if (scoreB !== scoreA) return scoreB - scoreA;

      return a.title.localeCompare(b.title);
    });

    // Map Prisma DB structure to Frontend Game Interface
    const mappedGames = games.map((g) => ({
      databaseId: g.id,
      title: g.title,
      slug: g.slug,
      gameUrl: g.gameUrl,
      thumbnailUrl: g.thumbnailUrl || '',
      totalPlays: g.playCount || 0,
      gameType: g.gameType || 'emulator', // Ensure string
      gameWidth: 0,
      gameHeight: 0,
      content: g.description || '',
    }));

    return <HomeClient initialGames={mappedGames} />;
  } catch (error: any) {
    console.error("Home Error:", error);
    return (
      <div style={{ color: 'red', padding: '50px', whiteSpace: 'pre-wrap' }}>
        <h1>Veritabanı Hatası</h1>
        <p>{error.message}</p>
        <p>{JSON.stringify(error, null, 2)}</p>
      </div>
    );
  }
}
