import { createClient } from '@sanity/client'
import dotenv from 'dotenv'
import path from 'path'
import fs from 'fs'

// Try loading from .env.local
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') })

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET
const token = process.env.SANITY_API_TOKEN || process.env.SANITY_AUTH_TOKEN

if (!projectId || !dataset || !token) {
    process.exit(1)
}

const client = createClient({ projectId, dataset, apiVersion: '2024-01-01', token, useCdn: false })

async function run() {
    try {
        const pages = await client.fetch('*[_type == "page"] { _id, title, "slug": slug.current }')
        const output = pages.map(p => `ID: ${p._id} | Title: "${p.title}" | Slug: /${p.slug}`).join('\n')
        fs.writeFileSync('pages_list.txt', output)
        console.log('Pages list written to pages_list.txt')
    } catch (err) {
        console.error(err)
    }
}

run()
