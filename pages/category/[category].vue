<template>
  <main class="main max-w-4xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
  <div class="flex flex-wrap">
    <div class="w-full">
      <h2 class="article-title title">
        {{ title }}
      </h2>
      <p class="mb-8">{{ description }}</p>
    </div>
  </div>

  <div class="flex flex-wrap">
    <template v-if="$route.params.category === 'buecher'"
    class="w-full md:w-6/12"
    >
    <div class="w-full md:w-full">
      <collection-index
        compact
        show-single-collections
        :collection="genre.data || []"
        link-path="/genre/book"
        collection-title="Genre"
      />
    </div>
    <div class="w-full md:w-full">
      <collection-index
        compact
        show-single-collections
        :collection="authors.data || []"
        link-path="/author"
        collection-title="Autoren"
      />
    </div>
    <div class="w-full md:w-full">
      <collection-index
        compact
        :collection="series.data || []"
        link-path="/series"
        collection-title="Serien"
      />
    </div>
    </template>
  </div>

  <div class="flex flex-wrap">
    <div class="w-full md:w-full">
      <!-- Debug section - remove this after checking data -->
      <!-- <div v-if="articles && articles.length > 0" class="mb-4 p-4 bg-gray-100 rounded text-xs">
        <h4 class="font-bold mb-2">Debug: Props and Data</h4>
        <p><strong>showSeries prop:</strong> true (hardcoded in template)</p>
        <p><strong>First article bookseries:</strong> {{ JSON.stringify(articles[0].bookseries) }}</p>
      </div> -->

      <article-index
        show-ratings
        show-genre
        show-series
        v-if="articles"
        :articles="articles"
        :description="description"
        :show-description="showDescription"
      />
    </div>
  </div>
  </main>
</template>

<script setup>
import qs from 'qs'

const route = useRoute()
const { public: { strapiUrl } } = useRuntimeConfig()

// Reactive data
const articles = ref([])
const category = ref({})
const series = ref({ data: [] })
const genre = ref({ data: [] })
const authors = ref({ data: [] })

// Computed properties
const title = computed(() => category.value?.title || '')
const description = computed(() => category.value?.description || '')
const showDescription = computed(() => category.value?.showDescriptionInIndex || false)

// Fetch category data and build query for articles with deep population using qs
const [categoryQueryObject, articlesQueryObject] = [
  {
    filters: { slug: { $eq: route.params.category } },
    populate: '*'
  },
  {
    filters: {
      category: {
        slug: { $eq: route.params.category }
      }
    },
    populate: {
      // Populate regular relations only 1 level deep (just populate: true)
      author: true,
      bookseries: true,
      genre_books: true,
      cover: true,
      category: true,
      // Populate dynamic zone with nested components 2 levels deep
      additional: {
        on: {
          'external-api.book-container': {
            populate: {
              bookmeta: { populate: '*' }
            }
          },
          'content.rating': { populate: '*' },
          'content.advertisement': { populate: '*' }
        }
      }
    },
    sort: 'display_published_date:desc',
    pagination: {
      pageSize: 100
    }
  }
]

const categoryQuery = qs.stringify(categoryQueryObject, { encodeValuesOnly: true })
const articlesQuery = qs.stringify(articlesQueryObject, { encodeValuesOnly: true })

const categoryQueryUrl = `/api/categories?${categoryQuery}`
const articlesQueryUrl = `/api/articles?${articlesQuery}`

// console.log('Category Query URL:', categoryQueryUrl)
// console.log('Articles Query URL:', articlesQueryUrl)

// Fetch category and articles data
const [{ data: categoryResponse }, { data: articlesResponse }] = await Promise.all([
  useFetch(categoryQueryUrl, { baseURL: strapiUrl }),
  useFetch(articlesQueryUrl, { baseURL: strapiUrl })
])

if (categoryResponse.value?.data?.[0]) {
  category.value = categoryResponse.value.data[0]
}

if (articlesResponse.value?.data) {
  articles.value = articlesResponse.value.data
  // Only log if we have articles and need to debug
  if (articles.value.length > 0) {
    // console.log('First article bookseries data:', articles.value[0]?.bookseries)
  }
}

// Fetch related collections for book category
if (route.params.category === 'buecher') {
  try {
    const [seriesData, genreData, authorData] = await Promise.all([
      $fetch('/api/bookseries?populate=*', { baseURL: strapiUrl }),
      $fetch('/api/genre-books?populate=*', { baseURL: strapiUrl }),
      $fetch('/api/authors?populate=*', { baseURL: strapiUrl })
    ])

    series.value = seriesData || { data: [] }
    genre.value = genreData || { data: [] }
    authors.value = authorData || { data: [] }
  } catch (error) {
    console.error('Error fetching book collections:', error)
  }
}

// Enhanced SEO Meta Data
const pageTitle = computed(() => {
  if (!category.value?.title) {
    return `Kategorie: ${route.params.category} | flore.nz`
  }
  return `${category.value.title} | flore.nz`
})

const pageDescription = computed(() => {
  if (!category.value?.description) {
    return `Alle Artikel in der Kategorie "${route.params.category}" auf flore.nz. Entdecke Gedanken, Meinungen und Einblicke.`
  }
  const articleCount = articles.value.length
  return `${category.value.description} Entdecke ${articleCount} Artikel in der Kategorie "${category.value.title}" auf flore.nz.`
})

const canonicalUrl = computed(() => {
  return `https://flore.nz/category/${route.params.category}`
})

// Generate structured data for the category page
const structuredData = computed(() => {
  if (!category.value?.title) return null

  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: category.value.title,
    description: category.value.description,
    url: canonicalUrl.value,
    breadcrumb: {
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
          name: 'Kategorien',
          item: 'https://flore.nz/category'
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: category.value.title,
          item: canonicalUrl.value
        }
      ]
    }
  }
})

// Articles structured data
const articlesStructuredData = computed(() => {
  if (!articles.value.length) return null

  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: `${category.value?.title || route.params.category} Artikel`,
    description: `Alle Artikel in der Kategorie ${category.value?.title || route.params.category}`,
    numberOfItems: articles.value.length,
    itemListElement: articles.value.slice(0, 20).map((article, index) => ({
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
          name: article.author?.name || 'Florenz'
        },
        articleSection: category.value?.title
      }
    }))
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
  ogSiteName: 'flore.nz',

  // Twitter
  twitterCard: 'summary_large_image',
  twitterTitle: pageTitle,
  twitterDescription: pageDescription,
  twitterImage: 'https://flore.nz/icon.png',

  // Additional meta
  robots: 'index, follow',
  canonical: canonicalUrl,

  // Language and locale
  'og:locale': 'de_DE'
})

// Set structured data
useHead(() => {
  const scripts = []

  if (structuredData.value) {
    scripts.push({
      type: 'application/ld+json',
      innerHTML: JSON.stringify(structuredData.value)
    })
  }

  if (articlesStructuredData.value) {
    scripts.push({
      type: 'application/ld+json',
      innerHTML: JSON.stringify(articlesStructuredData.value)
    })
  }

  return {
    script: scripts
  }
})
</script>

<style lang="postcss">
.articleview-main {
  @apply my-20;
}
</style>
