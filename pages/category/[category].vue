<template>
  <main class="main max-w-4xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
  <div class="flex flex-wrap">
    <div class="w-full">
      <h2 class="article-title title">
        {{ title }}
      </h2>
      <p class="mb-8">{{ description }}</p>
    </div>
  </div>

  <div class="flex flex-wrap">
    <template v-if="$route.params.category === 'buecher'"
    class="w-full md:w-6/12"
    >
    <div class="w-full md:w-full">
      <collection-index
        compact
        show-single-collections
        :collection="genre.data || []"
        link-path="/genre/book"
        collection-title="Genre"
      />
    </div>
    <div class="w-full md:w-full">
      <collection-index
        compact
        show-single-collections
        :collection="authors.data || []"
        link-path="/author"
        collection-title="Autoren"
      />
    </div>
    <div class="w-full md:w-full">
      <collection-index
        compact
        show-single-collections
        :collection="series.data || []"
        link-path="/series"
        collection-title="Serien"
      />
    </div>
    </template>
  </div>

  <div class="flex flex-wrap">
    <div class="w-full md:w-full">
      <article-index
        v-if="articles"
        :articles="articles"
        :description="description"
        :show-description="showDescription"
      />
    </div>
  </div>
  </main>
</template>

<script setup>
const route = useRoute()
const { public: { strapiUrl } } = useRuntimeConfig()

// Reactive data
const articles = ref([])
const category = ref({})
const series = ref({ data: [] })
const genre = ref({ data: [] })
const authors = ref({ data: [] })

// Computed properties
const title = computed(() => category.value?.title || '')
const description = computed(() => category.value?.description || '')
const showDescription = computed(() => category.value?.showDescriptionInIndex || false)

// Fetch category data
const { data: categoryResponse } = await useFetch('/api/categories', {
  baseURL: strapiUrl,
  query: {
    'filters[slug][$eq]': route.params.category,
    'populate': '*',
  }
})

if (categoryResponse.value?.data?.[0]) {
  category.value = categoryResponse.value.data[0]
}

// Fetch articles in this category
const { data: articlesResponse } = await useFetch('/api/articles', {
  baseURL: strapiUrl,
  query: {
    'filters[category][slug][$eq]': route.params.category,
    'populate': ['cover', 'category', 'author', 'bookseries', 'genre_books'],
    'sort': 'display_published_date:desc',
    // page size 100
    'pagination[pageSize]': 100
  }
})

if (articlesResponse.value?.data) {
  articles.value = articlesResponse.value.data
}

// Fetch related collections for book category
if (route.params.category === 'buecher') {
  try {
    const [seriesData, genreData, authorData] = await Promise.all([
      $fetch('/api/bookseries?populate=*', { baseURL: strapiUrl }),
      $fetch('/api/genre-books?populate=*', { baseURL: strapiUrl }),
      $fetch('/api/authors?populate=*', { baseURL: strapiUrl })
    ])

    series.value = seriesData || { data: [] }
    genre.value = genreData || { data: [] }
    authors.value = authorData || { data: [] }
  } catch (error) {
    console.error('Error fetching book collections:', error)
  }
}
</script>

<style lang="postcss">
.articleview-main {
  @apply my-20;
}
</style>
