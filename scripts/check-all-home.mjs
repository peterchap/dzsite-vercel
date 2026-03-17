import { createClient } from '@sanity/client'
import dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET
const token = process.env.SANITY_API_TOKEN

const client = createClient({
    projectId,
    dataset,
    apiVersion: '2024-01-01',
    token,
    useCdn: false
})

async function run() {
    const pages = await client.fetch('*[_type == "page" && slug.current == "home"]{_id, _updatedAt, title}')
    console.log("All pages with slug 'home':", JSON.stringify(pages, null, 2))
}

run().catch(console.error)
