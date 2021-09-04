<template>
  <ul class="internal-linking">
    <li>
      <time datetime="date">
        {{ formatDate(date) }}
      </time>
    </li>
    <li>
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
      required: true,
      default: '',
    },
    author: {
      type: Object,
      required: true,
      default: () => {},
    },
    series: {
      type: Array,
      required: true,
      default: () => [],
    },
    bookgenre: {
      type: Array,
      required: true,
      default: () => [],
    },
  },
  methods: {
    formatDate,
  },
  data() {
    return {
      articlesCount: [],
      loading: true,
    }
  },
  async fetch() {
    const tmp = await this.$strapi.find('authors', {
      slug: this.author.slug,
    })

    this.articlesCount = tmp[0].articles.length
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
  }
}
</style>
