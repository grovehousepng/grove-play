const ENDPOINT = 'https://dev-grove-games.pantheonsite.io/wp-json/grove-api/v1/play/168';

async function test() {
    try {
        console.log(`POSTing to ${ENDPOINT}...`);
        const res = await fetch(ENDPOINT, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
        });

        console.log(`Status: ${res.status} ${res.statusText}`);
        const text = await res.text();
        console.log(`Response: ${text}`);
    } catch (e) {
        console.error("Fetch failed:", e);
    }
}

test();
