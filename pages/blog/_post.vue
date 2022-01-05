<template>
  <main class="w-full article-single">
    <article-view v-if="article.length" detail :post="article[0]" />
    <!-- <article-view-music detail v-else :blog-post="post" /> -->
    <div v-else>
      <loading />
    </div>
  </main>
</template>

<script>
import { formatDate } from '@/utils/helper.js'

export default {
  name: 'ArticleItem',
  data() {
    return {
      article: [],
    }
  },
  async fetch() {
    this.article = await this.$strapi.$articles.find({
      slug: this.$route.params.post,
    })
  },
  fetchOnServer: true,
  head() {
    return {
      title: this.article.length ? this.article[0].title : '',
      meta: [
        {
          hid: 'description_post',
          name: 'description',
          content: this.article.length ? this.article[0].description : '',
        },
        {
          hid: 'tags_post',
          name: 'keywords',
          content: this.article.length ? this.article[0].tags : '',
        },
        {
          hid: 'og:title_post',
          property: 'og:title_post',
          content: this.article.length ? this.article[0].title : '',
        },
        {
          hid: 'og:description_post',
          property: 'og:description',
          content: this.article.length ? this.article[0].description : '',
        },
        {
          hid: 'og:image_post',
          property: 'og:image',
          content:
            this.article.length &&
            this.article[0].cover !== undefined &&
            this.article[0].cover !== null
              ? this.article[0].cover.formats.medium
                ? this.article[0].cover.formats.medium.url
                : this.article[0].cover.formats.thumbnail.url
              : '',
        },
        {
          hid: 'twitter:title_post',
          name: 'twitter:title',
          content: this.article.length ? this.article[0].title : '',
        },
        {
          hid: 'twitter:description_post',
          name: 'twitter:description',
          content: this.article.length ? this.article[0].description : '',
        },
        {
          hid: 'twitter:image_post',
          property: 'twitter:image',
          content:
            this.article.length &&
            this.article[0].cover !== undefined &&
            this.article[0].cover !== null
              ? this.article[0].cover.formats.medium
                ? this.article[0].cover.formats.medium.url
                : this.article[0].cover.formats.thumbnail.url
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
