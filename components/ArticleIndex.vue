<template>
  <div class="article-index">
    <div v-if="view === 'list'" class="article-index__list space-y-4">
      <article
        v-for="(article, index) in articles"
        :key="index"
        class="article-index__listitem"
      >
        <div class="article-item group">
          <nuxt-link
            :to="`/blog/${article.slug}`"
            class="block py-3 border-b border-gray-200 hover:border-gray-300 transition-colors duration-200"
            data-umami-event="index-click-article"
            :data-umami-event-title="article.title"
            :data-umami-event-url="`/blog/${article.slug}`"
          >
            <div class="flex flex-col space-y-2">
              <div class="flex items-start justify-between">
                <h3 class="text-lg sm:text-xl font-head font-normal text-gray-900 group-hover:text-gray-700 transition-colors duration-200 flex-1 min-w-0 pr-4">
                  {{ article.title }}
                  &nbsp;
                <time
                  v-if="article.display_published_date"
                  class="text-xs sm:text-sm text-gray-500 font-meta flex-shrink-0"
                  :datetime="article.display_published_date"
                >
                  {{ formatDate(article.display_published_date, true) }}
                </time>
                </h3>
              </div>
              <p v-if="showDescription && article.description" class="text-sm text-gray-600 font-meta leading-relaxed">
                {{ article.description }}
              </p>
            </div>
          </nuxt-link>
        </div>
      </article>
    </div>

    <div v-if="view === 'thumbs'" class="article-index__thumbs grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
      <article
        v-for="(article, index) in articles"
        :key="index"
        class="article-index__thumbitem"
      >
        <nuxt-link
          :to="`/blog/${article.slug}`"
          class="block group"
          data-umami-event="index-click-article-thumb"
          :data-umami-event-title="article.title"
          :data-umami-event-url="`/blog/${article.slug}`"
        >
          <figure class="article-item">
            <div v-if="article.cover && article.cover.data" class="aspect-w-4 aspect-h-3 mb-3 rounded overflow-hidden bg-gray-100">
              <img
                :srcset="`${article.cover.data.formats.small.url} ${article.cover.data.formats.small.width}w,
                        ${article.cover.data.formats.thumbnail.url} ${article.cover.data.formats.thumbnail.width}w
                        ${article.cover.data.formats.medium.url} ${article.cover.data.formats.medium.width}w
                        ${article.cover.data.formats.large.url} ${article.cover.data.formats.large.width}w`"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                :src="article.cover.data.formats.small.url"
                :alt="article.title"
                class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
              />
            </div>
            <figcaption class="space-y-2">
              <h3 class="text-base sm:text-lg font-head font-normal text-gray-900 group-hover:text-gray-700 transition-colors duration-200 leading-tight">
                {{ article.title }}
              </h3>
              <time
                v-if="article.display_published_date"
                class="text-xs text-gray-500 font-meta block"
                :datetime="article.display_published_date"
              >
                {{ formatDate(article.display_published_date, true) }}
              </time>
            </figcaption>
          </figure>
        </nuxt-link>
      </article>
    </div>
  </div>
</template>

<script>
import { formatDate } from '~/utils/helper'
export default {
  name: 'ArticleIndex',
  props: {
    view: {
      type: String,
      default: 'list', // list, thumbs
    },
    articles: {
      type: Array,
      default: () => [],
    },
    showDescription: {
      type: Boolean,
      default: false,
    },
    description: {
      type: String,
      default: 'no description given', // list, thumbs
    },
  },
  methods: { formatDate },
}
</script>

<style lang="postcss" scoped>
.article-index {
  @apply w-full;
}

.article-index__list {
  @apply w-full;
}

.article-index__listitem {
  @apply w-full;
}

.article-index__thumbs {
  @apply w-full;
}

.article-index__thumbitem {
  @apply w-full;
}

.article-item {
  @apply w-full;
}

/* Ensure proper aspect ratio for thumbnails */
.aspect-w-4 {
  position: relative;
  padding-bottom: 75%; /* 4:3 aspect ratio */
}

.aspect-w-4 > img {
  position: absolute;
  height: 100%;
  width: 100%;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}
</style>
