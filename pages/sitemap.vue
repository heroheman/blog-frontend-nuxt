<template>
  <main class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
    <div class="space-y-8">
      <div>
        <h1 class="text-3xl font-bold text-gray-900 mb-4">Sitemap</h1>
        <p class="text-lg text-gray-600 mb-8">
          Übersicht aller Seiten und Inhalte auf flore.nz
        </p>
      </div>

      <div class="grid gap-8 md:grid-cols-2">
        <!-- Main Pages -->
        <div class="space-y-4">
          <h2 class="text-xl font-semibold text-gray-900">Hauptseiten</h2>
          <ul class="space-y-2">
            <li>
              <nuxt-link to="/" class="text-blue-600 hover:text-blue-800 hover:underline">
                Startseite
              </nuxt-link>
            </li>
            <li>
              <nuxt-link to="/blog" class="text-blue-600 hover:text-blue-800 hover:underline">
                Blog
              </nuxt-link>
            </li>
          </ul>
        </div>

        <!-- Categories -->
        <div v-if="categories.length" class="space-y-4">
          <h2 class="text-xl font-semibold text-gray-900">Kategorien</h2>
          <ul class="space-y-2">
            <li v-for="category in categories" :key="category.id">
              <nuxt-link
                :to="`/category/${category.slug}`"
                class="text-blue-600 hover:text-blue-800 hover:underline"
              >
                {{ category.title }}
              </nuxt-link>
              <span v-if="category.description" class="text-gray-500 text-sm ml-2">
                - {{ category.description.substring(0, 60) }}{{ category.description.length > 60 ? '...' : '' }}
              </span>
            </li>
          </ul>
        </div>

        <!-- Authors -->
        <div v-if="authors.length" class="space-y-4">
          <h2 class="text-xl font-semibold text-gray-900">Autoren</h2>
          <ul class="space-y-2">
            <li v-for="author in authors" :key="author.id">
              <nuxt-link
                :to="`/author/${author.slug}`"
                class="text-blue-600 hover:text-blue-800 hover:underline"
              >
                {{ author.name }}
              </nuxt-link>
            </li>
          </ul>
        </div>

        <!-- Book Series -->
        <div v-if="series.length" class="space-y-4">
          <h2 class="text-xl font-semibold text-gray-900">Buchserien</h2>
          <ul class="space-y-2">
            <li v-for="serie in series" :key="serie.id">
              <nuxt-link
                :to="`/series/${serie.slug}`"
                class="text-blue-600 hover:text-blue-800 hover:underline"
              >
                {{ serie.title }}
              </nuxt-link>
            </li>
          </ul>
        </div>
      </div>

      <!-- Recent Articles -->
      <div v-if="recentArticles.length" class="space-y-4">
        <h2 class="text-xl font-semibold text-gray-900">Neueste Artikel</h2>
        <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div v-for="article in recentArticles" :key="article.id" class="space-y-2">
            <nuxt-link
              :to="`/blog/${article.slug}`"
              class="text-blue-600 hover:text-blue-800 hover:underline font-medium"
            >
              {{ article.title }}
            </nuxt-link>
            <p v-if="article.excerpt || article.description" class="text-gray-600 text-sm">
              {{ (article.excerpt || article.description).substring(0, 100) }}{{ (article.excerpt || article.description).length > 100 ? '...' : '' }}
            </p>
            <p class="text-gray-500 text-xs">
              {{ formatDate(article.display_published_date || article.published_at) }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
import { formatDate } from '~/utils/helper'

const { public: { strapiUrl } } = useRuntimeConfig()

// Fetch data for sitemap
const [categoriesData, authorsData, seriesData, articlesData] = await Promise.all([
  $fetch('/api/categories?sort=title:asc', { baseURL: strapiUrl }).catch(() => ({ data: [] })),
  $fetch('/api/authors?sort=name:asc', { baseURL: strapiUrl }).catch(() => ({ data: [] })),
  $fetch('/api/bookseries?sort=title:asc', { baseURL: strapiUrl }).catch(() => ({ data: [] })),
  $fetch('/api/articles?populate=*&sort=display_published_date:desc&pagination[limit]=12', { baseURL: strapiUrl }).catch(() => ({ data: [] }))
])

const categories = computed(() => categoriesData?.data || [])
const authors = computed(() => authorsData?.data || [])
const series = computed(() => seriesData?.data || [])
const recentArticles = computed(() => articlesData?.data || [])

// Enhanced SEO for sitemap page
const { generateSeoMeta, generateWebsiteStructuredData } = useSeo()

const seoMeta = generateSeoMeta({
  title: 'Sitemap - Alle Seiten und Inhalte',
  description: 'Vollständige Übersicht aller Seiten, Kategorien, Autoren und Artikel auf flore.nz. Finde schnell die Inhalte, die dich interessieren.',
  url: 'https://flore.nz/sitemap',
  canonical: 'https://flore.nz/sitemap'
})

useSeoMeta(seoMeta)

// Structured data for sitemap page
const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'Sitemap',
  description: 'Vollständige Übersicht aller Seiten und Inhalte auf flore.nz',
  url: 'https://flore.nz/sitemap',
  mainEntity: {
    '@type': 'ItemList',
    name: 'Site Navigation',
    numberOfItems: categories.value.length + authors.value.length + series.value.length + recentArticles.value.length + 2,
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        url: 'https://flore.nz'
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Blog',
        url: 'https://flore.nz/blog'
      }
    ]
  }
}

useHead({
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify(structuredData)
    }
  ]
})
</script>
