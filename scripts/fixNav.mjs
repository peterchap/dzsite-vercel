import { createClient } from '@sanity/client'
import dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET
const token = process.env.SANITY_API_TOKEN || process.env.SANITY_AUTH_TOKEN

const client = createClient({ projectId, dataset, apiVersion: '2024-01-01', token, useCdn: false })

async function run() {
    const navLinks = [
        { _type: 'navLink', label: 'Home', href: '/' },
        { _type: 'navLink', label: 'Domain Intelligence', href: '/domain-intelligence' },
        { _type: 'navLink', label: 'Documentation', href: '/docs' },
        { _type: 'navLink', label: 'Pricing', href: '/pricing' },
        { _type: 'navLink', label: 'Blog', href: '/blog' },
    ]

    console.log('Updating both drafts and published site settings...')

    const ids = ['siteSettings.main', 'drafts.siteSettings']

    for (const id of ids) {
        try {
            await client.patch(id).set({ navLinks, footerLinks: navLinks }).commit()
            console.log(`Updated ${id}`)
        } catch (e) {
            console.log(`Could not update ${id}: ${e.message}`)
        }
    }
}

run().catch(console.error)
