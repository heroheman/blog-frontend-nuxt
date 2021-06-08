<template>
  <main class="w-full sm:max-w-3xl article-single">
    <!-- <SocialHead -->
    <!--   :title="this.article.title" -->
    <!--   :description="mountain.description" -->
    <!--   :image="mountain.image" -->
    <!-- /> -->
    <article-view detail :post="articles[0]" />
    <!-- <article-view-music detail v-else :blog-post="post" /> -->
  </main>
</template>

<script>
import { formatDate } from '@/utils/helper.js'
import { articleQuery } from '@/graphql/articlesQuery'

export default {
  name: 'Article',
  data() {
    return {
      articles: [],
    }
  },
  apollo: {
    articles: {
      prefetch: true,
      query: articleQuery,
      variables() {
        return {
          slug: this.$route.params.post.toString(),
        }
      },
    },
  },
  head() {
    return {
      title: this.articles.length ? this.articles[0].title : '',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.articles.length ? this.articles[0].description : '',
        },
        // Open Graph
        {
          hid: 'og:title',
          property: 'og:title',
          content: this.articles.length ? this.articles[0].title : '',
        },
        {
          hid: 'og:description',
          property: 'og:description',
          content: this.articles.length ? this.articles[0].description : '',
        },
        {
          hid: 'og:image',
          property: 'og:image',
          content: this.articles.length ? this.articles[0].cover_image : '',
        },
        // Twitter Card
        {
          hid: 'twitter:title',
          name: 'twitter:title',
          content: this.articles.length ? this.articles[0].title : '',
        },
        {
          hid: 'twitter:description',
          name: 'twitter:description',
          content: this.articles.length ? this.articles[0].description : '',
        },
        {
          hid: 'twitter:image',
          property: 'twitter:image',
          content: this.articles.length ? this.articles[0].cover_image : '',
        },
      ],
    }
  },
  methods: {
    formatDate,
  },
}
</script>
