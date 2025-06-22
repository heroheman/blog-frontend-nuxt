<template>
  <main class="w-full lg:max-w-3xl">
    <article-index v-if="articles" :articles="articles" />
    <p class="text-base">
      <small> Zeige alle <nuxt-link to="/author">Autoren</nuxt-link></small>
    </p>
  </main>
</template>

<script>
export default {
  name: 'IndexAuthor',
  data() {
    return {
      articles: [],
      loading: true,
    }
  },
  async fetch() {
    try {
      const response = await fetch(`https://flrnz.strapi.florenz.dev/api/authors?populate=*&filters[slug][$eq]=${this.$route.params.author}`)
      const payload = await response.json()

      if (payload.data && payload.data.length > 0) {
        const author = payload.data[0]
        this.articles = author.articles ? author.articles.sort(function (a, b) {
          return (
            new Date(b.display_published_date).getTime() -
            new Date(a.display_published_date).getTime()
          )
        }) : []
      } else {
        this.articles = []
      }
    } catch (error) {
      console.error('Error fetching author:', error)
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
