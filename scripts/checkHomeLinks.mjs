import fs from 'fs'
import path from 'path'
import dotenv from 'dotenv'
// Load .env.local if present, else fallback to .env
const envLocal = path.resolve(process.cwd(), '.env.local')
if (fs.existsSync(envLocal)) {
  dotenv.config({ path: envLocal })
} else {
  dotenv.config()
}
import { createClient } from '@sanity/client'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET
const token = process.env.SANITY_API_TOKEN

if (!projectId || !dataset || !token) {
  console.error('Missing env: NEXT_PUBLIC_SANITY_PROJECT_ID, NEXT_PUBLIC_SANITY_DATASET, SANITY_API_TOKEN')
  process.exit(1)
}

const client = createClient({ projectId, dataset, token, useCdn: false, apiVersion: '2024-01-01' })

const query = `*[_id == "page.home"][0]{
  _id,
  title,
  hero{
    _type,
    primaryCta{label, href, externalHref, pageRef->{_id, _type, slug}},
    secondaryCta{label, href, externalHref, pageRef->{_id, _type, slug}}
  },
  sections[]{
    _key,
    _type,
    primaryCta{label, href, externalHref, pageRef->{_id, _type, slug}},
    secondaryCta{label, href, externalHref, pageRef->{_id, _type, slug}},
    left{ cta{label, href, externalHref, pageRef->{_id, _type, slug}} },
    right{ cta{label, href, externalHref, pageRef->{_id, _type, slug}} },
    cards[]{ cta{label, href, externalHref, pageRef->{_id, _type, slug}} }
  }
}`

function validateTarget(target) {
  if (!target) return { ok: false, reason: 'missing CTA' }
  const { label, href, externalHref, pageRef } = target
  const path = href || externalHref
  if (pageRef) {
    if (!pageRef._type) return { ok: false, reason: 'pageRef missing _type' }
    if (pageRef._type !== 'page') return { ok: false, reason: `pageRef type is ${pageRef._type}, expected page` }
    if (!pageRef.slug || !pageRef.slug?.current) return { ok: false, reason: 'pageRef missing slug.current' }
    return { ok: true, kind: 'pageRef', to: `/${pageRef.slug.current}` }
  }
  if (path) {
    const v = String(path).trim()
    if (!v) return { ok: false, reason: 'empty href/externalHref' }
    if (v.startsWith('/')) return { ok: true, kind: 'internal', to: v }
    if (/^(https?:\/\/|mailto:|tel:)/i.test(v)) return { ok: true, kind: 'external', to: v }
    return { ok: false, reason: 'href/externalHref must be /path or absolute URL' }
  }
  return { ok: false, reason: 'no link provided' }
}

async function main() {
  const home = await client.fetch(query)
  if (!home) {
    console.error('Home page (page.home) not found')
    process.exit(1)
  }
  const issues = []
  const inspect = (where, cta) => {
    const res = validateTarget(cta)
    if (!res.ok) issues.push({ where, label: cta?.label, reason: res.reason })
  }

  inspect('hero.primaryCta', home.hero?.primaryCta)
  inspect('hero.secondaryCta', home.hero?.secondaryCta)

  for (const s of home.sections || []) {
    inspect(`${s._type}#${s._key}.primaryCta`, s.primaryCta)
    inspect(`${s._type}#${s._key}.secondaryCta`, s.secondaryCta)
    inspect(`${s._type}#${s._key}.left.cta`, s.left?.cta)
    inspect(`${s._type}#${s._key}.right.cta`, s.right?.cta)
    if (Array.isArray(s.cards)) {
      s.cards.forEach((c, idx) => inspect(`${s._type}#${s._key}.cards[${idx}].cta`, c.cta))
    }
  }

  if (!issues.length) {
    console.log('All Home CTAs look valid.')
  } else {
    console.log('Found issues with Home CTAs:')
    for (const i of issues) {
      console.log(`- ${i.where}: ${i.label ?? '(no label)'} → ${i.reason}`)
    }
  }
}

main().catch((err) => { console.error(err); process.exit(1) })
