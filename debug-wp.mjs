
import { getPageByUri } from './src/lib/wordpress.js';

async function run() {
    console.log('Fetching /hakkimizda/ ...');
    const page = await getPageByUri('/hakkimizda/');
    console.log('Page:', page);
    if (page) {
        console.log('Title:', page.title);
        console.log('Content Length:', page.content ? page.content.length : 0);
        console.log('Content Preview:', page.content ? page.content.substring(0, 100) : 'N/A');
    } else {
        console.log('Page not found via URI /hakkimizda/');
    }
}

run();
