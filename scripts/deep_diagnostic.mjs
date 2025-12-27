import { createClient } from '@sanity/client'
import dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET
const token = process.env.SANITY_API_TOKEN || process.env.SANITY_AUTH_TOKEN

console.log('--- Environment Check ---')
console.log('ACTIVE_PROJECT_ID:', projectId)
console.log('ACTIVE_DATASET:', dataset)
console.log('HAS_TOKEN:', !!token)

const client = createClient({
    projectId: projectId || 'w8wq190o',
    dataset: dataset || 'production',
    apiVersion: '2024-01-01',
    token,
    useCdn: false
})

const publicClient = createClient({
    projectId: projectId || 'w8wq190o',
    dataset: dataset || 'production',
    apiVersion: '2024-01-01',
    useCdn: false
})

async function run() {
    console.log('\n--- Unauthenticated Scan (Anonymous) ---')
    try {
        const publicPages = await publicClient.fetch('*[_type == "page"]{_id, title, "slug": slug.current}')
        console.log('Pages visible without token:', publicPages.length)
        publicPages.forEach(p => console.log(`- Slug: ${p.slug} | ID: ${p._id}`))
    } catch (err) {
        console.log('Public fetch failed:', err.message)
    }

    console.log('\n--- Authenticated Scan (With Token) ---')
    const pages = await client.fetch('*[_type == "page"]{_id, _rev, _type, title, "slug": slug.current}')
    console.log('Total page documents found:', pages.length)
    pages.forEach(p => {
        console.log(`- ID: ${p._id} | Title: ${p.title} | Slug: ${p.slug} | Type: ${p._type}`)
    })

    console.log('\n--- Checking for slug "home" specifically (any type) ---')
    const anyHome = await client.fetch('*[slug.current == "home"]{_id, _type, title}')
    if (anyHome.length > 0) {
        console.log('Found documents with slug "home" but maybe different types:')
        anyHome.forEach(h => console.log(`- ID: ${h._id} | Type: ${h._type} | Title: ${h.title}`))
    } else {
        console.log('No documents found with slug "home" at all.')
    }

    console.log('\n--- Perspective Check (including drafts) ---')
    if (token) {
        const allIncludingDrafts = await client.fetch('*[_type == "page"]', {}, { perspective: 'previewDrafts' })
        console.log('Pages found in previewDrafts perspective:', allIncludingDrafts.length)
    } else {
        console.log('Cannot check drafts without a token.')
    }
}

run().catch((err) => {
    console.error('\nDIAGNOSTIC FAILED:', err.message)
})
