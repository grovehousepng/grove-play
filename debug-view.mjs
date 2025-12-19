const REST_URL = 'https://dev-grove-games.pantheonsite.io/wp-json/grove-api/v1';

// Replace with a known valid Game DATABASE ID (Not GraphQL ID)
// You can get this from the API or checking the site. 
// Assuming checking ID 123 (or whatever ID was in the logs). 
// I'll try to fetch games first to get a valid ID.

async function debugView() {
    console.log("1. Fetching a game to get ID...");
    const gql = `
    query {
        games(first: 1) {
            edges {
                node {
                    databaseId
                    title
                    totalPlays
                }
            }
        }
    }`;

    const res = await fetch('https://dev-grove-games.pantheonsite.io/graphql', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: gql })
    });
    const json = await res.json();
    const game = json.data?.games?.edges?.[0]?.node;

    if (!game) {
        console.error("No games found to test!");
        return;
    }

    const id = game.databaseId;
    console.log(`Target Game: ${game.title} (ID: ${id})`);
    console.log(`Current GraphQL Count: ${game.totalPlays}`);

    console.log("\n2. Sending Increment Request (POST)...");
    const updateRes = await fetch(`${REST_URL}/play/${id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        cache: 'no-store'
    });

    if (!updateRes.ok) {
        console.error("Update Failed:", updateRes.status, await updateRes.text());
        return;
    }

    const updateJson = await updateRes.json();
    console.log("Update Response:", updateJson);

    console.log("\n3. Verifying with GraphQL (Bypassing Cache)...");
    const res2 = await fetch(`https://dev-grove-games.pantheonsite.io/graphql?t=${Date.now()}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: gql })
    });
    const json2 = await res2.json();
    const game2 = json2.data?.games?.edges?.[0]?.node;
    console.log(`New GraphQL Count: ${game2.totalPlays}`);

    if (game2.totalPlays > game.totalPlays) {
        console.log("SUCCESS: Count increased!");
    } else {
        console.log("FAILURE: Count did not increase.");
    }
}

debugView();
