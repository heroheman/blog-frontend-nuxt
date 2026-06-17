<template>
  <main class="w-full py-8 sm:py-10">
    <!-- Desktop: 3 columns, golden ratio (φ² : φ : 1) -->
    <div class="hidden lg:grid lg:grid-cols-[2.618fr_1.618fr_1fr] gap-8">
      <!-- Column 1 — Artikel -->
      <section>
        <h2 class="font-meta text-xs uppercase tracking-[0.2em] text-monochrome-100 mb-8">Artikel —</h2>
        <div class="space-y-12 sm:space-y-16">
          <article-view
            v-for="(post, index) in blogArticles"
            :key="post.id"
            :post="post"
            :featured="index === 0 && page === 0"
          />
        </div>
        <pagination
          v-if="blogCount > per_page"
          class="mt-16"
          :articles-count="blogCount"
          :per-page="per_page"
          :current-page="page"
        />
      </section>

      <!-- Column 2 — Gelesen (Bücher) -->
      <section class="border-l border-monochrome-600 pl-8">
        <h2 class="font-meta text-xs uppercase tracking-[0.2em] text-monochrome-100 mb-4">Gelesen —</h2>
        <book-card v-for="book in books" :key="book.id" :book="book" />
        <nuxt-link
          to="/category/buecher"
          data-umami-event="index-click-all-books"
          class="inline-flex items-center mt-6 font-meta text-sm font-medium text-accent hover:text-accent-600 transition-colors"
        >
          Alle Bücher
          <svg class="ml-1 w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>
        </nuxt-link>
      </section>

      <!-- Column 3 — Verlinkt (OpenTabs) -->
      <section class="border-l border-monochrome-600 pl-8">
        <h2 class="font-meta text-xs uppercase tracking-[0.2em] text-monochrome-100 mb-4">Verlinkt —</h2>
        <link-post-list :items="links" />
        <a
          href="https://opentabs.flore.nz/"
          target="_blank"
          rel="noopener noreferrer"
          data-umami-event="index-click-opentabs-more"
          class="inline-flex items-center mt-6 font-meta text-sm font-medium text-accent hover:text-accent-600 transition-colors"
        >
          Mehr
          <svg class="ml-1 w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>
        </a>
      </section>
    </div>

    <!-- Mobile / Tablet: one merged chronological stream -->
    <div class="lg:hidden">
      <div class="space-y-12 sm:space-y-14">
        <template v-for="(entry, index) in mobileStream" :key="index">
          <article-view v-if="entry.type === 'article'" :post="entry.data" />
          <book-card v-else-if="entry.type === 'book'" :book="entry.data" />
          <link-post-list v-else :items="[entry.data]" />
        </template>
      </div>
      <pagination
        v-if="blogCount > per_page"
        class="mt-16"
        :articles-count="blogCount"
        :per-page="per_page"
        :current-page="page"
      />
    </div>
  </main>
</template>

<script setup>
import qs from 'qs'

const route = useRoute()
const { public: { strapiUrl } } = useRuntimeConfig()

// Pagination state (column 1 / mobile stream)
const page = ref(route.params.page ? parseInt(route.params.page) - 1 : 0)
const per_page = 5

watch(() => route.params.page, (newPage) => {
  page.value = newPage ? parseInt(newPage) - 1 : 0
})

const start = computed(() => page.value * per_page)

const INDEX_POPULATE = {
  author: true,
  bookseries: true,
  genre_books: true,
  cover: true,
  category: true,
  localizations: { fields: ['slug', 'locale'] },
  additional: {
    on: {
      'external-api.book-container': {
        populate: { bookmeta: { populate: ['cover'] } }
      },
      'content.rating': { populate: '*' },
    }
  },
}

// --- Query A: Blog posts (everything except the "Bücher" category) ---
const blogQuery = computed(() =>
  `/api/articles?${qs.stringify({
    populate: INDEX_POPULATE,
    filters: {
      $or: [
        { category: { slug: { $ne: 'buecher' } } },
        { category: { id: { $null: true } } },
      ],
    },
    sort: 'display_published_date:DESC',
    'pagination[start]': start.value,
    'pagination[limit]': per_page,
  }, { encodeValuesOnly: true })}`
)

