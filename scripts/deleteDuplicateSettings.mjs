import { createClient } from '@sanity/client'
import dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

const client = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'w8wq190o',
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
    apiVersion: '2024-01-01',
    token: process.env.SANITY_API_TOKEN || process.env.SANITY_AUTH_TOKEN,
    useCdn: false
})

async function run() {
    console.log('Searching for duplicates...')
    const docs = await client.fetch('*[title == "Site Settings" && _type == "page"]{_id, _type, title}')
    console.log('Found duplicate pages:', JSON.stringify(docs, null, 2))

    for (const doc of docs) {
        console.log(`Deleting duplicate: ${doc._id}`)
        await client.delete(doc._id)
        console.log(`Successfully deleted ${doc._id}`)
    }

    if (docs.length === 0) {
        console.log('No duplicate Site Settings pages found.')
    }
}

run().catch(console.error)
