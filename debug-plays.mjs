const API_URL = 'https://dev-grove-games.pantheonsite.io/graphql';

async function probe() {
  const query = `
    query GetGamesWithDate {
      games(first: 20, where: { orderby: { field: DATE, order: DESC } }) {
        edges {
          node {
            databaseId
            title
            slug
            totalPlays
            content(format: RENDERED)
          }
        }
      }
    }
  `;

  try {
    const res = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query }),
    });
    const json = await res.json();
    if (json.errors) {
      console.error("Errors:", JSON.stringify(json.errors, null, 2));
    } else {
      const games = json.data.games.edges.map(e => e.node);
      console.log("Found games:", games.length);
      games.forEach(g => {
        console.log(`ID: ${g.databaseId}, Title: ${g.title}, TotalPlays: ${g.totalPlays}, Type: ${typeof g.totalPlays}`);
      });
    }
  } catch (e) {
    console.error(e);
  }
}

probe();
