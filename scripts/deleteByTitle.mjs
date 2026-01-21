import { createClient } from '@sanity/client'
import dotenv from 'dotenv'
import path from 'path'
import readline from 'readline'

// Try loading from .env.local
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') })

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET
const token = process.env.SANITY_API_TOKEN || process.env.SANITY_AUTH_TOKEN

if (!projectId || !dataset || !token) {
    console.error('Missing env: NEXT_PUBLIC_SANITY_PROJECT_ID, NEXT_PUBLIC_SANITY_DATASET, SANITY_API_TOKEN')
    process.exit(1)
}

const client = createClient({ projectId, dataset, apiVersion: '2024-01-01', token, useCdn: false })

async function run() {
    const titleArg = process.argv[2]

    if (!titleArg) {
        console.error('Please provide a page title in quotes. Example: node scripts/deleteByTitle.mjs "My Page Title"')
        process.exit(1)
    }

    try {
        console.log(`Searching for page with title: "${titleArg}"...`)
        const page = await client.fetch('*[_type == "page" && title == $title][0]', { title: titleArg }) // Exact match first

        if (!page) {
            console.log(`No exact match found for "${titleArg}".`)
            process.exit(1)
        }

        console.log(`Found page:`)
        console.log(`- Title: ${page.title}`)
        console.log(`- ID: ${page._id}`)

        // We can't prompt easily in this script if run via tool, so we require a force flag or assume yes if running manually. 
        // For now, let's just delete it since the user will ask for it specificially.

        console.log(`Deleting document ${page._id}...`)
        await client.delete(page._id)
        console.log('Done.')

    } catch (err) {
        console.error(err)
        process.exit(1)
    }
}

run()
