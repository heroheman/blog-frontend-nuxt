<template>
  <div class="article-meta">
    <div class="flex flex-wrap items-center gap-x-1 gap-y-2 text-sm text-gray-500 font-meta">
      <time :datetime="date" class="font-medium">
        {{ formatDate(date) }}
      </time>

      <div v-if="author && author.constructor === Object" class="flex items-center gap-1">
        <span class="text-gray-400">•</span>
        <span>Autor:</span>
        <nuxt-link
          :to="`/author/${author.slug}`"
          data-umami-event="internal-link-author"
          :data-umami-event-target="author.name"
          :data-umami-event-url="`/author/${author.slug}`"
          class="text-gray-700 hover:text-gray-900 font-medium transition-colors duration-200"
        >
          {{ author.name }}
        </nuxt-link>
      </div>

      <div v-if="series.length" class="flex items-center gap-1">
        <span class="text-gray-400">•</span>
        <span>Serie:</span>
        <span class="flex flex-wrap gap-1">
          <nuxt-link
            v-for="(s, i) in series"
            :key="i"
            :to="`/series/${s.slug}`"
            data-umami-event="internal-link-series"
            :data-umami-event-target="s.title"
            data-umami-event-url="`/series/${s.slug}`"
            class="text-gray-700 hover:text-gray-900 font-medium transition-colors duration-200"
          >
            {{ s.title }}<span v-if="i + 1 !== series.length" class="text-gray-400">,</span>
          </nuxt-link>
        </span>
      </div>

      <div v-if="bookgenre.length" class="flex items-center gap-1">
        <span class="text-gray-400">•</span>
        <span>Genre:</span>
        <span class="flex flex-wrap gap-1">
          <nuxt-link
            v-for="(s, i) in bookgenre"
            :key="i"
            :to="`/genre/book/${s.slug}`"
            data-umami-event="internal-link-genre"
            :data-umami-event-target="s.title"
            data-umami-event-url="`/genre/book/${s.slug}`"
            class="text-gray-700 hover:text-gray-900 font-medium transition-colors duration-200"
          >
            {{ s.title }}<span v-if="i + 1 !== bookgenre.length" class="text-gray-400">,</span>
          </nuxt-link>
        </span>
      </div>

      <div v-if="englishSlug" class="flex items-center gap-1">
        <span class="text-gray-400">•</span>
        <nuxt-link
          :to="`/blog/en/${englishSlug}`"
          class="inline-flex items-center gap-1 text-gray-500 hover:text-gray-700 transition-colors duration-200"
          data-umami-event="index-read-english"
        >
          <svg class="w-3.5 h-3.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 0 1 6.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
          </svg>
          Show in English
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
import { formatDate } from '~/utils/helper'
export default {
  name: 'InternalLinking',
  props: {
    date: {
      type: String,
      default: '',
    },
    author: {
      type: Object,
      default: () => {},
    },
    series: {
      type: Array,
      default: () => [],
    },
    bookgenre: {
      type: Array,
      default: () => [],
    },
    englishSlug: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      loading: true,
    }
  },
  methods: {
    formatDate,
  },
}
</script>

<style lang="postcss" scoped>
.article-meta {
  @apply mt-4;
}

/* Mobile adjustments */
@media (max-width: 640px) {
  .article-meta {
    @apply mt-3;
  }

  .article-meta .flex {
    @apply text-xs gap-x-1 gap-y-1;
  }

  .article-meta .flex > div {
    @apply text-xs;
  }

  /* Make links more touch-friendly but keep inline */
  .article-meta a {
    @apply py-1 px-1 -mx-1 rounded min-h-[32px] inline-flex items-center;
  }

  /* Reduce bullet spacing */
  .article-meta .text-gray-400 {
    @apply text-xs;
  }
}
</style>
