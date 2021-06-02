<template>
  <main class="w-full sm:max-w-3xl article-single">
    <div v-if="pages.length">
      <article role="article" class="text-left articleview-main">
        <div class="flex flex-col mb-4">
          <h2 class="article-title title">
            {{ content.title }}
          </h2>

          <div class="text-center">
            <h6 class="date">
              {{ content.description }}
            </h6>
          </div>

          <div class="relative" v-html="$md.render(content.body)" />
        </div>
      </article>
    </div>
    <div v-else>
      <h2>404 und so</h2>
    </div>
  </main>
</template>

<script>
import { formatDate } from '@/utils/helper.js'
import { pagesQuery } from '@/graphql/pagesQuery'

export default {
  name: 'Page',
  data() {
    return {
      pages: [],
    }
  },
  computed: {
    content() {
      return this.pages[0]
    },
  },
  apollo: {
    pages: {
      prefetch: true,
      query: pagesQuery,
      variables() {
        return {
          slug: this.$route.params.slug.toString(),
        }
      },
    },
  },
  methods: {
    formatDate,
  },
}
</script>
