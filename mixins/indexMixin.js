export default {
  data() {
    return {
      articles: [],
      articlesCount: 0,
      page: 0,
      per_page: 10,
      loading: true,
    }
  },
  watch: {
    '$route.params.page'() {
      this.articles = []
      this.page = this.$route.params.page - 1
    },
  },
  created() {
    if (this.$route.params.page) {
      this.page = this.$route.params.page - 1
    }
  },
  async fetch() {
    try {
      const start = this.page * this.per_page
      const response = await fetch(`https://flrnz.strapi.florenz.dev/api/articles?populate=*&sort=display_published_date:DESC&pagination[start]=${start}&pagination[limit]=${this.per_page}`)
      const payload = await response.json()
      this.articles = payload.data
      this.articlesCount = payload.meta.pagination.total
    } catch (error) {
      console.error('Error fetching articles:', error)
      this.articles = []
      this.articlesCount = 0
    }
  },
  fetchOnServer: true,
}
