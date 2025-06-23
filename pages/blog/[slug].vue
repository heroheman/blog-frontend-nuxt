<template>
  <main class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
    <article-view v-if="objIsNotEmpty(article)" detail :post="article[0]" />
    <div v-else class="flex items-center justify-center min-h-[400px]">
      <loading />
    </div>
  </main>
</template>

<script setup>
import {
  formatDate,
  objIsNotEmpty,
  createExcerptFromText,
} from '~/utils/helper'

const route = useRoute()
const { public: { strapiUrl } } = useRuntimeConfig()

const { data: response } = await useFetch(`/api/articles`, {
  baseURL: strapiUrl,
  query: {
    'populate[additional][populate]': '*',
    'filters[slug][$eq]': route.params.slug
  }
})

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
