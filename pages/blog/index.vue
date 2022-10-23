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
    // TODO: Increase max Result list
    // https://forum.strapi.io/t/this-should-be-an-easy-one-how-do-i-get-strapi-query-to-return-all-entries-in-version-v4/21339
    const payload = await this.$strapi.find('articles', {
      populate: '*', // populate all relations';
      sort: 'display_published_date:DESC',
      pagination: {
        pageSize: 200,
      },
    })
    this.articles = payload.data
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
