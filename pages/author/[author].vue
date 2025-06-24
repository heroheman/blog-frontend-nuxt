<template>
  <!-- <main class="w-full lg:max-w-3xl"> -->
  <main class="main max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
    <article-index v-if="articles" :articles="articles" />
    <p class="text-base">
      <small> Zeige alle <nuxt-link to="/author"
        data-umami-event="author-click-show-all"
        :data-umami-event-from-author="$route.params.author"
        >Autoren</nuxt-link></small>
    </p>
  </main>
</template>

<script setup>
const route = useRoute()
const { public: { strapiUrl } } = useRuntimeConfig()

const articles = ref([])
const authorData = ref(null)

// Fetch author data
const { data: response } = await useFetch('/api/authors', {
  baseURL: strapiUrl,
  query: {
    'populate': '*',
    'filters[slug][$eq]': route.params.author
  }
})

if (response.value?.data?.[0]) {
  const author = response.value.data[0]
  authorData.value = author
  articles.value = author.articles ? author.articles.sort((a, b) => {
    return new Date(b.display_published_date).getTime() - new Date(a.display_published_date).getTime()
  }) : []
} else {
  articles.value = []
}

// Enhanced SEO Meta Data
const pageTitle = computed(() => {
  if (!authorData.value) {
    return `Autor: ${route.params.author} | flore.nz`
  }
  return `${authorData.value.name} - Alle Artikel | flore.nz`
})

const pageDescription = computed(() => {
  if (!authorData.value) {
    return `Alle Artikel von ${route.params.author} auf flore.nz. Entdecke Gedanken, Meinungen und Einblicke.`
  }
  const articleCount = articles.value.length
  return `Alle ${articleCount} Artikel von ${authorData.value.name} auf flore.nz. ${authorData.value.description || 'Entdecke Gedanken, Meinungen und Einblicke zu verschiedenen Themen.'}`
})

const canonicalUrl = computed(() => {
  return `https://flore.nz/author/${route.params.author}`
})

// Generate structured data for the author page
const structuredData = computed(() => {
  if (!authorData.value) return null

  return {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    mainEntity: {
      '@type': 'Person',
      name: authorData.value.name,
      description: authorData.value.description,
      url: canonicalUrl.value,
      sameAs: authorData.value.social_links || []
    },
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
          name: 'Autoren',
          item: 'https://flore.nz/author'
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: authorData.value.name,
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
    name: `Artikel von ${authorData.value?.name || route.params.author}`,
    numberOfItems: articles.value.length,
    itemListElement: articles.value.map((article, index) => ({
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
          name: authorData.value?.name || route.params.author
        }
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
  ogType: 'profile',
  ogUrl: canonicalUrl,
  ogImage: 'https://flore.nz/icon.png',
  ogSiteName: 'flore.nz',

  // Twitter
  twitterCard: 'summary',
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
