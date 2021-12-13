<template>
  <main class="w-full">
    <div>
      <div
        v-for="(post, index) in articles"
        :key="index"
        class="pb-8 border-b border-gray-300 border-solid last:border-0"
      >
        <article-view v-if="post.category !== 'Heavy Rotation'" :post="post" />
      </div>

      <pagination
        class="pl-0 mt-8 mb-6 mr-0 text-left"
        :articles-count="articlesCount"
        :per-page="per_page"
        :current-page="page"
      />
    </div>
  </main>
</template>

<script>
export default {
  name: 'RootIndex',
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
    this.articles = await this.$strapi.$articles.find({
      _sort: 'display_published_date:DESC',
      _start: this.page * this.per_page,
      _limit: this.per_page,
    })
    this.articlesCount = await this.$strapi.$articles.count()
  },
  fetchOnServer: true,
}
</script>

<style lang="postcss">
.articleview-main {
  @apply my-20;
}
</style>
