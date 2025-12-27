import { createClient } from '@sanity/client'
import dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET
const token = process.env.SANITY_API_TOKEN || process.env.SANITY_AUTH_TOKEN

const client = createClient({ projectId, dataset, apiVersion: '2024-01-01', token, useCdn: false })

async function run() {
    const trustLinks = [
        { _type: 'navLink', label: 'Privacy Policy', href: '/legal/privacy', _key: 'privacy' },
        { _type: 'navLink', label: 'Terms of Service', href: '/legal/terms', _key: 'terms' },
        { _type: 'navLink', label: 'DPA', href: '/legal/dpa', _key: 'dpa' },
        { _type: 'navLink', label: 'Responsible Disclosure', href: '/trust/responsible-disclosure', _key: 'disclosure' },
    ]

    console.log('Updating footer trust links to hardcoded paths...')

    const ids = ['siteSettings.main', 'drafts.siteSettings']

    for (const id of ids) {
        try {
            await client.patch(id).set({ trustLinks }).commit()
            console.log(`Updated ${id}`)
        } catch (e) {
            console.log(`Could not update ${id}: ${e.message}`)
        }
    }
}

run().catch(console.error)
