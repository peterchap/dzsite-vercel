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
  const id = process.argv[2] || 'homePage'
  try {
    // Check existence
    const found = await client.fetch('*[_id == $id][0]', { id })
    if (!found) {
      console.log(`Document ${id} not found; nothing to delete.`)
      return
    }
    await client.delete(id)
    console.log(`Deleted document ${id}.`)
  } catch (err) {
    console.error(err)
    process.exit(1)
  }
}

run()