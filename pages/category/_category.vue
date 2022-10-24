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
        :collection="genre.data"
        link-path="/genre/book"
        collection-title="Genre"
      />
      <collection-index
        show-single-collections
        :collection="authors.data"
        link-path="/author"
        collection-title="Autoren"
      />
      <collection-index
        show-single-collections
        :collection="series.data"
        link-path="/series"
        collection-title="Buchserien"
      />
    </div>
  </main>
</template>

<script>
export default {
  name: 'IndexCategory',
  data() {
    return {
      showDescription: false,
      title: '',
      description: '',
      articles: [],
      series: [],
      genre: [],
      authors: [],
      loading: true,
    }
  },
  async fetch() {
    const payload = await this.$strapi.find('categories', {
      populate: '*', // populate all relations';
      // sort: 'display_published_date:DESC',
      // slug: this.$route.params.category,
      filters: {
        slug: {
          $eq: this.$route.params.category,
        },
      },
    })

    const tmp = payload.data

    if (this.$route.params.category === 'musik') {
      this.showDescription = true
    }

    this.showDescription = tmp[0].attributes.showDescriptionInIndex
    this.title = tmp[0].attributes.title
    this.description = tmp[0].attributes.description

    this.articles = tmp[0].attributes.articles.data.sort(function (a, b) {
      return (
        new Date(b.attributes.display_published_date).getTime() -
        new Date(a.attributes.display_published_date).getTime()
      )
    })

    const series = await this.$strapi.find('bookseries', { populate: '*' })
    this.series = series

    const genre = await this.$strapi.find('genre-books', { populate: '*' })
    this.genre = genre

    const author = await this.$strapi.find('authors', { populate: '*' })
    this.authors = author
  },
  fetchOnServer: true,
}
</script>

<style lang="postcss">
.articleview-main {
  @apply my-20;
}
</style>
