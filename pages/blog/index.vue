<template>
  <main v-if="articles" class="w-full main">
    <div v-if="hasTag" class="mb-8 text-left">
      <nuxt-link class="items-start mb-8" to="/blog"
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
</script>

<style lang="postcss" scoped>
.listdate {
  font-weight: 400;
  min-width: 100px;
}
</style>
