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
    const tmp = await this.$strapi.find('genre-books', {
      _sort: 'display_published_date:DESC',
      slug: this.$route.params.bookgenre,
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
