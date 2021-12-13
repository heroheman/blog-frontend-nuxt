<template>
  <main class="flex flex-wrap">
    <div class="w-full">
      <h2 class="article-title title">
        {{ title }}
      </h2>
      <p>{{ description }}</p>
    </div>

    <div class="w-full md:w-3/4 md:pr-12">
      <article-index
        v-if="articles"
        :articles="articles"
        :show-description="showDescription"
      />
    </div>
    <div class="w-full md:w-1/4" v-if="$route.params.category === 'buecher'">
      <collection-index
        :collection="genre"
        link-path="/genre/book"
        collection-title="Genre"
      />
      <collection-index
        :collection="authors"
        link-path="/author"
        collection-title="Autoren"
      />
      <collection-index
        :collection="series"
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
    const tmp = await this.$strapi.find('categories', {
      slug: this.$route.params.category,
    })

    if (this.$route.params.category === 'musik') {
      this.showDescription = true
    }

    this.showDescription = tmp[0].showDescriptionInIndex
    this.title = tmp[0].title
    this.description = tmp[0].description

    this.articles = tmp[0].articles.sort(function (a, b) {
      return (
        new Date(b.display_published_date).getTime() -
        new Date(a.display_published_date).getTime()
      )
    })

    const series = await this.$strapi.find('bookseries')
    this.series = series

    const genre = await this.$strapi.find('genre-books')
    this.genre = genre

    const author = await this.$strapi.find('authors')
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
