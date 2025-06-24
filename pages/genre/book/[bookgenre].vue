<template>
  <!-- <main class="w-full lg:max-w-3xl"> -->
  <main class="main max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
    <article-index v-if="articles" :articles="articles" />
    <p>
      <small> Zeig alle <nuxt-link to="/genre/book"
        data-umami-event="genre-click-show-all"
        :data-umami-event-from-genre="$route.params.bookgenre"
        >Genres</nuxt-link> </small>
    </p>
  </main>
</template>

<script setup>
const route = useRoute()
const { public: { strapiUrl } } = useRuntimeConfig()

const articles = ref([])

// Fetch genre data
const { data: response } = await useFetch('/api/genre-books', {
  baseURL: strapiUrl,
  query: {
    'populate': '*',
    'filters[slug][$eq]': route.params.bookgenre
  }
})

if (response.value?.data?.[0]) {
  const genre = response.value.data[0]
  articles.value = genre.articles ? genre.articles.sort((a, b) => {
    return new Date(b.display_published_date).getTime() - new Date(a.display_published_date).getTime()
  }) : []
} else {
  articles.value = []
}
</script>

<style lang="postcss">
.articleview-main {
  @apply my-20;
}
</style>
