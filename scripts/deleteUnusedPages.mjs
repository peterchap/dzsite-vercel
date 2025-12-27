import { createClient } from '@sanity/client'
import dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET
const token = process.env.SANITY_API_TOKEN || process.env.SANITY_AUTH_TOKEN

const client = createClient({ projectId, dataset, apiVersion: '2024-01-01', token, useCdn: false })

async function run() {
    const ids = [
        '5eacc848-4501-4733-8bf8-73b40acbc85b',
        'drafts.5eacc848-4501-4733-8bf8-73b40acbc85b',
        'fd8ce070-46d0-44fa-abf3-eb27899324ff',
        'drafts.fd8ce070-46d0-44fa-abf3-eb27899324ff',
        '2218bcaf-4025-46c8-801c-5fb32a492185',
        'drafts.2218bcaf-4025-46c8-801c-5fb32a492185'
    ]

    console.log('Deleting unused Sanity pages...')

    for (const id of ids) {
        try {
            await client.delete(id)
            console.log(`Deleted ${id}`)
        } catch (e) {
            // Ignore if not found
        }
    }
}

run().catch(console.error)
