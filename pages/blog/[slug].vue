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
    author: { populate: '*' },
    bookseries: { populate: '*' },
    genre_books: { populate: '*' },
    cover: { populate: '*' },
    category: { populate: '*' },
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

console.log('Query URL:', queryUrl)
console.log('Query object:', JSON.stringify(queryObject, null, 2))

const { data: response } = await useFetch(queryUrl, {
  baseURL: strapiUrl
})

console.log('Response:', response.value?.data)

const article = computed(() => response.value?.data || [])

// SEO head
useHead(() => ({
  title: article.value.length ? article.value[0].title : '',
  meta: [
    {
      name: 'description',
      content: article.value.length
        ? `${article.value[0].description} - ${createExcerptFromText(article.value[0].body, 30)}`
        : '',
    },
    {
      name: 'keywords',
      content: article.value.length ? article.value[0].tags : '',
    },
    {
      property: 'og:title',
      content: article.value.length ? article.value[0].title : '',
    },
    {
      property: 'og:description',
      content: article.value.length
        ? `${article.value[0].description} - ${createExcerptFromText(article.value[0].body, 30)}`
        : '',
    },
    {
      property: 'og:image',
      content:
        article.value.length &&
        article.value[0].cover &&
        article.value[0].cover.url
          ? article.value[0].cover.url
          : '',
    },
    {
      name: 'twitter:title',
      content: article.value.length ? article.value[0].title : '',
    },
    {
      name: 'twitter:description',
      content: article.value.length
        ? `${article.value[0].description} - ${createExcerptFromText(article.value[0].body, 30)}`
        : '',
    },
    {
      property: 'twitter:image',
      content:
        article.value.length &&
        article.value[0].cover &&
        article.value[0].cover.url
          ? article.value[0].cover.url
          : '',
    },
  ],
}))
</script>
