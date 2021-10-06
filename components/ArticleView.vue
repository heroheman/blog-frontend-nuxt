<template>
  <article
    role="article"
    class="text-left articleview-main"
    :class="{ 'articleview--detail': detail }"
    v-if="post !== undefined"
  >
    <div class="flex flex-col mb-4">
      <!-- Startpage -->
      <template v-if="!detail">
        <div>
          <h6 v-if="post.display_published_date" class="mb-8 date">
            {{ formatDate(post.display_published_date) }}
          </h6>
        </div>

        <nuxt-link v-if="!detail" :to="`/blog/${post.slug}`">
          <h2 class="article-title title">
            {{ post.title }}
          </h2>
        </nuxt-link>
      </template>

      <!-- Articleview -->
      <template v-else>
        <h2 class="mb-8 italic article-title title">
          {{ post.title }}
        </h2>

        <div>
          <internal-book-linking
            :date="post.display_published_date"
            :author="post.author"
            :series="post.bookseries"
            :bookgenre="post.genre_books"
          />
        </div>
      </template>
    </div>

    <div
      class="relative mb-4 article-text lg:max-w-3xl"
      v-html="$md.render(parsedBody)"
    />

    <song
      v-if="!!songs"
      :songs="songs"
      class="mt-8 mb-4 article-text lg:max-w-3xl"
    />

    <rating v-if="!!rating" class="w-full mb-8" :rating="rating.ratingnumber" />

    <advertisement
      v-if="detail && !!advertisement"
      class="w-full mb-8"
      :ad-data="advertisement"
    />
  </article>
</template>

<script>
/* eslint-disable */
import { formatDate } from '@/utils/helper.js'
export default {
  name: 'ArticleView',
  props: {
    post: {
      type: Object,
      default: () => {},
    },
    detail: {
      type: [Boolean],
      default: false,
    },
  },
  computed: {
    parsedBody() {
      // const imageRegex =
      //  /!\[[^\]]*\]\((?<filename>.*?)(?=\"|\))(?<optionalpart>\".*\")?\)/g
      var imgUrlRegex = /https?:\/\/.*\.(?:png|jpg|gif)/i

      return this.post.body.replace(imgUrlRegex, function (a, b, c) {
        return (
          'https://res.cloudinary.com/dlsll9dkn/image/fetch/c_limit,w_768,f_auto,q_auto:low/' +
          a
        )
      })
    },
    rating() {
      if (this.post.additional.length) {
        return this.post.additional.filter(
          (addi) => addi.__component === 'content.rating'
        )[0]
      } else {
        return false
      }
    },
    songs() {
      if (this.post.additional.length) {
        return this.post.additional.filter(
          (addi) => addi.__component === 'content.track'
        )
      } else {
        return false
      }
    },
    advertisement() {
      if (this.post.additional.length) {
        return this.post.additional.filter(
          (addi) => addi.__component === 'content.advertisement'
        )[0]
      } else {
        return false
      }
    },
    bodyText() {
      const text = this.post.body.split('<!--more-->')
      return text
    },
  },
  methods: {
    formatDate,
  },
}
</script>

<style lang="postcss">
.articleview--detail {
  margin-top: 2.5rem !important;
}

.article-text {
  h3,
  h4,
  h5,
  h6 {
    font-size: 1.75rem;
    font-style: italic;
  }
}
</style>
