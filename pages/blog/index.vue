<template>
  <main v-if="articles" class="w-full main">
    <div v-if="hasTag" class="mb-8 text-left">
      <nuxt-link class="items-start mb-8" to="/blog"
        >&larr; Zurück zu allen Beiträgen</nuxt-link
      >
      &mdash; Alle <strong>{{ $route.query.tag }}</strong> Artikel
    </div>
    <ul class="flex flex-col md:pt-32 articles">
      <li
        v-for="(blogPost, index) in items"
        :key="index"
        class="flex flex-col border-b border-gray-200 border-solid articles"
      >
        <div class="flex flex-wrap text-left align-baseline font-meta">
          <div class="w-full pr-2 mb-2 sm:w-full article-title font-meta">
            <span
              v-if="blogPost.date"
              class="inline-block mb-2 text-sm text-left listdate"
            >
              {{ formatDate(blogPost.date, true) }}
              <span class="hidden mx-1 sm:inline-block"> &ndash; </span>
            </span>

            <nuxt-link
              :to="`blog/${blogPost.slug}`"
              class="inline-block mb-2 article article--clickable"
            >
              {{ blogPost.title }}
            </nuxt-link>
            <p class="text-sm">
              {{ blogPost.description }}
            </p>
          </div>
          <tags
            class="w-full mb-2 md:self-end sm:w-full md:w-auto"
            :tags="blogPost.Tags"
          />
        </div>
      </li>
    </ul>
  </main>
</template>

<script>
import { formatDate } from '@/utils/helper.js'
import { articlesQuery } from '@/graphql/articlesQuery'

export default {
  name: 'BlogIndex',
  data() {
    return {
      articles: [],
      hasTag: false,
    }
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
        const tags = post.Tags.split(',')
        return tags.some((p) => {
          console.log(p, this.$route.query.tag)
          return p === this.$route.query.tag
        })
      })
    },
  },
  apollo: {
    articles: {
      prefetch: true,
      query: articlesQuery,
    },
  },
  methods: {
    formatDate,
  },
  mounted() {
    if (this.$route.query.tag) {
      this.hasTag = true
    } else {
      this.hasTag = false
    }
  },
  watch: {
    '$route.query.tag'() {
      if (this.$route.query.tag) {
        this.hasTag = true
      } else {
        this.hasTag = false
      }
    },
  },
}
</script>

<style lang="postcss" scoped>
.listdate {
  font-weight: 400;
  min-width: 100px;
}
</style>
