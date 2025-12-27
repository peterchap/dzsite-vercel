import { createClient } from '@sanity/client'
import dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

const client = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
    apiVersion: '2024-01-01',
    token: process.env.SANITY_API_TOKEN || process.env.SANITY_AUTH_TOKEN,
    useCdn: false
})

async function run() {
    const docs = await client.fetch('*[_type in ["siteSettings", "page"]]{_id, _type, title}')
    console.log('--- START DOCS ---')
    console.log(JSON.stringify(docs, null, 2))
    console.log('--- END DOCS ---')
}

run().catch(console.error)
