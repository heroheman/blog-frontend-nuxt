<template>
  <main v-if="posts" class="w-full sm:max-w-3xl">
    <div v-if="!loading">
      <div>
        <div
          v-for="(post, index) in posts"
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
        :posts-count="postsCount"
        :per-page="per_page"
        :current-page="page"
      />
    </div>
    <div v-else>Fetching Data</div>
  </main>
</template>

<script>
import { postsQuery, postsCount } from '@/graphql/postsQuery'

export default {
  data() {
    return {
      posts: [],
      postsCount: 0,
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
    posts: {
      prefetch: true,
      query: postsQuery,
      variables() {
        return {
          start: this.page * this.per_page,
          limit: this.per_page,
        }
      },
    },
    postsCount: {
      prefetch: true,
      query: postsCount,
    },
  },
}
</script>

<style lang="postcss">
.articleview-main {
  @apply my-20;
}
</style>
