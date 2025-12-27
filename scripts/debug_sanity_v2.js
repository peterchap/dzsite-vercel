const { createClient } = require('next-sanity');
const fs = require('fs');

const client = createClient({
    projectId: 'w8wq190o',
    dataset: 'production',
    apiVersion: '2024-01-01',
    useCdn: false,
});

async function debug() {
    let log = '';
    try {
        const pages = await client.fetch('*[_type == "page"]{title, "slug": slug.current}');
        log += 'All pages: ' + JSON.stringify(pages, null, 2) + '\n';

        const home = await client.fetch('*[_type == "page" && slug.current == "home"][0]');
        log += 'Home page document: ' + JSON.stringify(home, null, 2) + '\n';
    } catch (e) {
        log += 'Error: ' + e.message + '\n';
    }
    fs.writeFileSync('c:\\Code\\DZ-Site\\datazag-website\\sanity_debug.log', log);
}

debug();
