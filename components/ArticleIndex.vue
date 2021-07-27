<template>
  <div class="article-index">
    <ul class="article-index__list">
      <li
        v-for="(articles, index) in articles"
        :key="index"
        class="article-index__listitem"
      >
        <div class="article-item">
          <div class="article-item__title">
            <span
              v-if="articles.display_published_date"
              class="article-item__date"
            >
              {{ formatDate(articles.display_published_date, true) }}
              <span class="hidden mx-1 sm:inline-block"> &ndash; </span>
            </span>

            <nuxt-link
              :to="`/blog/${articles.slug}`"
              class="inline-block mb-2 article article--clickable"
            >
              {{ articles.title }}
            </nuxt-link>
            <p class="article-item__body">
              {{ articles.description }}
            </p>
          </div>
          <!-- <tags -->
          <!--   v-if="blogPost.tags" -->
          <!--   class="w-full mb-2 md:self-end sm:w-full md:w-auto" -->
          <!--   :tags="blogPost.tags" -->
          <!-- /> -->
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { formatDate } from '@/utils/helper.js'
export default {
  name: 'ArticleIndex',
  props: {
    articles: {
      type: Array,
      default: () => [],
    },
  },
  methods: { formatDate },
}
</script>

<style lang="postcss">
.article-index {
  &__list {
    @apply flex flex-col md:pt-32 pl-0;
  }
  &__listitem {
    @apply flex flex-col border-b border-gray-200 border-solid;
  }
}

.article-item {
  @apply flex flex-wrap text-left align-baseline font-meta;

  &__title {
    @apply w-full pr-2 mb-2 sm:w-full font-meta;
  }

  &__date {
    @apply block md:inline-block mb-2 text-sm text-left;
  }

  &__body {
    @apply text-sm;
  }
}
</style>
