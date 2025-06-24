<template>
  <main class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
    <div class="space-y-12 sm:space-y-16">
      <article
        v-for="(post, index) in articles"
        :key="index"
        class="group"
      >
        <article-view v-if="post.category !== 'Heavy Rotation'" :post="post" />
      </article>

      <pagination
        class="mt-16 sm:mt-20"
        :articles-count="articlesCount"
        :per-page="per_page"
        :current-page="page"
      />
    </div>
  </main>
</template>

<script setup>
const route = useRoute()
const { public: { strapiUrl } } = useRuntimeConfig()

// Reactive state
const page = ref(route.params.page ? parseInt(route.params.page) - 1 : 0)
const per_page = 10

// Watch for route changes
watch(() => route.params.page, (newPage) => {
  if (newPage) {
    page.value = parseInt(newPage) - 1
  }
})

// Compute pagination start
const start = computed(() => page.value * per_page)

// Fetch articles data
const { data: response, pending } = await useFetch('/api/articles', {
  baseURL: strapiUrl,
  query: {
    populate: '*',
    sort: 'display_published_date:DESC',
    'pagination[start]': start,
    'pagination[limit]': per_page
  }
})

const articles = computed(() => response.value?.data || [])
const articlesCount = computed(() => response.value?.meta?.pagination?.total || 0)

// Enhanced SEO Meta Data
const pageTitle = computed(() => {
  if (page.value > 0) {
    return `Seite ${page.value + 1} - flore.nz | Persönlicher Blog und Gedanken`
  }
  return 'flore.nz | Persönlicher Blog mit Gedanken, Meinungen und Einblicken'
})

const pageDescription = computed(() => {
  if (page.value > 0) {
    return `Seite ${page.value + 1} meines persönlichen Blogs. Entdecke Gedanken, Meinungen und Einblicke zu verschiedenen Themen des Lebens, der Technologie und mehr.`
  }
  return 'Willkommen auf flore.nz - Mein persönlicher Blog mit Gedanken, Meinungen und Einblicken zu verschiedenen Themen des Lebens, der Technologie, Büchern und mehr.'
})

const canonicalUrl = computed(() => {
  const baseUrl = 'https://flore.nz'
  if (page.value > 0) {
    return `${baseUrl}?page=${page.value + 1}`
  }
  return baseUrl
})

// Generate structured data for the homepage
const structuredData = computed(() => {
  const baseStructure = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'flore.nz',
    description: pageDescription.value,
    url: 'https://flore.nz',
    author: {
      '@type': 'Person',
      name: 'Florenz',
      url: 'https://flore.nz',
      sameAs: [
        'https://norden.social/@florenz',
        'https://github.com/florenz',
        'https://www.goodreads.com/florenz'
      ]
    },
    publisher: {
      '@type': 'Person',
      name: 'Florenz',
      url: 'https://flore.nz'
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://flore.nz/blog?tag={search_term_string}',
      'query-input': 'required name=search_term_string'
    }
  }

  // Add featured articles to structured data
  if (articles.value && articles.value.length > 0) {
    baseStructure.mainEntity = {
      '@type': 'ItemList',
      itemListElement: articles.value.slice(0, 5).map((article, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        item: {
          '@type': 'BlogPosting',
          headline: article.title,
          description: article.excerpt || article.description,
          url: `https://flore.nz/blog/${article.slug}`,
          datePublished: article.display_published_date || article.published_at,
          author: {
            '@type': 'Person',
            name: 'Florenz'
          }
        }
      }))
    }
  }

  return baseStructure
})

// Breadcrumb structured data for paginated pages
const breadcrumbStructuredData = computed(() => {
  if (page.value === 0) return null

  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://flore.nz'
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: `Seite ${page.value + 1}`,
        item: canonicalUrl.value
      }
    ]
  }
})

// Set enhanced SEO meta tags
useSeoMeta({
  title: pageTitle,
  description: pageDescription,

  // Open Graph
  ogTitle: pageTitle,
  ogDescription: pageDescription,
  ogType: 'website',
  ogUrl: canonicalUrl,
  ogImage: 'https://flore.nz/icon.png',
  ogImageWidth: 512,
  ogImageHeight: 512,
  ogSiteName: 'flore.nz',

  // Twitter - entfernt da kein Twitter Account vorhanden

  // Additional meta
  robots: page.value > 0 ? 'noindex, follow' : 'index, follow',
  canonical: canonicalUrl,

  // Language and locale
  'og:locale': 'de_DE'
})

// Set structured data and pagination links
useHead(() => {
  const scripts = [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify(structuredData.value)
    }
  ]

  if (breadcrumbStructuredData.value) {
    scripts.push({
      type: 'application/ld+json',
      innerHTML: JSON.stringify(breadcrumbStructuredData.value)
    })
  }

  const links = []

  // Add pagination links
  if (page.value > 0) {
    links.push({
      rel: 'prev',
      href: page.value === 1 ? 'https://flore.nz' : `https://flore.nz?page=${page.value}`
    })
  }

  if (articlesCount.value > (page.value + 1) * per_page) {
    links.push({
      rel: 'next',
      href: `https://flore.nz?page=${page.value + 2}`
    })
  }

  return {
    script: scripts,
    link: links
  }
})
</script>


