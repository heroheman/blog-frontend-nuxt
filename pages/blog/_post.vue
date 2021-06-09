<template>
  <main class="w-full sm:max-w-3xl article-single">
    <!-- <SocialHead -->
    <!--   :title="this.article.title" -->
    <!--   :description="mountain.description" -->
    <!--   :image="mountain.image" -->
    <!-- /> -->
    <article-view v-if="articles.length" detail :post="articles[0]" />
    <!-- <article-view-music detail v-else :blog-post="post" /> -->
    <div v-else>
      <loading />
    </div>
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
          hid: 'description_post',
          name: 'description',
          content: this.articles.length ? this.articles[0].description : '',
        },
        {
          hid: 'og:title_post',
          property: 'og:title_post',
          content: this.articles.length ? this.articles[0].title : '',
        },
        {
          hid: 'og:description_post',
          property: 'og:description',
          content: this.articles.length ? this.articles[0].description : '',
        },
        {
          hid: 'og:image_post',
          property: 'og:image',
          content:
            this.articles.length && this.articles[0].cover !== null
              ? this.articles[0].cover.url
              : '',
        },
        {
          hid: 'twitter:title_post',
          name: 'twitter:title',
          content: this.articles.length ? this.articles[0].title : '',
        },
        {
          hid: 'twitter:description_post',
          name: 'twitter:description',
          content: this.articles.length ? this.articles[0].description : '',
        },
        {
          hid: 'twitter:image_post',
          property: 'twitter:image',
          content:
            this.articles.length && this.articles[0].cover !== null
              ? this.articles[0].cover.url
              : '',
        },
      ],
    }
  },
  methods: {
    formatDate,
  },
}
</script>
