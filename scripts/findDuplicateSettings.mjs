import { createClient } from '@sanity/client'
import dotenv from 'dotenv'
import fs from 'fs'

dotenv.config({ path: '.env.local' })

const client = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
    apiVersion: '2024-01-01',
    token: process.env.SANITY_API_TOKEN || process.env.SANITY_AUTH_TOKEN,
    useCdn: false
})

async function run() {
    const docs = await client.fetch('*[title match "Site Settings"]{_id, _type, title}')
    fs.writeFileSync('scripts/duplicates_output.json', JSON.stringify(docs, null, 2))
    console.log('Results written to scripts/duplicates_output.json')
}

run().catch(console.error)
