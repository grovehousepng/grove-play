const API_URL = 'https://dev-grove-games.pantheonsite.io/graphql';

async function fetchGraphQL(query, variables = {}) {
  try {
    const res = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query, variables }),
    });
    const json = await res.json();
    return json.data;
  } catch (e) {
    console.error("Fetch Error:", e);
    return null;
  }
}

async function getPopularGames() {
  const query = `
    query GetPopularGamesFallback {
      games(first: 60, where: { orderby: { field: DATE, order: DESC } }) {
        edges {
          node {
            databaseId
            title
            slug
            gameUrl
            thumbnailUrl
            totalPlays
            content(format: RENDERED)
          }
        }
      }
    }
  `;

  console.log("Fetching...");
  const data = await fetchGraphQL(query, {});
  const games = data?.games?.edges?.map(edge => edge.node) || [];

  console.log(`Fetched ${games.length} games.`);

  // Client-side sort by totalPlays
  games.sort((a, b) => (b.totalPlays || 0) - (a.totalPlays || 0));

  games.slice(0, 5).forEach(g => {
    console.log(`- ${g.title} (${g.totalPlays})`);
    if (g.title.includes("World of Illusion")) {
      console.log("URL:", g.gameUrl);
      console.log("Type:", g.gameType); // Might be undefined in this script query but good to check
    }
    if (g.title.includes("Wonder Boy")) {
      console.log("Wonder Boy URL:", g.gameUrl);
      console.log("Wonder Boy Type:", g.gameType);
    }
  });
}

getPopularGames();
