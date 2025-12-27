const { createClient } = require('next-sanity');

const client = createClient({
    projectId: 'w8wq190o',
    dataset: 'production',
    apiVersion: '2024-01-01',
    useCdn: false,
});

async function debug() {
    const pages = await client.fetch('*[_type == "page"]{title, "slug": slug.current}');
    console.log('All pages:', JSON.stringify(pages, null, 2));

    const home = await client.fetch('*[_type == "page" && slug.current == "home"][0]');
    console.log('Home page document:', JSON.stringify(home, null, 2));
}

debug();
