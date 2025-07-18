<template>
  <!-- <main class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12"> -->
  <main v-if="articles" class="main max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
    <div v-if="hasTag" class="mb-8 text-left">
      <nuxt-link class="items-start mb-8" to="/blog"
        data-umami-event="blog-click-back-to-all"
        :data-umami-event-from-tag="$route.query.tag"
        >&larr; Zurück zu allen Beiträgen</nuxt-link
      >
      &mdash; Alle <strong>{{ $route.query.tag }}</strong> Artikel
    </div>
    <article-index v-if="items" :articles="items" />
  </main>
</template>

<script setup>
import { formatDate } from '~/utils/helper'

const route = useRoute()
const { public: { strapiUrl } } = useRuntimeConfig()

// Reactive state
const hasTag = ref(false)

// Watch for route query changes
watch(() => route.query.tag, (newTag) => {
  hasTag.value = !!newTag
}, { immediate: true })

// Fetch articles data
const { data: response } = await useFetch('/api/articles', {
  baseURL: strapiUrl,
  query: {
    populate: '*',
    sort: 'display_published_date:DESC',
    'pagination[pageSize]': 200
  }
})

const articles = computed(() => response.value?.data || [])

// Computed items with filtering
const items = computed(() => {
  if (hasTag.value && route.query.tag) {
    return articles.value.filter((post) => {
      if (!post.tags) return false
      const tags = post.tags.split(',').map(tag => tag.trim())
      return tags.includes(route.query.tag)
    })
  }
  return articles.value
})

// SEO Meta Data
const currentTag = computed(() => route.query.tag)
const pageTitle = computed(() => {
  if (currentTag.value) {
    return `${currentTag.value} Artikel - Blog | flore.nz`
  }
  return 'Blog - Gedanken, Meinungen und Einblicke | flore.nz'
})

const pageDescription = computed(() => {
  if (currentTag.value) {
    return `Entdecke alle Artikel zum Thema "${currentTag.value}" auf flore.nz. Persönliche Einblicke, Gedanken und Meinungen zu verschiedenen Themen.`
  }
  return 'Entdecke meinen persönlichen Blog mit Gedanken, Meinungen und Einblicken zu verschiedenen Themen des Lebens, der Technologie und mehr.'
})

const canonicalUrl = computed(() => {
  const baseUrl = 'https://flore.nz'
  if (currentTag.value) {
    return `${baseUrl}/blog?tag=${encodeURIComponent(currentTag.value)}`
  }
  return `${baseUrl}/blog`
})

// Generate structured data for the blog listing
const structuredData = computed(() => {
  const baseStructure = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: 'flore.nz Blog',
    description: pageDescription.value,
    url: canonicalUrl.value,
    author: {
      '@type': 'Person',
      name: 'Florenz',
      url: 'https://flore.nz'
    },
    publisher: {
      '@type': 'Person',
      name: 'Florenz',
      url: 'https://flore.nz'
    }
  }

  if (items.value && items.value.length > 0) {
    baseStructure.blogPost = items.value.slice(0, 10).map(article => ({
      '@type': 'BlogPosting',
      headline: article.title,
      description: article.excerpt || article.content?.substring(0, 160) + '...',
      url: `https://flore.nz/blog/${article.slug}`,
      datePublished: article.display_published_date || article.published_at,
      author: {
        '@type': 'Person',
        name: 'Florenz'
      }
    }))
  }

  return baseStructure
})

// Set SEO meta tags
useSeoMeta({
  title: pageTitle,
  description: pageDescription,
  ogTitle: pageTitle,
  ogDescription: pageDescription,
  ogType: 'website',
  ogUrl: canonicalUrl,
  ogImage: 'https://flore.nz/icon.png',
  ogSiteName: 'flore.nz',

  // Twitter - entfernt da kein Twitter Account vorhanden

  robots: 'index, follow',
  canonical: canonicalUrl
})

// Set structured data
useHead({
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify(structuredData.value)
    }
  ]
})
</script>

<style lang="postcss" scoped>
.listdate {
  font-weight: 400;
  min-width: 100px;
}
</style>
