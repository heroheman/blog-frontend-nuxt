<template>
  <main class="w-full lg:max-w-3xl">
    <div v-if="articles.length">
      <div
        v-for="(post, index) in articles"
        :key="index"
        class="pb-8 border-b border-gray-300 border-solid last:border-0"
      >
        <article-view v-if="post.category !== 'Heavy Rotation'" :post="post" />
      </div>
      <!-- <pagination
        class="pl-0 mt-8 mb-6 mr-0 text-left"
        :articles-count="articlesCount"
        :per-page="per_page"
        :current-page="page"
      /> -->
    </div>
    <div v-else>
      <loading />
    </div>
  </main>
</template>

<script>
// import { articlesQuery, articlesCount } from '@/graphql/articlesQuery'
import indexMixin from '@/mixins/indexMixin.js'

export default {
  name: 'PageIndex',
  mixins: [indexMixin],
}
</script>

<style lang="postcss">
.articleview-main {
  @apply my-20;
}
</style>
