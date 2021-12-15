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
    const tmp = await this.$strapi.find('authors', {
      slug: this.$route.params.author,
    })

    this.articles = tmp[0].articles.sort(function (a, b) {
      return (
        new Date(b.display_published_date).getTime() -
        new Date(a.display_published_date).getTime()
      )
    })
  },
  fetchOnServer: true,
}
</script>

<style lang="postcss">
.articleview-main {
  @apply my-20;
}
</style>
