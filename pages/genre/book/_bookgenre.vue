<template>
  <main class="w-full lg:max-w-3xl">
    <article-index v-if="articles" :articles="articles" />
    <p>
      <small> Zeig alle <nuxt-link to="/genre/book">Genres</nuxt-link> </small>
    </p>
  </main>
</template>

<script>
export default {
  name: 'IndexGenreBooks',
  data() {
    return {
      articles: [],
      loading: true,
    }
  },
  async fetch() {
    try {
      const response = await fetch(`https://flrnz.strapi.florenz.dev/api/genre-books?populate=*&filters[slug][$eq]=${this.$route.params.bookgenre}`)
      const payload = await response.json()

      if (payload.data && payload.data.length > 0) {
        const genre = payload.data[0]
        this.articles = genre.articles ? genre.articles.sort(function (a, b) {
          return (
            new Date(b.display_published_date).getTime() -
            new Date(a.display_published_date).getTime()
          )
        }) : []
      } else {
        this.articles = []
      }
    } catch (error) {
      console.error('Error fetching genre:', error)
      this.articles = []
    }
  },
  fetchOnServer: true,
}
</script>

<style lang="postcss">
.articleview-main {
  @apply my-20;
}
</style>
