<template>
  <article role="article" class="text-left articleview-main">
    <!-- {{ blogPost }} -->
    <div class="flex flex-col mb-4">
      <nuxt-link
        v-if="!detail"
        :to="`blog/${blogPost.slug}`"
        class="text-center"
      >
        <h2 class="article-title title">
          {{ blogPost.title }}
        </h2>
      </nuxt-link>

      <h2 v-else class="article-title title">
        {{ blogPost.title }}
      </h2>

      <!-- <div class="text-center"> -->
      <!--   <h6 v-if="blogPost.date" class="date"> -->
      <!--     {{ formatDate(blogPost.date) }} -->
      <!--   </h6> -->
      <!-- </div> -->
    </div>

    <!-- <div v-if="detail" class="relative" v-html="$md.render(blogPost.body)" /> -->
    <!-- <div v-else class="relative" v-html="$md.render(bodyText[0])" /> -->

    <!-- <rating -->
    <!--   class="w-full" -->
    <!--   v-if="blogPost.isReview && blogPost.rating && !blogPost.customRating" -->
    <!--   :rating="blogPost.rating" -->
    <!-- /> -->
    <!-- <rating -->
    <!--   v-else-if="blogPost.customRating" -->
    <!--   :rating="blogPost.rating" -->
    <!--   custom-rating -->
    <!--   :custom-rating-unit="blogPost.customRatingUnit" -->
    <!-- /> -->

    <!-- <tags v-if="detail" class="mt-8" :tags="blogPost.tags" /> -->

    <nuxt-link
      v-if="!detail && bodyText.length > 1"
      :to="`blog/${blogPost.slug}`"
      class="
        inline-block
        px-6
        py-2
        my-4
        rounded-sm
        bg-primary-500
        text-monochrome-999
      "
    >
      Weiterlesen
    </nuxt-link>
  </article>
</template>

<script>
import { formatDate } from '@/utils/helper.js'
export default {
  name: 'ArticleView',
  props: {
    blogPost: {
      type: Object,
      default: () => {},
    },
    detail: {
      type: [Boolean],
      default: false,
    },
  },
  computed: {
    bodyText() {
      const text = this.blogPost.body.split('<!--more-->')
      return text
    },
  },
  methods: {
    formatDate,
  },
}
</script>
