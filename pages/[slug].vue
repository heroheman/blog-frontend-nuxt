<template>
  <main class="w-full sm:max-w-3xl article-single">
    <div v-if="pages.length">
      <article role="article" class="text-left articleview-main">
        <div class="flex flex-col mb-4">
          <div>
            <h6 class="date">
              {{ content.description }}
            </h6>
          </div>

          <h2 class="article-title title">
            {{ content.title }}
          </h2>

          <div class="relative" v-html="renderedBody" />
        </div>
      </article>
    </div>
    <div v-else>
      <h2>404 and stuff</h2>
    </div>
  </main>
</template>

<script setup>
import { formatDate } from '@/utils/helper.js'
import { marked } from 'marked'

const route = useRoute()
const { public: { strapiUrl } } = useRuntimeConfig()

// Fetch page data
const { data: response } = await useFetch('/api/pages', {
  baseURL: strapiUrl,
  query: {
    'filters[slug][$eq]': route.params.slug
  }
})

const pages = computed(() => response.value?.data || [])
const content = computed(() => pages.value[0] || {})

// Render markdown content
const renderedBody = computed(() => {
  if (content.value.body) {
    return marked(content.value.body)
  }
  return ''
})
</script>
