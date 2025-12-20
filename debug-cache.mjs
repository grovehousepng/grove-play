const API_URL = 'https://dev-grove-games.pantheonsite.io/graphql';

async function testCacheBuster() {
    const query = `
    query GetGames {
      games(first: 1) {
        edges {
          node {
            title
          }
        }
      }
    }
  `;

    const urlWithParam = `${API_URL}?t=${Date.now()}`;
    console.log(`Testing URL: ${urlWithParam}`);

    try {
        const res = await fetch(urlWithParam, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ query }),
        });

        console.log(`Status: ${res.status} ${res.statusText}`);
        const text = await res.text();
        // Verify if it's JSON
        try {
            const json = JSON.parse(text);
            if (json.data) console.log("Success: Got data");
            else console.log("Fail: No data", json);
        } catch {
            console.log("Fail: Response not JSON", text.substring(0, 100));
        }
    } catch (e) {
        console.error("Fetch Error:", e);
    }
}

testCacheBuster();
