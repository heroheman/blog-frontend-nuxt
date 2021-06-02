<template>
  <main v-if="posts" class="w-full sm:max-w-3xl">
    <ul class="pagination">
      <li
        class="inline-block px-2"
        v-for="index in parseInt(postsCount / per_page + 1)"
        :key="index"
      >
        <nuxt-link :to="{ name: 'index', query: { page: index } }">
          {{ index }}
        </nuxt-link>
      </li>
    </ul>

    <div v-if="!loading">
      <div
        v-for="(post, index) in posts"
        :key="index"
        class="pb-8 border-b border-gray-300 border-solid"
      >
        <article-view v-if="post.category !== 'Heavy Rotation'" :post="post" />
      </div>
    </div>
    <div v-else>Fetching Data</div>
  </main>
</template>

<script>
import { postsQuery, postsCount } from '@/graphql/postsQuery'

export default {
  head() {
    return {
      script: [],
    }
  },
  data() {
    return {
      posts: [],
      postsCount: 0,
      page: 0,
      per_page: 3,
      loading: true,
    }
  },
  created() {
    if (this.$route.query.page) {
      this.page = this.$route.query.page - 1
      this.loading = false
    } else {
      this.loading = false
    }
  },
  watch: {
    '$route.query.page'() {
      this.page = this.$route.query.page - 1
    },
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
