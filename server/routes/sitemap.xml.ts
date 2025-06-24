export default defineEventHandler(async (event) => {
  const BLOG_EP = process.env.STRAPI_URL || 'https://flrnz.strapi.florenz.dev'

  // Set content type to XML
  setHeader(event, 'content-type', 'application/xml')

  // Helper function to safely fetch data
  async function safeFetch(url: string): Promise<any[]> {
    try {
      const response = await $fetch(url)
      return response?.data ? response.data : []
    } catch (error) {
      console.error(`Error fetching ${url}:`, error)
      return []
    }
  }

  // Helper function to get the most recent date
  function getLastModDate(item: any): string {
    const updatedAt = item.updatedAt ? new Date(item.updatedAt) : null
    const createdAt = item.createdAt ? new Date(item.createdAt) : null

    // Use updatedAt if available and more recent than createdAt, otherwise use createdAt
    const lastMod = updatedAt && createdAt && updatedAt > createdAt ? updatedAt : createdAt

    return lastMod ? lastMod.toISOString() : new Date().toISOString()
  }

  // Fetch all data - articles sorted by published date, others by updatedAt
  const [articles, pages, categories, bookSeries, genreBooks, bookAuthors] = await Promise.all([
    safeFetch(`${BLOG_EP}/api/articles?populate=*&sort=display_published_date:desc`),
    safeFetch(`${BLOG_EP}/api/pages?sort=updatedAt:desc`),
    safeFetch(`${BLOG_EP}/api/categories?sort=updatedAt:desc`),
    safeFetch(`${BLOG_EP}/api/bookseries?sort=updatedAt:desc`),
    safeFetch(`${BLOG_EP}/api/genre-books?sort=updatedAt:desc`),
    safeFetch(`${BLOG_EP}/api/authors?sort=updatedAt:desc`)
  ])

  // Define URL entries with metadata
  interface SitemapEntry {
    loc: string
    lastmod: string
    changefreq: string
    priority: string
  }

  const urlEntries: SitemapEntry[] = []

  // Homepage - use the most recent article's date or current date
  const latestArticle = articles.length > 0 ? articles.reduce((latest, current) => {
    const latestDate = new Date(latest.updatedAt || latest.createdAt)
    const currentDate = new Date(current.updatedAt || current.createdAt)
    return currentDate > latestDate ? current : latest
  }) : null

  urlEntries.push({
    loc: 'https://flore.nz/',
    lastmod: latestArticle ? getLastModDate(latestArticle) : new Date().toISOString(),
    changefreq: 'daily',
    priority: '1.0'
  })

  // Articles (blog posts) - highest priority for content
  articles.forEach((article: any) => {
    urlEntries.push({
      loc: `https://flore.nz/blog/${article.slug}`,
      lastmod: getLastModDate(article),
      changefreq: 'weekly',
      priority: '0.9'
    })
  })

  // Static pages
  pages.forEach((page: any) => {
    urlEntries.push({
      loc: `https://flore.nz/${page.slug}`,
      lastmod: getLastModDate(page),
      changefreq: 'monthly',
      priority: '0.8'
    })
  })

  // Categories - updated when articles are added
  categories.forEach((category: any) => {
    urlEntries.push({
      loc: `https://flore.nz/category/${category.slug}`,
      lastmod: getLastModDate(category),
      changefreq: 'weekly',
      priority: '0.7'
    })
  })

  // Book series
  bookSeries.forEach((series: any) => {
    urlEntries.push({
      loc: `https://flore.nz/series/${series.slug}`,
      lastmod: getLastModDate(series),
      changefreq: 'monthly',
      priority: '0.6'
    })
  })

  // Genre books
  genreBooks.forEach((genre: any) => {
    urlEntries.push({
      loc: `https://flore.nz/genre/book/${genre.slug}`,
      lastmod: getLastModDate(genre),
      changefreq: 'monthly',
      priority: '0.6'
    })
  })

  // Authors
  bookAuthors.forEach((author: any) => {
    urlEntries.push({
      loc: `https://flore.nz/author/${author.slug}`,
      lastmod: getLastModDate(author),
      changefreq: 'monthly',
      priority: '0.6'
    })
  })

  // Generate sitemap XML
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlEntries.map(entry => `  <url>
    <loc>${entry.loc}</loc>
    <lastmod>${entry.lastmod}</lastmod>
    <changefreq>${entry.changefreq}</changefreq>
    <priority>${entry.priority}</priority>
  </url>`).join('\n')}
</urlset>`

  return sitemap
})
