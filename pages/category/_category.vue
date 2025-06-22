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
        :collection="genre.data || []"
        link-path="/genre/book"
        collection-title="Genre"
      />
      <collection-index
        show-single-collections
        :collection="authors.data || []"
        link-path="/author"
        collection-title="Autoren"
      />
      <collection-index
        show-single-collections
        :collection="series.data || []"
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
    try {
      // Fetch category data
      const categoryResponse = await fetch(`https://flrnz.strapi.florenz.dev/api/categories?populate=*&filters[slug][$eq]=${this.$route.params.category}`)
      const categoryPayload = await categoryResponse.json()

      if (categoryPayload.data && categoryPayload.data.length > 0) {
        const category = categoryPayload.data[0]

        if (this.$route.params.category === 'musik') {
          this.showDescription = true
        }

        this.showDescription = category.showDescriptionInIndex
        this.title = category.title
        this.description = category.description

        // In Strapi v5, articles should be directly available, not wrapped in .data
        this.articles = category.articles ? category.articles.sort(function (a, b) {
          return (
            new Date(b.display_published_date).getTime() -
            new Date(a.display_published_date).getTime()
          )
        }) : []

        // Fetch related collections for book category
        if (this.$route.params.category === 'buecher') {
          try {
            const [seriesResponse, genreResponse, authorResponse] = await Promise.all([
              fetch('https://flrnz.strapi.florenz.dev/api/bookseries?populate=*'),
              fetch('https://flrnz.strapi.florenz.dev/api/genre-books?populate=*'),
              fetch('https://flrnz.strapi.florenz.dev/api/authors?populate=*')
            ])

            const seriesData = await seriesResponse.json()
            const genreData = await genreResponse.json()
            const authorData = await authorResponse.json()

            // Ensure proper structure with data property
            this.series = seriesData || { data: [] }
            this.genre = genreData || { data: [] }
            this.authors = authorData || { data: [] }

            console.log('Series data:', this.series)
            console.log('Genre data:', this.genre)
            console.log('Authors data:', this.authors)
          } catch (error) {
            console.error('Error fetching book collections:', error)
            this.series = { data: [] }
            this.genre = { data: [] }
            this.authors = { data: [] }
          }
        } else {
          // Initialize with empty arrays for non-book categories
          this.series = { data: [] }
          this.genre = { data: [] }
          this.authors = { data: [] }
        }
      } else {
        this.title = ''
        this.description = ''
        this.articles = []
        this.series = { data: [] }
        this.genre = { data: [] }
        this.authors = { data: [] }
      }
    } catch (error) {
      console.error('Error fetching category:', error)
      this.title = ''
      this.description = ''
      this.articles = []
      this.series = { data: [] }
      this.genre = { data: [] }
      this.authors = { data: [] }
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
