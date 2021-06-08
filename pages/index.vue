<template>
  <main v-if="articles" class="w-full sm:max-w-3xl">
    <div v-if="!loading">
      <div>
        <div
          v-for="(post, index) in articles"
          :key="index"
          class="pb-8 border-b border-gray-300 border-solid last:border-0"
        >
          <article-view
            v-if="post.category !== 'Heavy Rotation'"
            :post="post"
          />
        </div>
      </div>
      <pagination
        class="pl-0 mt-0 mb-6 mr-0 text-left"
        :articles-count="articlesCount"
        :per-page="per_page"
        :current-page="page"
      />
    </div>
    <div v-else>Fetching Data</div>
  </main>
</template>

<script>
import { articlesQuery, articlesCount } from '@/graphql/articlesQuery'

export default {
  data() {
    return {
      articles: [],
      articlesCount: 0,
      page: 0,
      per_page: 3,
      loading: true,
    }
  },
  watch: {
    '$route.query.page'() {
      this.page = this.$route.query.page - 1
    },
  },
  created() {
    if (this.$route.query.page) {
      this.page = this.$route.query.page - 1
      this.loading = false
    } else {
      this.loading = false
    }
  },
  apollo: {
    articles: {
      prefetch: true,
      query: articlesQuery,
      variables() {
        return {
          start: this.page * this.per_page,
          limit: this.per_page,
        }
      },
    },
    articlesCount: {
      prefetch: true,
      query: articlesCount,
    },
  },
}
</script>

<style lang="postcss">
.articleview-main {
  @apply my-20;
}
</style>
