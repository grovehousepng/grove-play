async function checkPlainRoutes() {
    console.log("Checking API via ?rest_route=/ ...");
    try {
        const res = await fetch('https://dev-grove-games.pantheonsite.io/index.php?rest_route=/');
        const json = await res.json();

        const namespaces = json.namespaces;
        if (namespaces) {
            console.log("SUCCESS: REST API works via query param!");
            if (namespaces.includes('grove-api/v1')) {
                console.log("SUCCESS: 'grove-api/v1' is found via query param!");
            } else {
                console.log("FAILURE: API works but 'grove-api/v1' is NOT found.");
            }
        }
    } catch (e) {
        console.error("Failed to fetch JSON via param:", e);
    }
}
checkPlainRoutes();
