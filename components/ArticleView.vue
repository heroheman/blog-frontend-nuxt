<!-- eslint-disable vue/no-v-html -->
<template>
  <article
    v-if="post !== undefined"
    role="article"
    class="text-left articleview-main h-entry"
    :class="{ 'articleview--detail': detail }"
  >
    <div class="flex flex-col mb-4">
      <!-- Startpage -->
      <template v-if="!detail">
        <div>
          <h6 v-if="post.display_published_date" class="mb-8 date">
            {{ formatDate(post.display_published_date) }}
          </h6>
        </div>

        <nuxt-link
          v-if="!detail"
          :to="`/blog/${post.slug}`"
          class="unami--click--index-article-title"
        >
          <h2 class="article-title title mb-0">
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
      class="relative mb-4 article-text lg:max-w-3xl e-content"
      :class="[getRatingClass]"
      v-html="renderedBody"
    />

    <div v-if="!detail && hasExcerpt">
      <nuxt-link
        class="block p-3 border border-black border-solid rounded btn md:w-auto md:inline-block unami--click--index-article-readmore mb-4"
        :to="`/blog/${post.slug}`"
        data-umami-event="article-read-more"
        :data-umami-event-article="post.title"
      >
        Weiterlesen
      </nuxt-link>
      <div>
        <internal-book-linking
          :date="post.display_published_date"
          :author="post.author"
          :series="post.bookseries"
          :bookgenre="post.genre_books"
        />
      </div>
    </div>

    <!-- : Single Song List -->
    <song
      v-if="!!songs"
      :songs="songs"
      class="mt-8 mb-4 article-text lg:max-w-3xl"
    />

    <!-- Containered Song List -->
    <song
      v-if="!!songsWrapped"
      :songs="songsWrapped[0].songs"
      class="mt-8 mb-4 article-text lg:max-w-3xl"
    />

    <!-- <rating v-if="!!rating" class="w-full mb-8" :rating="rating.ratingnumber" /> -->

    <!-- Single Book List (Legacy) -->
    <!-- <widget-open-library
      v-if="detail && !!isbn"
      :bookMeta="isbn"
      class="mt-8 mb-4 article-text lg:max-w-3xl"
    /> -->

    <!-- Containered Book List -->
    <widget-open-library-list
      v-if="detail && !!isbnWrapped"
      :books="isbnWrapped[0].bookmeta"
      class="mt-8 mb-4 article-text lg:max-w-3xl"
    />

    <!-- <advertisement
      v-if="detail && !!advertisement"
      class="w-full mt-16 mb-8 lg:max-w-3xl"
      :ad-data="advertisement"
    /> -->
    <!-- webmention -->
    <a
      class="u-bridgy-fed"
      href="https://fed.brid.gy/"
      hidden="from-humans"
    ></a>
  </article>
</template>

<script setup>
import { computed } from 'vue'
import { marked } from 'marked'
import { formatDate, hasProperty } from '@/utils/helper.js'

const props = defineProps({
  post: {
    type: Object,
    default: () => {},
  },
  detail: {
    type: Boolean,
    default: false,
  },
})

const hasExcerpt = computed(() => {
  const dividerStr = '<!--more-->'
  const content = props.post.body.split(dividerStr)
  return content.length > 1
})

const parsedBody = computed(() => {
  const imgUrlRegex = /https?:\/\/.*\.(?:png|jpg|gif)/i
  const dividerStr = '<!--more-->'
  const cloudinaryUrl = 'https://res.cloudinary.com/dlsll9dkn/image/fetch/c_limit,w_768,f_auto,q_auto:low/'

  let content
  const tmp = props.post.body.split(dividerStr)
  if (!props.detail) {
    if (tmp.length > 1) {
      content = tmp[0]
    } else {
      content = tmp.join('')
    }
  } else {
    content = tmp.join('')
  }

  content = content.replace(imgUrlRegex, function (a, b, c) {
    return cloudinaryUrl + a
  })

  return content
})

const renderedBody = computed(() => {
  return marked(parsedBody.value)
})

const rating = computed(() => {
  if (hasProperty(props.post, 'additional') && props.post.additional.length) {
    return props.post.additional.filter(
      (addi) => addi.__component === 'content.rating'
    )[0]
  }
  return false
})

const getRatingClass = computed(() => {
  if (rating.value) {
    if (hasExcerpt.value && !props.detail) {
      return 'no-rating'
    } else {
      return `star-rating star-rating-${rating.value.ratingnumber}`
    }
  } else {
    return 'no-rating'
  }
})

const isbnWrapped = computed(() => {
  if (hasProperty(props.post, 'additional') && props.post.additional.length) {
    if (hasExcerpt.value && !props.detail) {
      return false
    } else if (
      props.post.additional.filter(
        (addi) => addi.__component === 'external-api.book-container'
      ).length
    ) {
      return props.post.additional.filter(
        (addi) => addi.__component === 'external-api.book-container'
      )
    }
  }
  return false
})

const songs = computed(() => {
  if (hasProperty(props.post, 'additional') && props.post.additional.length) {
    if (hasExcerpt.value && !props.detail) {
      return false
    } else {
      return props.post.additional.filter(
        (addi) => addi.__component === 'content.track'
      )
    }
  }
  return false
})

const songsWrapped = computed(() => {
  if (hasProperty(props.post, 'additional') && props.post.additional.length) {
    if (hasExcerpt.value && !props.detail) {
      return false
    } else if (
      props.post.additional.filter(
        (addi) => addi.__component === 'content.track-container'
      ).length
    ) {
      return props.post.additional.filter(
        (addi) => addi.__component === 'content.track-container'
      )
    }
  }
  return false
})

const advertisement = computed(() => {
  if (hasProperty(props.post, 'additional') && props.post.additional.length) {
    return props.post.additional.filter(
      (addi) => addi.__component === 'content.advertisement'
    )[0]
  }
  return false
})

const bodyText = computed(() => {
  const text = props.post.body.split('<!--more-->')
  return text
})
</script>

<style lang="postcss">
.articleview--detail {
  margin-top: 2.5rem !important;
}
.star-rating {
  > p:last-of-type::after {
    @apply block mt-4;
    color: #ddb63e;
  }
  &-1 {
    > p:last-of-type::after {
      content: '★ ☆ ☆ ☆ ☆';
    }
  }
  &-2 {
    > p:last-of-type::after {
      content: '★ ★ ☆ ☆ ☆';
    }
  }
  &-3 {
    > p:last-of-type::after {
      content: '★ ★ ★ ☆ ☆';
    }
  }
  &-4 {
    > p:last-of-type::after {
      content: '★ ★ ★ ★ ☆';
    }
  }
  &-5 {
    > p:last-of-type::after {
      content: '★ ★ ★ ★ ★';
    }
  }
}
</style>
