<template>
  <main class="w-full sm:max-w-3xl article-single">
    <!-- <SocialHead -->
    <!--   :title="this.post.title" -->
    <!--   :description="mountain.description" -->
    <!--   :image="mountain.image" -->
    <!-- /> -->
    <article-view detail :post="posts[0]" />
    <!-- <article-view-music detail v-else :blog-post="post" /> -->
  </main>
</template>

<script>
import { formatDate } from '@/utils/helper.js'
import { postQuery } from '@/graphql/postsQuery'

export default {
  name: 'Article',
  data() {
    return {
      posts: [],
    }
  },
  apollo: {
    posts: {
      prefetch: true,
      query: postQuery,
      variables() {
        return {
          slug: this.$route.params.post.toString(),
        }
      },
    },
  },
  head() {
    return {
      title: this.posts.length ? this.posts[0].title : '',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.posts.length ? this.posts[0].description : '',
        },
        // Open Graph
        {
          hid: 'og:title',
          property: 'og:title',
          content: this.posts.length ? this.posts[0].title : '',
        },
        {
          hid: 'og:description',
          property: 'og:description',
          content: this.posts.length ? this.posts[0].description : '',
        },
        {
          hid: 'og:image',
          property: 'og:image',
          content: this.posts.length ? this.posts[0].cover_image : '',
        },
        // Twitter Card
        {
          hid: 'twitter:title',
          name: 'twitter:title',
          content: this.posts.length ? this.posts[0].title : '',
        },
        {
          hid: 'twitter:description',
          name: 'twitter:description',
          content: this.posts.length ? this.posts[0].description : '',
        },
        {
          hid: 'twitter:image',
          property: 'twitter:image',
          content: this.posts.length ? this.posts[0].cover_image : '',
        },
      ],
    }
  },
  methods: {
    formatDate,
  },
}
</script>
