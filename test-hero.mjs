import { createClient } from '@sanity/client'
import dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET
const token = process.env.SANITY_API_TOKEN || process.env.SANITY_AUTH_TOKEN

const client = createClient({ projectId, dataset, apiVersion: '2024-01-01', token, useCdn: false })

async function run() {
  const query = `*[_type == "page" && slug.current == "home"][0]{hero{_type, eyebrow, headline}}`
  const page = await client.fetch(query)
  console.log('Hero:', JSON.stringify(page?.hero, null, 2))
}

run().catch(console.error)
