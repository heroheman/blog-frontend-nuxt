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
import { formatDate, objIsNotEmpty } from '@/utils/helper.js'

export default {
  name: 'ArticleItem',
  data() {
    return {
      article: [],
    }
  },
  // async fetch() {
  // const url = `https://svl.florenz.dev/api/pages?filters[slug][$eq]=${this.$route.params.slug}&populate=*`
  // const tmp = await this.$axios.$get(url)
  // this.article = tmp.data[0].attributes
  // },
  async fetch() {
    const payload = await this.$strapi.find('articles', {
      populate: 'deep,3',
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
    // const article = this.article[0].attributes

    return {
      title: this.article.length ? this.article[0].attributes.title : '',
      meta: [
        {
          hid: 'description_post',
          name: 'description',
          content: this.article.length
            ? this.article[0].attributes.description
            : '',
        },
        {
          hid: 'tags_post',
          name: 'keywords',
          content: this.article.length ? this.article[0].attributes.tags : '',
        },
        {
          hid: 'og:title_post',
          property: 'og:title_post',
          content: this.article.length ? this.article[0].attributes.title : '',
        },
        {
          hid: 'og:description_post',
          property: 'og:description',
          content: this.article.length
            ? this.article[0].attributes.description
            : '',
        },
        {
          hid: 'og:image_post',
          property: 'og:image',
          content:
            this.article.length &&
            this.article[0].attributes.cover !== undefined &&
            this.article[0].attributes.cover.data !== null &&
            this.article[0].attributes.cover !== null
              ? this.article[0].attributes.cover.data.attributes.formats.medium
                ? this.article[0].attributes.cover.data.attributes.formats
                    .medium.url
                : this.article[0].attributes.cover.data.attributes.formats
                    .thumbnail.url
              : '',
        },
        {
          hid: 'twitter:title_post',
          name: 'twitter:title',
          content: this.article.length ? this.article[0].attributes.title : '',
        },
        {
          hid: 'twitter:description_post',
          name: 'twitter:description',
          content: this.article.length
            ? this.article[0].attributes.description
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
              ? this.article[0].cover.data.attributes.formats.medium
                ? this.article[0].cover.data.attributes.formats.medium.url
                : this.article[0].cover.data.attributes.formats.thumbnail.url
              : '',
        },
      ],
    }
  },
  methods: {
    formatDate,
    objIsNotEmpty,
  },
}
</script>
