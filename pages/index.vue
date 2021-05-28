<template>
  <main v-if="posts" class="w-full sm:max-w-3xl">
    {{ posts }}
    <div
      v-for="(post, index) in posts.posts"
      :key="index"
      class="pb-8 border-b border-gray-300 border-solid"
    >
      {{ post }}
      <!-- <article-view -->
      <!--   v-if="post.category !== 'Heavy Rotation'" -->
      <!--   :blog-post="post" -->
      <!-- /> -->
    </div>
  </main>
</template>

<script>
import { postsQuery } from '@/graphql/postsQuery'

export default {
  head() {
    return {
      script: [],
    }
  },
  data() {
    return {
      posts: [],
    }
  },
  apollo: {
    posts: {
      prefetch: true,
      query: postsQuery,
    },
  },
}
</script>

<style lang="postcss">
.articleview-main {
  @apply my-20;
}
</style>
