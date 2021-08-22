<template>
  <ul class="internal-linking">
    <li v-if="articlesCount > 1">
      <em>Autor:</em>
      <nuxt-link :to="`/author/${author.slug}`">{{ author.name }}</nuxt-link>
    </li>
    <li v-if="series.length">
      <em>| Buchreihe:</em>
      <nuxt-link v-for="(s, i) in series" :key="i" :to="`/series/${s.slug}`">
        {{ s.title }}
      </nuxt-link>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'Author',
  props: {
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
