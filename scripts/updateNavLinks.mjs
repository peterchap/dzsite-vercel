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
  let site = await client.fetch('*[_type == "siteSettings"][0]{_id}')
  if (!site?._id) {
    const created = await client.create({
      _type: 'siteSettings',
      _id: 'siteSettings.main',
      title: 'Site Settings'
    })
    site = { _id: created._id }
    console.log('Created siteSettings document:', created._id)
  }

  const navLinks = [
    {
      _type: 'navLink',
      label: 'Products',
      href: '#',
      children: [
        { _type: 'navLink', label: 'Reports', href: '/reports' },
        { _type: 'navLink', label: 'Sample report', href: '/reports/sample' },
        { _type: 'navLink', label: 'Threat Alerts', href: '/alerts' },
        { _type: 'navLink', label: 'Infrastructure Intelligence', href: '/domain-intelligence' },
      ],
    },
    {
      _type: 'navLink',
      label: 'Partners',
      href: '#',
      children: [
        { _type: 'navLink', label: 'MSSP Partners', href: '/mssp-partners' },
        { _type: 'navLink', label: 'ESP Partners', href: '/esp-partners' },
      ],
    },
    { _type: 'navLink', label: 'Pricing', href: '/pricing' },
    { _type: 'navLink', label: 'Trust', href: '/trust' },
    { _type: 'navLink', label: 'Contact', href: '/contact' },
  ]

  const footerLinks = [
    { _type: 'navLink', label: 'Reports', href: '/reports' },
    { _type: 'navLink', label: 'Threat Alerts', href: '/alerts' },
    { _type: 'navLink', label: 'Infrastructure Intelligence', href: '/domain-intelligence' },
    { _type: 'navLink', label: 'Pricing', href: '/pricing' },
    { _type: 'navLink', label: 'Trust', href: '/trust' },
    { _type: 'navLink', label: 'Contact', href: '/contact' },
  ]

  await client.patch(site._id)
    .set({ navLinks, footerLinks })
    .commit()

  console.log('Updated navLinks and footerLinks on siteSettings:', site._id)
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
