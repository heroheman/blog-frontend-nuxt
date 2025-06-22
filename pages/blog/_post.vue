<template>
  <main class="w-full article-single">
    <article-view v-if="objIsNotEmpty(article)" detail :post="article[0]" />
    <!-- <article-view-music detail v-else :blog-post="post" /> -->
    <div v-else>
      <loading />
    </div>
  </main>
</template>

<script>
import {
  formatDate,
  objIsNotEmpty,
  createExcerptFromText,
} from '@/utils/helper.js'

export default {
  name: 'ArticleItem',
  data() {
    return {
      article: [],
    }
  },
  async fetch() {
    const payload = await this.$strapi.find('articles', {
      populate: '*',
      filters: {
        slug: {
          $eq: this.$route.params.post,
        },
      },
    })
    this.article = payload.data
  },
  fetchOnServer: true,
  head() {
    // const article = this.article[0]

    return {
      title: this.article.length ? this.article[0].title : '',
      meta: [
        {
          hid: 'description_post',
          name: 'description',
          content: this.article.length
            ? `${
                this.article[0].description
              } - ${createExcerptFromText(this.article[0].body, 30)}`
            : '',
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
          content: this.article.length
            ? `${
                this.article[0].description
              } - ${createExcerptFromText(this.article[0].body, 30)}`
            : '',
        },
        {
          hid: 'og:image_post',
          property: 'og:image',
          content:
            this.article.length &&
            this.article[0].cover !== undefined &&
            this.article[0].cover.data !== null &&
            this.article[0].cover !== null
              ? this.article[0].cover.data.formats.medium
                ? this.article[0].cover.data.formats
                    .medium.url
                : this.article[0].cover.data.formats
                    .thumbnail.url
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
          content: this.article.length
            ? `${
                this.article[0].description
              } - ${createExcerptFromText(this.article[0].body, 30)}`
            : '',
        },
        {
          hid: 'twitter:image_post',
          property: 'twitter:image',
          content:
            this.article.length &&
            this.article[0].cover !== undefined &&
            this.article[0].cover.data !== null &&
            this.article[0].cover !== null
              ? this.article[0].cover.data.formats.medium
                ? this.article[0].cover.data.formats.medium.url
                : this.article[0].cover.data.formats.thumbnail.url
              : '',
        },
      ],
    }
  },
  methods: {
    formatDate,
    objIsNotEmpty,
    createExcerptFromText,
  },
}
</script>
