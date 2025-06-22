<template>
  <main class="w-full lg:max-w-3xl">
    <div v-if="articles.length">
      <div
        v-for="(post, index) in articles"
        :key="index"
        class="pb-8 border-b border-gray-300 border-solid last:border-0"
      >
        <article-view v-if="post.category !== 'Heavy Rotation'" :post="post" />
      </div>
      <pagination
        class="pl-0 mt-8 mb-6 mr-0 text-left"
        :articles-count="articlesCount"
        :per-page="perPage"
        :current-page="currentPage"
      />
    </div>
    <div v-else>
      <loading />
    </div>
  </main>
</template>

<script setup>
const route = useRoute()
const { public: { strapiUrl } } = useRuntimeConfig()

const articles = ref([])
const articlesCount = ref(0)
const perPage = 10
const currentPage = computed(() => parseInt(route.params.page) || 1)

// Calculate pagination
const start = computed(() => (currentPage.value - 1) * perPage)

// Fetch articles
const { data: response } = await useFetch('/api/articles', {
  baseURL: strapiUrl,
  query: {
    'populate': '*',
    'sort': 'display_published_date:DESC',
    'pagination[start]': start.value,
    'pagination[limit]': perPage
  }
})

if (response.value) {
  articles.value = response.value.data || []
  articlesCount.value = response.value.meta?.pagination?.total || 0
}
</script>

<style lang="postcss">
.articleview-main {
  @apply my-20;
}
</style>
