import { createClient } from '@sanity/client'
import { readFileSync } from 'fs'

// quick hack to load env vars without dotenv from root
import dotenv from 'dotenv'
dotenv.config({ path: '.env.local' })

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET
const token = process.env.SANITY_API_TOKEN

const client = createClient({
    projectId,
    dataset,
    apiVersion: '2024-01-01',
    token, // We use the token to see drafts vs published
    useCdn: false
})

async function run() {
    const pages = await client.fetch('*[_type == "page" && (slug.current == "home" || slug.current == "home2")]{_id, title, "slug": slug.current, _updatedAt}')
    console.log("Pages matching 'home' or 'home2' (including drafts):")
    console.log(JSON.stringify(pages, null, 2))
}

run().catch(console.error)
