const API_URL = 'https://dev-grove-games.pantheonsite.io/graphql';

async function probe() {
    // Query requesting suspect fields and new rating fields (guessing camelCase)
    const query = `
    query ProbeFields {
      games(first: 1) {
        edges {
          node {
            title
            gameWidth
            gameHeight
            game_rating
            gameRating
            rating_count
            ratingCount
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
        console.log("Errors:", JSON.stringify(json.errors, null, 2));
        if (json.data) {
            console.log("Data keys:", Object.keys(json.data.games.edges[0]?.node || {}));
        }
    } catch (e) {
        console.error(e);
    }
}

probe();
