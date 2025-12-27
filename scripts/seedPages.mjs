import fs from 'node:fs'
import readline from 'node:readline'
import { createClient } from '@sanity/client'
import dotenv from 'dotenv'

// Load env from .env.local
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
  const filePath = 'sanity/seed/pages.ndjson'
  if (!fs.existsSync(filePath)) {
    console.error('Seed file not found:', filePath)
    process.exit(1)
  }

  const fileStream = fs.createReadStream(filePath)
  const rl = readline.createInterface({ input: fileStream, crlfDelay: Infinity })

  const docs = []
  for await (const line of rl) {
    const trimmed = line.trim()
    if (!trimmed) continue
    try {
      const doc = JSON.parse(trimmed)
      docs.push({ createOrReplace: doc })
    } catch (e) {
      console.error('Invalid JSON line, skipping:', trimmed)
    }
  }

  if (docs.length === 0) {
    console.error('No documents to import')
    process.exit(1)
  }

  console.log(`Importing ${docs.length} documents to ${projectId}/${dataset}...`)
  const res = await client.transaction(docs).commit({ visibility: 'sync' })
  console.log('Import complete. Transaction id:', res.transactionId)
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})