// GET /api/opentabs  ->  { items: Array<{ title: string; link: string; date: string }> }
//
// Fetches the OpenTabs "Recommendations" RSS feed server-side (avoids CORS),
// parses out title / link / pubDate, caches the result ~30 min and degrades
// gracefully to an empty list on any fetch/parse error.

const FEED_URL = 'https://opentabs.flore.nz/recommendations/feed'

interface OpenTab {
  title: string
  link: string
  date: string // ISO 8601
}

const decodeEntities = (str: string): string =>
  str
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, '$1')
    .replace(/&apos;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&#x?[0-9a-fA-F]+;/g, (m) => {
      const hex = /&#x/i.test(m)
      const code = parseInt(m.replace(/&#x?|;/gi, ''), hex ? 16 : 10)
      return Number.isNaN(code) ? m : String.fromCodePoint(code)
    })
    .replace(/&amp;/g, '&')
    .trim()

const pick = (block: string, tag: string): string => {
  const match = block.match(new RegExp(`<${tag}[^>]*>([\\s\\S]*?)</${tag}>`, 'i'))
  return match ? decodeEntities(match[1]) : ''
}

const parseFeed = (xml: string): OpenTab[] => {
  const items: OpenTab[] = []
  const itemBlocks = xml.match(/<item[\s\S]*?<\/item>/gi) || []

  for (const block of itemBlocks) {
    const title = pick(block, 'title')
    // The feed embeds drops.florenz.dev permalinks; the public host is opentabs.flore.nz
    const link = pick(block, 'link').replace('drops.florenz.dev', 'opentabs.flore.nz')
    const pubDate = pick(block, 'pubDate')
    if (!title || !link) continue

    const parsed = pubDate ? new Date(pubDate) : null
    const date = parsed && !Number.isNaN(parsed.getTime()) ? parsed.toISOString() : ''

    items.push({ title, link, date })
  }

  // Newest first
  return items.sort((a, b) => (b.date || '').localeCompare(a.date || ''))
}

// Cache the fetch+parse so all callers (and varying ?limit) share one upstream hit.
const fetchOpenTabs = defineCachedFunction(
  async (): Promise<OpenTab[]> => {
    const xml = await $fetch<string>(FEED_URL, {
      responseType: 'text',
      timeout: 8000,
    })
    return parseFeed(xml)
  },
  {
    maxAge: 1800, // 30 minutes
    name: 'opentabs',
    getKey: () => 'recommendations',
  }
)

export default defineEventHandler(async (event) => {
  const { limit } = getQuery(event)
  const n = Math.min(Math.max(parseInt(String(limit ?? ''), 10) || 12, 1), 50)

  try {
    const items = await fetchOpenTabs()
    return { items: items.slice(0, n) }
  } catch (error) {
    console.error('Error fetching OpenTabs feed:', error)
    return { items: [] as OpenTab[] }
  }
})
