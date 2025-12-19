async function checkRoutes() {
    console.log("Checking registered API namespaces...");
    try {
        const res = await fetch('https://dev-grove-games.pantheonsite.io/wp-json/');
        const json = await res.json();

        const namespaces = json.namespaces;
        if (namespaces && namespaces.includes('grove-api/v1')) {
            console.log("SUCCESS: 'grove-api/v1' is registered!");
        } else {
            console.log("FAILURE: 'grove-api/v1' is NOT found in namespaces.");
            console.log("Found namespaces:", namespaces);
        }
    } catch (e) {
        console.error("Failed to fetch JSON root:", e);
    }
}
checkRoutes();
