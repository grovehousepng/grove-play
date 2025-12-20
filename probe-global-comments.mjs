const API_URL = 'https://dev-grove-games.pantheonsite.io/graphql';

async function probe() {
    const query = `
    query GetAllComments {
      comments(first: 5) {
        nodes {
          databaseId
          content(format: RENDERED)
          approved
          commentedOn {
            node {
              ... on Game {
                title
                slug
              }
            }
          }
        }
      }
    }
  `;

    try {
        const res = await fetch(API_URL + `?t=${Date.now()}`, {
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
