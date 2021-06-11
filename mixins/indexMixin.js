export default {
  data() {
    return {
      articles: [],
      articlesCount: 0,
      page: 0,
      per_page: 5,
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
    this.articles = await this.$strapi.$articles.find({
      _sort: 'display_published_date:DESC',
      _start: this.page * this.per_page,
      _limit: this.per_page,
    })
    this.articlesCount = await this.$strapi.$articles.count()
  },
  fetchOnServer: true,
}
