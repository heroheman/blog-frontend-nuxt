<template>
  <main v-if="articles" class="w-full main">
    <div v-if="hasTag" class="mb-8 text-left">
      <nuxt-link class="items-start mb-8" to="/blog"
        >&larr; Zurück zu allen Beiträgen</nuxt-link
      >
      &mdash; Alle <strong>{{ $route.query.tag }}</strong> Artikel
    </div>
    <article-index v-if="items" :articles="items" />
  </main>
</template>

<script>
import { formatDate } from '@/utils/helper.js'

export default {
  name: 'BlogIndex',
  data() {
    return {
      articles: [],
      hasTag: false,
    }
  },
  async fetch() {
    this.articles = await this.$strapi.find('articles', {
      sort: 'display_published_date:DESC',
    }).data
  },
  computed: {
    items() {
      if (this.hasTag) {
        return this.filteredArticles
      } else {
        return this.articles
      }
    },
    filteredArticles() {
      return this.articles.filter((post) => {
        const tags = post.tags.split(',')
        return tags.includes((p) => {
          return p === this.$route.query.tag
        })
      })
    },
  },
  fetchOnServer: true,
  watch: {
    '$route.query.tag'() {
      if (this.$route.query.tag) {
        this.hasTag = true
      } else {
        this.hasTag = false
      }
    },
  },
  mounted() {
    if (this.$route.query.tag) {
      this.hasTag = true
    } else {
      this.hasTag = false
    }
  },
  methods: {
    formatDate,
  },
}
</script>

<style lang="postcss" scoped>
.listdate {
  font-weight: 400;
  min-width: 100px;
}
</style>
