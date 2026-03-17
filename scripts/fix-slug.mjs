import { createClient } from '@sanity/client'
import dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET
const token = process.env.SANITY_API_TOKEN

if (!projectId || !dataset || !token) {
    console.error('Missing env vars!')
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
    console.log("Looking for document with slug 'home2'...")
    const home2 = await client.fetch('*[_type == "page" && slug.current == "home2"][0]')

    if (home2) {
        console.log(`Found document! ID: ${home2._id}, Current Title: ${home2.title}`)
        console.log("Updating slug to 'home'...")

        await client.patch(home2._id)
            .set({ slug: { _type: 'slug', current: 'home' } })
            .commit()

        console.log("Update successful!")
    } else {
        console.log("Could not find a document with slug 'home2'.")
    }
}

run().catch((err) => {
    console.error("Error:", err)
    process.exit(1)
})
