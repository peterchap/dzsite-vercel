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
  const page = await client.fetch('*[_id == $id][0]', { id })
  if (!page) {
    console.error('page.home does not exist; run npm run site:ensure-home first')
    process.exit(1)
  }

  const section = {
    _type: 'section.trustEvidence',
    anchor: 'trust-evidence',
    authorityStatement: 'Built by operators with deep experience in DNS, email infrastructure, and internet-scale threat intelligence.',
    metrics: [
      { _type: 'object', value: '315M+', label: 'Domains analysed', icon: 'globe' },
      { _type: 'object', value: 'Hourly', label: 'Iceberg/Delta updates', icon: 'clock' },
      { _type: 'object', value: 'Sub-60s', label: 'Detection latency', icon: 'gauge' },
      { _type: 'object', value: 'Sub-1%', label: 'False positives', icon: 'gauge' },
    ],
    readinessSignals: [
      { _type: 'object', text: 'API-first & automation-ready', icon: 'key' },
      { _type: 'object', text: 'Cloud marketplace delivery', icon: 'cloud' },
      { _type: 'object', text: 'Secure key management', icon: 'lock' },
      { _type: 'object', text: 'Tenant isolation', icon: 'shield' },
      { _type: 'object', text: 'Audit-ready data lineage', icon: 'audit' },
    ],
    socialProof: 'Trusted by security teams protecting high-value brands and critical infrastructure.'
  }

  await client.patch(id)
    .setIfMissing({ sections: [] })
    .append('sections', [section])
    .commit()

  console.log('Appended Trust & Evidence section to Home page.')
}

run().catch((e)=>{console.error(e);process.exit(1)})