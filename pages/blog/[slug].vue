<template>
  <main class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
    <article-view v-if="objIsNotEmpty(article)" detail :post="article[0]" />
    <div v-else class="flex items-center justify-center min-h-[400px]">
      <loading />
    </div>
  </main>
</template>

<script setup>
import qs from 'qs'
import {
  formatDate,
  objIsNotEmpty,
  createExcerptFromText,
} from '~/utils/helper'

const route = useRoute()
const { public: { strapiUrl } } = useRuntimeConfig()

// Build correct query using official Strapi 5 syntax for deep population
const queryObject = {
  filters: {
    slug: {
      $eq: route.params.slug
    }
  },
  populate: {
    // Populate regular relations 2 levels deep
    // author: { populate: '*' },
    // bookseries: { populate: '*' },
    // genre_books: { populate: '*' },
    // cover: { populate: '*' },
    // category: { populate: '*' },
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
  }
}

const query = qs.stringify(queryObject, {
  encodeValuesOnly: true
})

const queryUrl = `/api/articles?${query}`

// console.log('Query URL:', queryUrl)
// console.log('Query object:', JSON.stringify(queryObject, null, 2))

const { data: response } = await useFetch(queryUrl, {
  baseURL: strapiUrl
})

// console.log('Response:', response.value?.data)

const article = computed(() => response.value?.data || [])

// Enhanced SEO Meta Data
const currentArticle = computed(() => article.value.length ? article.value[0] : null)

const pageTitle = computed(() => {
  if (!currentArticle.value) return 'Artikel wird geladen... | flore.nz'
  return `${currentArticle.value.title} | flore.nz`
})

const pageDescription = computed(() => {
  if (!currentArticle.value) return ''
  const description = currentArticle.value.description || currentArticle.value.excerpt
  const bodyExcerpt = createExcerptFromText(currentArticle.value.body || currentArticle.value.content, 30)
  return description ? `${description} - ${bodyExcerpt}` : bodyExcerpt
})

const canonicalUrl = computed(() => {
  if (!currentArticle.value) return ''
  return `https://flore.nz/blog/${currentArticle.value.slug}`
})

const articleImage = computed(() => {
  if (!currentArticle.value || !currentArticle.value.cover?.url) {
    return 'https://flore.nz/icon.png'
  }
  // Handle relative URLs from Strapi
  const imageUrl = currentArticle.value.cover.url
  return imageUrl.startsWith('http') ? imageUrl : `${strapiUrl}${imageUrl}`
})

const publishedDate = computed(() => {
  if (!currentArticle.value) return ''
  return currentArticle.value.display_published_date || currentArticle.value.published_at || currentArticle.value.createdAt
})

const modifiedDate = computed(() => {
  if (!currentArticle.value) return ''
  return currentArticle.value.updatedAt || publishedDate.value
})

const articleTags = computed(() => {
  if (!currentArticle.value || !currentArticle.value.tags) return []
  return currentArticle.value.tags.split(',').map(tag => tag.trim()).filter(Boolean)
})

// Generate structured data for the article
const structuredData = computed(() => {
  if (!currentArticle.value) return null

  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: currentArticle.value.title,
    description: pageDescription.value,
    url: canonicalUrl.value,
    datePublished: publishedDate.value,
    dateModified: modifiedDate.value,
    author: {
      '@type': 'Person',
      name: 'Florenz',
      url: 'https://flore.nz'
    },
    publisher: {
      '@type': 'Person',
      name: 'Florenz',
      url: 'https://flore.nz'
    },
    image: {
      '@type': 'ImageObject',
      url: articleImage.value,
      width: 1200,
      height: 630
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': canonicalUrl.value
    },
    keywords: articleTags.value.join(', '),
    wordCount: currentArticle.value.body ? currentArticle.value.body.length : 0,
    articleSection: currentArticle.value.category?.name || 'Blog',
    inLanguage: 'de-DE'
  }
})

// Breadcrumb structured data
const breadcrumbStructuredData = computed(() => {
  if (!currentArticle.value) return null

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
        name: 'Blog',
        item: 'https://flore.nz/blog'
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: currentArticle.value.title,
        item: canonicalUrl.value
      }
    ]
  }
})

// Set enhanced SEO meta tags
useSeoMeta({
  title: pageTitle,
  description: pageDescription,
  keywords: () => articleTags.value.join(', '),

  // Open Graph
  ogTitle: pageTitle,
  ogDescription: pageDescription,
  ogType: 'article',
  ogUrl: canonicalUrl,
  ogImage: articleImage,
  ogImageWidth: 1200,
  ogImageHeight: 630,
  ogSiteName: 'flore.nz',

  // Article specific OG tags
  articleAuthor: 'Florenz',
  articlePublishedTime: publishedDate,
  articleModifiedTime: modifiedDate,
  articleSection: () => currentArticle.value?.category?.name || 'Blog',
  articleTag: () => articleTags.value,

  // Twitter - entfernt da kein Twitter Account vorhanden

  // Additional meta
  robots: 'index, follow, max-image-preview:large',
  canonical: canonicalUrl,

  // Language and locale
  'og:locale': 'de_DE',
  'article:author': 'https://flore.nz'
})

// Set structured data and additional head elements
useHead(() => {
  const scripts = []

  if (structuredData.value) {
    scripts.push({
      type: 'application/ld+json',
      innerHTML: JSON.stringify(structuredData.value)
    })
  }

  if (breadcrumbStructuredData.value) {
    scripts.push({
      type: 'application/ld+json',
      innerHTML: JSON.stringify(breadcrumbStructuredData.value)
    })
  }

  return {
    script: scripts,
    link: [
      // Preload critical images
      ...(articleImage.value !== 'https://flore.nz/icon.png' ? [{
        rel: 'preload',
        as: 'image',
        href: articleImage.value
      }] : [])
    ]
  }
})
</script>
