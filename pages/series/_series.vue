<!-- eslint-disable vue/no-v-html -->
<template>
  <main class="w-full lg:max-w-3xl">
    <div class="w-full">
      <h2 class="article-title title">
        {{ title }}
      </h2>
      <div
        v-if="description"
        class="relative article-text"
        v-html="`${$md.render(description)}`"
      />
    </div>
    <article-index v-if="articles" :articles="articles" view="thumbs" />
    <p class="text-base">
      <small> Zeig alle <nuxt-link to="/series">Buchreihen</nuxt-link> </small>
    </p>
  </main>
</template>

<script>
export default {
  name: 'IndexBookSeries',
  data() {
    return {
      title: '',
      description: '',
      articles: [],
      loading: true,
    }
  },
  async fetch() {
    try {
      const response = await fetch(`https://flrnz.strapi.florenz.dev/api/bookseries?populate=*&filters[slug][$eq]=${this.$route.params.series}`)
      const payload = await response.json()

      if (payload.data && payload.data.length > 0) {
        const series = payload.data[0]
        this.title = series.title
        this.description = series.description
        this.articles = series.articles ? series.articles.sort(function (a, b) {
          return (
            new Date(b.display_published_date).getTime() -
            new Date(a.display_published_date).getTime()
          )
        }) : []
      } else {
        this.title = ''
        this.description = ''
        this.articles = []
      }
    } catch (error) {
      console.error('Error fetching series:', error)
      this.title = ''
      this.description = ''
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
