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
      <template v-if="$route.params.category === 'buecher'">
        <div class="w-full">
          <ClientOnly>
            <TabWrapper>
              <collection-index
                compact
                as-tab
                show-single-collections
                :collection="genre.data || []"
                link-path="/genre/book"
                collection-title="Genre"
              />
              <collection-index
                compact
                as-tab
                show-single-collections
                :collection="authors.data || []"
                link-path="/author"
                collection-title="Autoren"
              />
              <collection-index
                compact
                as-tab
                :collection="series.data || []"
                link-path="/series"
                collection-title="Serien"
              />
            </TabWrapper>
            <!-- Fallback for SSR -->
            <template #fallback>
              <div class="w-full h-32 bg-gray-100 rounded animate-pulse"></div>
            </template>
          </ClientOnly>
        </div>
      </template>
    </div>

    <div class="flex flex-wrap">
      <div class="w-full md:w-full">
        <!-- Rating Filter - nur für Bücher-Kategorie -->
        <template v-if="$route.params.category === 'buecher'">
          <ClientOnly>
            <div class="tab-wrapper rounded-lg bg-gray-50 mb-4">
              <div class="border-b border-gray-200">
                <nav class="-mb-px flex space-x-6 px-4 sm:px-6" aria-label="Rating Filter">
                  <div class="whitespace-nowrap py-3 px-1 font-medium text-sm text-gray-900">
                    Filter nach Bewertung
                  </div>
                </nav>
              </div>
              <div class="p-4 sm:p-6">
                <div class="flex flex-wrap gap-2 sm:gap-3">
                  <button
                    @click="selectedRating = null"
                    :class="[
                      'inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-meta rounded-full transition-colors duration-200',
                      selectedRating === null
                        ? 'bg-gray-200 text-gray-900 border border-gray-300'
                        : 'bg-white hover:bg-gray-100 border border-gray-200 text-gray-700 hover:text-gray-900'
                    ]"
                  >
                    Alle
                  </button>

                  <button
                    v-for="rating in [5, 4, 3, 2, 1]"
                    :key="rating"
                    @click="selectedRating = rating"
                    :class="[
                      'inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-meta rounded-full transition-colors duration-200',
                      selectedRating === rating
                        ? 'bg-gray-200 text-gray-900'
                        : 'bg-white hover:bg-gray-100 text-gray-700 hover:text-gray-900'
                    ]"
                  >
                    <div class="inline-flex items-center space-x-0.5">
                      <svg
                        v-for="i in rating"
                        :key="i"
                        class="h-3 w-3 text-gray-900"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    </div>
                    <span v-if="ratingCounts[rating] > 0" class="inline-flex items-center justify-center w-5 h-5 bg-white text-gray-600 text-xs font-medium rounded-full">
                      {{ ratingCounts[rating] }}
                    </span>
                  </button>
                </div>

                <p v-if="selectedRating !== null" class="mt-4 text-sm text-gray-600">
                  Zeige {{ filteredArticlesByRating.length }} von {{ articles.length }} Büchern mit {{ selectedRating }} Sternen
                </p>
              </div>
            </div>

            <!-- Gefilterte Liste -->
            <article-index
              v-if="selectedRating !== null"
              show-ratings
              show-genre
              show-series
              :articles="filteredArticlesByRating"
              :description="description"
              :show-description="showDescription"
            />

            <!-- Fallback für SSR -->
            <template #fallback>
              <div class="tab-wrapper rounded-lg bg-gray-50 mb-4">
                <div class="border-b border-gray-200">
                  <div class="px-4 sm:px-6 py-3">
                    <div class="h-5 bg-gray-200 rounded animate-pulse w-32"></div>
                  </div>
                </div>
                <div class="p-4 sm:p-6">
                  <div class="h-8 bg-gray-200 rounded animate-pulse"></div>
                </div>
              </div>
            </template>
          </ClientOnly>
        </template>

        <!-- Original Liste für SEO (wird ausgeblendet wenn Filter aktiv) -->
        <article-index
          v-if="$route.params.category !== 'buecher' || selectedRating === null"
          show-ratings
          show-genre
          show-series
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

// Rating filter state (clientside only)
const selectedRating = ref(null)

// Computed properties
const title = computed(() => category.value?.title || '')
const description = computed(() => category.value?.description || '')
const showDescription = computed(() => category.value?.showDescriptionInIndex || false)

// Filter function for ratings (rounds DOWN for filtering)
const getRatingFromArticle = (article) => {
  if (!article.additional || !Array.isArray(article.additional)) {
    return null
  }
  const ratingComponent = article.additional.find(
    component => component.__component === 'content.rating'
  )
  if (ratingComponent && ratingComponent.ratingnumber) {
    // Runde nach unten für Filter: 4.5 wird zu 4
    return Math.floor(parseFloat(ratingComponent.ratingnumber))
  }
  return null
}

// Computed filtered articles by rating
const filteredArticlesByRating = computed(() => {
  if (selectedRating.value === null) {
    return articles.value
  }

  return articles.value.filter(article => {
    const rating = getRatingFromArticle(article)
    return rating === selectedRating.value
  })
})

// Count articles per rating for button counters
const ratingCounts = computed(() => {
  const counts = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 }
  
  articles.value.forEach(article => {
    const rating = getRatingFromArticle(article)
    if (rating && rating >= 1 && rating <= 5) {
      counts[rating]++
    }
  })
  
  return counts
})

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
