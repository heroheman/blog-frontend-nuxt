<template>
  <div class="article-meta">
    <div class="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-gray-500 font-meta">
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
    .flex {
      @apply flex-col items-start gap-y-1 gap-x-0;
    }

    .flex > div {
      @apply flex-wrap;
    }
  }
}
</style>
