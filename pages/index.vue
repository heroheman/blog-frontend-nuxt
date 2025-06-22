<template>
  <main class="w-full">
    <div>
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
        :per-page="per_page"
        :current-page="page"
      />
    </div>
  </main>
</template>

<script setup>
const route = useRoute()
const { public: { strapiUrl } } = useRuntimeConfig()

// Reactive state
const page = ref(route.params.page ? parseInt(route.params.page) - 1 : 0)
const per_page = 10

// Watch for route changes
watch(() => route.params.page, (newPage) => {
  if (newPage) {
    page.value = parseInt(newPage) - 1
  }
})

// Compute pagination start
const start = computed(() => page.value * per_page)

// Fetch articles data
const { data: response, pending } = await useFetch('/api/articles', {
  baseURL: strapiUrl,
  query: {
    populate: '*',
    sort: 'display_published_date:DESC',
    'pagination[start]': start,
    'pagination[limit]': per_page
  }
})

const articles = computed(() => response.value?.data || [])
const articlesCount = computed(() => response.value?.meta?.pagination?.total || 0)
</script>

<style lang="postcss">
.articleview-main {
  @apply my-20;
}
</style>
