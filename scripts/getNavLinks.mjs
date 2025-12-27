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
  const doc = await client.fetch('*[_type=="siteSettings"][0]{navLinks[]{label, pageRef->{slug}}, footerLinks[]{label, pageRef->{slug}}}')
  console.log(JSON.stringify(doc, null, 2))
}

run().catch((e)=>{console.error(e);process.exit(1)})