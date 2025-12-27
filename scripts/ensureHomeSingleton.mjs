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
  const home = await client.fetch('*[_type == "page" && slug.current == "home"][0]')
  if (!home) {
    console.error('No page with slug "home" found. Create it in Studio or seed it first.')
    process.exit(1)
  }

  const {_type, title, slug, seo, hero, sections} = home
  const doc = {
    _type,
    _id: 'page.home',
    title: title || 'Home',
    slug: slug || { _type: 'slug', current: 'home' },
    seo: seo || null,
    hero: hero || null,
    sections: sections || []
  }

  const res = await client.createOrReplace(doc)
  console.log('Ensured Home singleton document exists:', res._id)
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})