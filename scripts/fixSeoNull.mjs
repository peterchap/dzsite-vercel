import fs from 'fs'
import path from 'path'
import dotenv from 'dotenv'
const envLocal = path.resolve(process.cwd(), '.env.local')
if (fs.existsSync(envLocal)) {
  dotenv.config({ path: envLocal })
} else {
  dotenv.config()
}
import { createClient } from '@sanity/client'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET
const token = process.env.SANITY_API_TOKEN

if (!projectId || !dataset || !token) {
  console.error('Missing env: NEXT_PUBLIC_SANITY_PROJECT_ID, NEXT_PUBLIC_SANITY_DATASET, SANITY_API_TOKEN')
  process.exit(1)
}

const client = createClient({ projectId, dataset, token, useCdn: false, apiVersion: '2024-01-01' })

async function main() {
  // Find pages where seo is explicitly null or missing _type
  const docs = await client.fetch(`*[_type == "page" && defined(seo) && seo == null]{ _id }`)

  const docsMissingType = await client.fetch(`*[_type == "page" && seo != null && !defined(seo._type)]{ _id }`)

  const targets = [...docs, ...docsMissingType]
  if (!targets.length) {
    console.log('No pages need fixing for seo field.')
    return
  }

  const tx = client.transaction()
  for (const { _id } of targets) {
    tx.patch(_id, {
      set: { seo: { _type: 'seo' } }
    })
  }
  const res = await tx.commit()
  console.log(`Patched ${targets.length} page(s):`, res.transactionId)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
