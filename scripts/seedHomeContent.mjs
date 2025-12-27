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
  const id = 'page.home'
  const exists = await client.fetch('*[_id == $id][0]{_id}', { id })
  if (!exists) {
    console.error('page.home does not exist; run npm run site:ensure-home first')
    process.exit(1)
  }

  const patch = {
    hero: {
      _type: 'section.heroSplitCta',
      eyebrow: 'DataZag',
      headline: 'Turn signals into answers',
      subheadline: 'Unify detection, threat intel and response in one place.',
      primaryCta: { _type: 'cta', label: 'See pricing', variant: 'primary', pageRef: { _type: 'reference', _ref: 'page.pricing' }},
      secondaryCta: { _type: 'cta', label: 'Talk to us', variant: 'secondary', pageRef: { _type: 'reference', _ref: 'page.contact' }}
    },
    sections: [
      { _type: 'section.simpleText', title: 'Why DataZag', body: 'Reduce noise, ship better detections faster, and prove ROI.' },
      { _type: 'section.finalCta', title: 'Ready to get started?', primaryCta: { _type: 'cta', label: 'Book a demo', variant: 'primary', pageRef: { _type: 'reference', _ref: 'page.contact' } } }
    ]
  }

  await client.patch(id).set(patch).commit()
  console.log('Seeded content for Home page.')
}

run().catch((e)=>{console.error(e);process.exit(1)})