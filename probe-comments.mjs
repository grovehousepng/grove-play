const API_URL = 'https://dev-grove-games.pantheonsite.io/graphql';

async function probe() {
    const query = `
    query GetGameComments {
      game(id: "grindcraft", idType: SLUG) {
        title
        commentStatus
        comments(first: 10) {
          nodes {
            databaseId
            content
            approved
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
            body: JSON.stringify({ query }),
        });
        const json = await res.json();
        console.log(JSON.stringify(json, null, 2));
    } catch (e) {
        console.error(e);
    }
}

probe();
