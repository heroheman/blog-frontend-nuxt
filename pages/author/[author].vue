<template>
  <main class="w-full lg:max-w-3xl">
    <article-index v-if="articles" :articles="articles" />
    <p class="text-base">
      <small> Zeige alle <nuxt-link to="/author"
        data-umami-event="author-click-show-all"
        :data-umami-event-from-author="$route.params.author"
        >Autoren</nuxt-link></small>
    </p>
  </main>
</template>

<script setup>
const route = useRoute()
const { public: { strapiUrl } } = useRuntimeConfig()

const articles = ref([])

// Fetch author data
const { data: response } = await useFetch('/api/authors', {
  baseURL: strapiUrl,
  query: {
    'populate': '*',
    'filters[slug][$eq]': route.params.author
  }
})

if (response.value?.data?.[0]) {
  const author = response.value.data[0]
  articles.value = author.articles ? author.articles.sort((a, b) => {
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
