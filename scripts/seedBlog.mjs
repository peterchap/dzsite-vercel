import { createClient } from '@sanity/client'
import dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET
const token = process.env.SANITY_API_TOKEN || process.env.SANITY_AUTH_TOKEN

if (!token) {
    console.error('No SANITY_API_TOKEN found in .env.local')
    process.exit(1)
}

const client = createClient({ projectId, dataset, apiVersion: '2024-01-01', token, useCdn: false })

async function run() {
    const post = {
        _id: 'blog-welcome',
        _type: 'blogPost',
        title: 'Welcome to the Datazag Blog',
        slug: { _type: 'slug', current: 'welcome-to-datazag' },
        publishedAt: new Date().toISOString(),
        excerpt: 'We are excited to launch the Datazag blog, where we will share insights on domain intelligence, security research, and product updates.',
        body: [
            {
                _type: 'block',
                _key: 'b1',
                children: [
                    {
                        _type: 'span',
                        _key: 's1',
                        text: 'Domain intelligence is at the core of what we do. At Datazag, we track over 315M domains to provide real-time signals for security teams, marketers, and researchers.'
                    }
                ],
                markDefs: [],
                style: 'normal'
            },
            {
                _type: 'block',
                _key: 'b2',
                children: [
                    {
                        _type: 'span',
                        _key: 's2',
                        text: 'This blog will be our home for:'
                    }
                ],
                markDefs: [],
                style: 'normal'
            },
            {
                _type: 'block',
                _key: 'b3',
                children: [
                    {
                        _type: 'span',
                        _key: 's3',
                        text: '• Product updates and new feature announcements'
                    }
                ],
                markDefs: [],
                style: 'normal'
            },
            {
                _type: 'block',
                _key: 'b4',
                children: [
                    {
                        _type: 'span',
                        _key: 's4',
                        text: '• Deep dives into DNS and infrastructure health'
                    }
                ],
                markDefs: [],
                style: 'normal'
            },
            {
                _type: 'block',
                _key: 'b5',
                children: [
                    {
                        _type: 'span',
                        _key: 's5',
                        text: '• Security research and threat intelligence'
                    }
                ],
                markDefs: [],
                style: 'normal'
            }
        ],
        tags: ['Announcement', 'Company']
    }

    console.log('Creating sample blog post...')
    await client.createOrReplace(post)
    console.log('Success! Blog post "Welcome to the Datazag Blog" has been created.')
}

run().catch(console.error)
