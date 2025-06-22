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
    const payload = await this.$strapi.get('/articles', {
      params: {
        populate: '*', // populate all relations
        sort: 'display_published_date:DESC',
        'pagination[start]': this.page * this.per_page,
        'pagination[limit]': this.per_page,
      },
    })
    this.articles = payload.data
    this.articlesCount = payload.meta.pagination.total
  },
  fetchOnServer: true,
}
