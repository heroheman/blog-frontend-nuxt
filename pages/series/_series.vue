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
    // const tmp = await this.$strapi.find('bookseries', {
    //   slug: this.$route.params.series,
    // })
    const payload = await this.$strapi.find('bookseries', {
      populate: 'deep,3', // populate all relations
      filters: {
        slug: {
          $eq: this.$route.params.series,
        },
      },
    })

    const tmp = payload.data[0].attributes

    this.title = tmp.title
    this.description = tmp.description

    this.articles = tmp.articles.data.sort(function (a, b) {
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
