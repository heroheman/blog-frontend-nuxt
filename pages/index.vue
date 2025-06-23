<template>
  <main class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
    <div class="space-y-12 sm:space-y-16">
      <article
        v-for="(post, index) in articles"
        :key="index"
        class="group"
      >
        <article-view v-if="post.category !== 'Heavy Rotation'" :post="post" />
      </article>

      <pagination
        class="mt-16 sm:mt-20"
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


