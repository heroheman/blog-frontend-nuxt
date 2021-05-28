<template>
  <main v-if="blogPosts" class="w-full sm:max-w-3xl">
    <div
      v-for="(blogPost, index) in blogPosts.posts"
      :key="index"
      class="pb-8 border-b border-gray-300 border-solid"
    >
      <!-- {{ blogPost }} -->
      <article-view
        v-if="blogPost.category !== 'Heavy Rotation'"
        :blog-post="blogPost"
      />
    </div>
  </main>
</template>

<script>
export default {
  head() {
    return {
      script: [],
    }
  },
  data() {
    return {
      blogPosts: [],
    }
  },
  async fetch() {
    const tmp = await this.$strapi.graphql({
      query: `
        query {
          posts {
            id
            slug
            title
            description
            body
            cover {
              name
              alternativeText
              caption
              width
              height
              previewUrl
              url
            }
            category {
              Title
              slug
            }
            display_published_date
            published_at
          }
        }
      `,
    })
    const tmp2 = tmp.posts.sort(
      (a, b) =>
        new Date(a.display_published_date).getTime() >
        new Date(b.display_published_date).getTime()
    )

    this.blogPosts = tmp2
  },
}
</script>

<style lang="postcss">
.articleview-main {
  @apply my-20;
}
</style>
