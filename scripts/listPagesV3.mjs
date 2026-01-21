import { createClient } from '@sanity/client'
import dotenv from 'dotenv'
import path from 'path'

// Try loading from .env.local
const result = dotenv.config({ path: path.resolve(process.cwd(), '.env.local') })

console.log("Loading config...")
if (result.error) {
    console.log("Error loading .env.local:", result.error.message)
}

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET
const token = process.env.SANITY_API_TOKEN || process.env.SANITY_AUTH_TOKEN

console.log(`Config: ProjectID=${projectId ? 'Found' : 'Missing'}, Dataset=${dataset ? 'Found' : 'Missing'}, Token=${token ? 'Found' : 'Missing'}`)

if (!projectId || !dataset || !token) {
    console.error('Missing required environment variables.')
    process.exit(1)
}

const client = createClient({ projectId, dataset, apiVersion: '2024-01-01', token, useCdn: false })

async function run() {
    try {
        console.log("Fetching pages...")
        const pages = await client.fetch('*[_type == "page"] { _id, title, "slug": slug.current }')
        console.log('--- PAGES START ---')
        pages.forEach(p => {
            console.log(`ID: ${p._id} | Title: ${p.title} | Slug: ${p.slug}`)
        })
        console.log('--- PAGES END ---')
    } catch (err) {
        console.error("Fetch error:", err.message)
        process.exit(1)
    }
}

run()
