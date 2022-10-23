<template>
  <main class="w-full sm:max-w-3xl article-single">
    <div v-if="pages.length">
      <article role="article" class="text-left articleview-main">
        <div class="flex flex-col mb-4">
          <div>
            <h6 class="date">
              {{ content.description }}
            </h6>
          </div>

          <h2 class="article-title title">
            {{ content.title }}
          </h2>

          <div class="relative" v-html="$md.render(content.body)" />
        </div>
      </article>
    </div>
    <div v-else>
      <h2>404 and stuff</h2>
    </div>
  </main>
</template>

<script>
import { formatDate } from '@/utils/helper.js'

export default {
  name: 'PageComponent',
  data() {
    return {
      pages: [],
    }
  },
  async fetch() {
    // this.pages = await this.$strapi.find('pages', {
    //   slug: this.$route.params.slug.toString(),
    // })
    const payload = await this.$strapi.find('pages', {
      filters: {
        slug: {
          $eq: this.$route.params.slug.toString(),
        },
      },
    })
    this.pages = payload.data
  },
  computed: {
    content() {
      return this.pages[0].attributes
    },
  },
  fetchOnServer: true,
  methods: {
    formatDate,
  },
}
</script>
