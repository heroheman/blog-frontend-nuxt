<template>
  <main class="w-full article-single">
    <!-- DEBUG: Display route parameter -->
    <div style="background: red; color: white; padding: 20px; margin: 20px; font-size: 20px; font-weight: bold; z-index: 9999; position: relative;">
      <h1>🚨 DEBUG INFO 🚨</h1>
      <p>route.params.slug: "{{ route.params.slug }}"</p>
      <p>route.params.post: "{{ route.params.post }}"</p>
      <p>route.params: {{ JSON.stringify(route.params) }}</p>
      <p>route.path: {{ route.path }}</p>
    </div>

    <article-view v-if="objIsNotEmpty(article)" detail :post="article[0]" />
    <!-- <article-view-music detail v-else :blog-post="post" /> -->
    <div v-else>
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
