<template>
  <main class="w-full lg:max-w-3xl">
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
