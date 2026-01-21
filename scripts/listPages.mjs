import { createClient } from '@sanity/client'
import dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET
const token = process.env.SANITY_API_TOKEN || process.env.SANITY_AUTH_TOKEN

if (!projectId || !dataset || !token) {
    console.error('Missing env: NEXT_PUBLIC_SANITY_PROJECT_ID, NEXT_PUBLIC_SANITY_DATASET, SANITY_API_TOKEN')
    process.exit(1)
}

const client = createClient({ projectId, dataset, apiVersion: '2024-01-01', token, useCdn: false })

async function run() {
    try {
        const pages = await client.fetch('*[_type == "page"] { _id, title, "slug": slug.current }')
        console.log('Found pages:')
        pages.forEach(p => {
            console.log(`- Title: "${p.title}" | Slug: /${p.slug} | ID: ${p._id}`)
        })
    } catch (err) {
        console.error(err)
        process.exit(1)
    }
}

run()
