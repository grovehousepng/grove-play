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

async function probe() {
  const query = `
    query GetGames {
      games(first: 1) {
        edges {
          node {
            title
            gameUrl
            thumbnailUrl
            totalPlays
            content(format: RENDERED)
            gameWidth
            gameHeight
          }
        }
      }
    }
  `;

  console.log("Probing...");
  const data = await fetchGraphQL(query);
  if (data?.games?.edges) {
    console.log("Success! Fetched:", data.games.edges.length);
    console.log("Keys:", Object.keys(data.games.edges[0].node));
  } else {
    console.log("Failed or Empty");
  }
}

probe();
