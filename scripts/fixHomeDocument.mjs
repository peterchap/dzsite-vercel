import { createClient } from '@sanity/client'
import dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET
const token = process.env.SANITY_API_TOKEN || process.env.SANITY_AUTH_TOKEN

if (!projectId || !dataset || !token) {
    console.error('Missing environment variables in .env.local: NEXT_PUBLIC_SANITY_PROJECT_ID, NEXT_PUBLIC_SANITY_DATASET, and SANITY_API_TOKEN')
    process.exit(1)
}

const client = createClient({
    projectId,
    dataset,
    apiVersion: '2024-01-01',
    token,
    useCdn: false
})

async function run() {
    const homeId = 'page.home'

    console.log(`Checking for document with ID: ${homeId}...`)
    const existing = await client.fetch('*[_id == $homeId][0]{_id}', { homeId })

    if (existing) {
        console.log('Document "page.home" already exists. Ensuring slug is set to "home"...')
        await client.patch(homeId).set({ slug: { _type: 'slug', current: 'home' } }).commit()
        console.log('Success: "page.home" document is ready.')
    } else {
        console.log('Document "page.home" not found. Creating a new one...')
        const newDoc = {
            _type: 'page',
            _id: homeId,
            title: 'Home',
            slug: { _type: 'slug', current: 'home' },
            sections: []
        }
        await client.create(newDoc)
        console.log('Success: Created new "page.home" document.')
    }
}

run().catch((err) => {
    console.error('Error:', err.message)
    process.exit(1)
})
