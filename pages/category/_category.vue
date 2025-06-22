<template>
  <main class="flex flex-wrap">
    <div class="w-full">
      <h2 class="article-title title">
        {{ title }}
      </h2>
      <p class="mb-8">{{ description }}</p>
    </div>

    <div class="w-full md:w-3/4 md:pr-12">
      <article-index
        v-if="articles"
        :articles="articles"
        :description="description"
        :show-description="showDescription"
      />
    </div>
    <div v-if="$route.params.category === 'buecher'" class="w-full md:w-1/4">
      <collection-index
        show-single-collections
        :collection="genre.data || []"
        link-path="/genre/book"
        collection-title="Genre"
      />
      <collection-index
        show-single-collections
        :collection="authors.data || []"
        link-path="/author"
        collection-title="Autoren"
      />
      <collection-index
        show-single-collections
        :collection="series.data || []"
        link-path="/series"
        collection-title="Buchserien"
      />
    </div>
  </main>
</template>

<script setup>
const route = useRoute()
const { public: { strapiUrl } } = useRuntimeConfig()

// Reactive state
const showDescription = ref(false)
const title = ref('')
const description = ref('')
const articles = ref([])
const series = ref({ data: [] })
const genre = ref({ data: [] })
const authors = ref({ data: [] })

// Fetch category data
const { data: categoryResponse } = await useFetch('/api/categories', {
  baseURL: strapiUrl,
  query: {
    populate: '*',
    'filters[slug][$eq]': route.params.category
  }
})

// Process category data
if (categoryResponse.value?.data && categoryResponse.value.data.length > 0) {
  const category = categoryResponse.value.data[0]

  if (route.params.category === 'musik') {
    showDescription.value = true
  }

  showDescription.value = category.showDescriptionInIndex
  title.value = category.title
  description.value = category.description

  // Sort articles by date
  articles.value = category.articles ? category.articles.sort((a, b) => {
    return new Date(b.display_published_date).getTime() - new Date(a.display_published_date).getTime()
  }) : []

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
}
</script>

<style lang="postcss">
.articleview-main {
  @apply my-20;
}
</style>