const { data: blogResponse } = await useFetch(blogQuery, { baseURL: strapiUrl })

// --- Query B: Books (category "Bücher") ---
const booksQuery = `/api/articles?${qs.stringify({
  populate: {
    cover: true,
    bookseries: true,
    genre_books: true,
    additional: { on: { 'content.rating': { populate: '*' } } },
  },
  filters: { category: { slug: { $eq: 'buecher' } } },
  sort: 'display_published_date:DESC',
  'pagination[limit]': 12,
}, { encodeValuesOnly: true })}`

const { data: booksResponse } = await useFetch(booksQuery, { baseURL: strapiUrl, key: 'index-books' })

// --- Query C: OpenTabs link posts (internal server route, cached) ---
const { data: linksResponse } = await useFetch('/api/opentabs', {
  query: { limit: 12 },
  key: 'index-opentabs',
})

const blogArticles = computed(() => blogResponse.value?.data || [])
const blogCount = computed(() => blogResponse.value?.meta?.pagination?.total || 0)
const books = computed(() => booksResponse.value?.data || [])
const links = computed(() => linksResponse.value?.items || [])

// Merged, date-sorted stream for mobile. Books + links join on the first page;
// subsequent pages continue the paginated article stream.
const mobileStream = computed(() => {
  const entries = blogArticles.value.map((post) => ({
    type: 'article',
    date: post.display_published_date,
    data: post,
  }))

  if (page.value === 0) {
    books.value.forEach((book) => {
      entries.push({ type: 'book', date: book.display_published_date, data: book })
    })
    links.value.forEach((link) => {
      entries.push({ type: 'link', date: link.date, data: link })
    })
  }

  return entries.sort((a, b) => {
    const da = a.date ? new Date(a.date).getTime() : 0
    const db = b.date ? new Date(b.date).getTime() : 0
    return db - da
  })
})

// --- SEO ---
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
  const baseUrl = 'https://blog.flore.nz'
  if (page.value > 0) {
    return `${baseUrl}?page=${page.value + 1}`
  }
  return baseUrl
})

const structuredData = computed(() => {
  const baseStructure = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'flore.nz',
    description: pageDescription.value,
    url: 'https://blog.flore.nz',
    author: {
      '@type': 'Person',
      name: 'Florenz',
      url: 'https://blog.flore.nz',
      sameAs: [
        'https://norden.social/@florenz',
        'https://github.com/florenz',
        'https://www.goodreads.com/florenz'
      ]
    },
    publisher: {
      '@type': 'Person',
      name: 'Florenz',
      url: 'https://blog.flore.nz'
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://blog.flore.nz/blog?tag={search_term_string}',
      'query-input': 'required name=search_term_string'
    }
  }

  if (blogArticles.value && blogArticles.value.length > 0) {
    baseStructure.mainEntity = {
      '@type': 'ItemList',
      itemListElement: blogArticles.value.slice(0, 5).map((article, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        item: {
          '@type': 'BlogPosting',
          headline: article.title,
          description: article.excerpt || article.description,
          url: `https://blog.flore.nz/blog/${article.slug}`,
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
        item: 'https://blog.flore.nz'
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

useSeoMeta({
  title: pageTitle,
  description: pageDescription,
  ogTitle: pageTitle,
  ogDescription: pageDescription,
  ogType: 'website',
  ogUrl: canonicalUrl,
  ogImage: 'https://blog.flore.nz/icon.png',
  ogImageWidth: 512,
  ogImageHeight: 512,
  ogSiteName: 'flore.nz',
  robots: page.value > 0 ? 'noindex, follow' : 'index, follow',
  canonical: canonicalUrl,
  'og:locale': 'de_DE'
})

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

  if (page.value > 0) {
    links.push({
      rel: 'prev',
      href: page.value === 1 ? 'https://blog.flore.nz' : `https://blog.flore.nz?page=${page.value}`
    })
  }

  if (blogCount.value > (page.value + 1) * per_page) {
    links.push({
      rel: 'next',
      href: `https://blog.flore.nz?page=${page.value + 2}`
    })
  }

  return {
    script: scripts,
    link: links
  }
})
</script>
