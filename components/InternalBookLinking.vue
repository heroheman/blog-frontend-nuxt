<template>
  <ul class="internal-linking">
    <li>
      <time datetime="date">
        {{ formatDate(date) }}
      </time>
    </li>
    <!-- <li v-if="author && Object.prototype.hasOwnProperty.call(author, "slug");"> -->
    <li
      v-if="
        author &&
        Object.keys(author).length === 0 &&
        author.constructor === Object
      "
    >
      <em>| Autor:</em>
      <nuxt-link :to="`/author/${author.slug}`">{{ author.name }}</nuxt-link>
    </li>
    <li v-if="series.length">
      <em>| Buchreihe:</em>
      <nuxt-link v-for="(s, i) in series" :key="i" :to="`/series/${s.slug}`">
        {{ s.title }}
      </nuxt-link>
    </li>
    <li v-if="bookgenre.length">
      <em>| Genre:</em>
      <nuxt-link
        v-for="(s, i) in bookgenre"
        :key="i"
        :to="`/genre/book/${s.slug}`"
      >
        {{ s.title }}
      </nuxt-link>
    </li>
  </ul>
</template>

<script>
import { formatDate } from '@/utils/helper.js'
export default {
  name: 'Author',
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
  methods: {
    formatDate,
  },
  data() {
    return {
      loading: true,
    }
  },
  async fetch() {},
}
</script>

<style lang="postcss" scoped>
.internal-linking {
  @apply pl-0 ml-0;
  > li {
    @apply pl-0 ml-0;
    @apply inline-block;
    list-style: none;
  }
}
</style>
