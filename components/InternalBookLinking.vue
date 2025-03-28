<template>
  <ul class="mt-4 internal-linking">
    <li>
      <time datetime="date">
        {{ formatDate(date) }}
      </time>
    </li>
    <!-- <li v-if="author && Object.prototype.hasOwnProperty.call(author, "slug");"> -->
    <li v-if="author && author.constructor === Object">
      <strong>| Autor:</strong>
      <nuxt-link
        :to="`/author/${author.attributes.slug}`"
        data-umami-event="internal-link-author"
        :data-umami-event-target="author.attributes.name"
        data-umami-event-url="`/author/${author.attributes.slug}`"
        class="umami--click--internal-author"
      >
        {{ author.attributes.name }}
      </nuxt-link>
    </li>
    <li v-if="series.length">
      <strong>| Buchreihe:</strong>
      <span v-for="(s, i) in series" :key="i">
        <nuxt-link
          :to="`/series/${s.attributes.slug}`"
          data-umami-event="internal-link-series"
          :data-umami-event-target="s.attributes.title"
          data-umami-event-url="`/series/${s.attributes.slug}`"
        >
          {{ s.attributes.title }}
        </nuxt-link>
        <span v-if="i + 1 !== series.length">, </span>
      </span>
    </li>
    <li v-if="bookgenre.length" class="mr-2">
      <strong>| Genre:</strong>
      <span v-for="(s, i) in bookgenre" :key="i">
        <nuxt-link
          :to="`/genre/book/${s.attributes.slug}`"
          data-umami-event="internal-link-genre"
          :data-umami-event-target="s.attributes.title"
          data-umami-event-url="`/genre/book/${s.attributes.slug}`"
        >
          {{ s.attributes.title }}
        </nuxt-link>
        <span v-if="i + 1 !== bookgenre.length">, </span>
      </span>
    </li>
  </ul>
</template>

<script>
import { formatDate } from '@/utils/helper.js'
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
.internal-linking {
  @apply pl-0 ml-0;
  > li {
    @apply pl-0 ml-0;
    @apply inline-block;
    list-style: none;

    a {
      @apply italic underline;
      @apply font-normal;
    }
  }
}
</style>
