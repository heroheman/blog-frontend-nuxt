<!-- eslint-disable vue/no-v-html -->
<template>
  <main class="w-full lg:max-w-3xl">
    <div class="w-full">
      <h2 class="article-title title">
        {{ title }}
      </h2>
      <div
        v-if="description"
        class="relative article-text"
        v-html="renderedDescription"
      />
    </div>
    <article-index v-if="articles" :articles="articles" view="thumbs" />
    <p class="text-base">
      <small> Zeig alle <nuxt-link to="/series"
        data-umami-event="series-click-show-all"
        :data-umami-event-from-series="$route.params.series"
        >Buchreihen</nuxt-link> </small>
    </p>
  </main>
</template>

<script setup>
import { marked } from 'marked'

const route = useRoute()
const { public: { strapiUrl } } = useRuntimeConfig()

const title = ref('')
const description = ref('')
const articles = ref([])

// Fetch series data
const { data: response } = await useFetch('/api/bookseries', {
  baseURL: strapiUrl,
  query: {
    'populate': '*',
    'filters[slug][$eq]': route.params.series
  }
})

if (response.value?.data?.[0]) {
  const series = response.value.data[0]
  title.value = series.title
  description.value = series.description
  articles.value = series.articles ? series.articles.sort((a, b) => {
    return new Date(b.display_published_date).getTime() - new Date(a.display_published_date).getTime()
  }) : []
} else {
  title.value = ''
  description.value = ''
  articles.value = []
}

// Render markdown description
const renderedDescription = computed(() => {
  return description.value ? marked(description.value) : ''
})
</script>

<style lang="postcss">
.articleview-main {
  @apply my-20;
}
</style>
