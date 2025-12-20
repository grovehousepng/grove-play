const API_URL = 'https://dev-grove-games.pantheonsite.io/graphql';

async function probe() {
    // This query replicates what is in wordpress.ts
    const query = `
    query GetGameDetails($slug: String!) {
      game: gameBy(slug: $slug) {
        title
        slug
        comments(first: 50, where: { orderby: { field: DATE, order: DESC } }) {
          nodes {
            content
            date
          }
        }
      }
    }
  `;

    try {
        const res = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ query, variables: { slug: "race-clicker-idle" } }),
        });
        const json = await res.json();
        console.log(JSON.stringify(json, null, 2));
    } catch (e) {
        console.error(e);
    }
}

probe();
