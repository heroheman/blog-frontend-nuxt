<!-- eslint-disable vue/no-v-html -->
<template>
  <article
    v-if="post !== undefined"
    role="article"
    class="h-entry"
    :class="{ 'mt-8 sm:mt-12': detail }"
  >
    <!-- Startpage layout -->
    <template v-if="!detail">
      <header class="mb-6 sm:mb-8">
        <time
          v-if="post.display_published_date"
          class="block text-sm sm:text-base text-gray-500 font-meta mb-2 sm:mb-3"
          :datetime="post.display_published_date"
        >
          {{ formatDate(post.display_published_date) }}
        </time>

        <nuxt-link
          :to="`/blog/${post.slug}`"
          data-umami-event="index-click-article-title"
          :data-umami-event-title="post.title"
          :data-umami-event-url="`/blog/${post.slug}`"
          class="block group"
        >
          <h2 class="text-2xl sm:text-3xl lg:text-4xl font-head font-normal leading-tight text-gray-900 group-hover:text-gray-700 transition-colors duration-200">
            {{ post.title }}
          </h2>
        </nuxt-link>

        <internal-book-linking
          :date="post.display_published_date"
          :author="post.author"
          :series="post.bookseries"
          :bookgenre="post.genre_books"
        />
      </header>


      <div
        class="prose sm:prose-lg max-w-none e-content"
        v-html="renderedBody"
      />
      <Rating v-if="showRating" :rating="rating.ratingnumber" class="mt-6 block" />

      <footer v-if="hasExcerpt" class="mt-6 sm:mt-8 pt-6 sm:pt-8 border-t border-gray-100">
        <nuxt-link
          class="inline-flex items-center text-sm sm:text-base font-meta font-medium text-gray-900 hover:text-gray-600 transition-colors duration-200"
          :to="`/blog/${post.slug}`"
          data-umami-event="article-read-more"
          :data-umami-event-article="post.title"
        >
          Weiterlesen
          <svg class="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>
        </nuxt-link>
      </footer>
    </template>

    <!-- Detail page layout -->
    <template v-else>
      <header class="mb-8 sm:mb-12">
        <h2 class="text-3xl sm:text-4xl lg:text-5xl font-head font-normal leading-tight text-gray-900 mb-6 sm:mb-8">
          {{ post.title }}
        </h2>

      <!-- {{ post }} -->
        <internal-book-linking
          :date="post.display_published_date"
          :author="post.author"
          :series="post.bookseries"
          :bookgenre="post.genre_books"
        />
      </header>

      <div
        class="prose sm:prose-lg max-w-none e-content"
        v-html="renderedBody"
      />
      <Rating v-if="showRating" :rating="rating.ratingnumber" class="mt-6 block" />
    </template>

    <!-- Additional content -->
    <div v-if="detail || !hasExcerpt" class="mt-8 sm:mt-12 space-y-8">
      <!-- Songs -->
      <song
        v-if="!!songs"
        :songs="songs"
        class="article-content max-w-none"
      />

      <!-- Wrapped Songs -->
      <song
        v-if="!!songsWrapped"
        :songs="songsWrapped[0].songs"
        class="article-content max-w-none"
      />

      <!-- Books -->
      <ClientOnly>
        <widget-open-library-list
          v-if="detail && isbnWrapped && isbnWrapped.length > 0 && isbnWrapped[0].bookmeta"
          :books="isbnWrapped[0].bookmeta"
          class="article-content max-w-none"
        />
      </ClientOnly>
    </div>

    <!-- Webmention -->
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
import { formatDate, hasProperty } from '~/utils/helper'
import Rating from '~/components/Rating.vue'

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

const showRating = computed(() => {
  if (rating.value) {
    if (hasExcerpt.value && !props.detail) {
      return false
    }
    return true
  }
  return false
})

const isbnWrapped = computed(() => {
  if (hasProperty(props.post, 'additional') && props.post.additional.length) {
    if (hasExcerpt.value && !props.detail) {
      return false
    } else {
      // Look for both book container types
      const bookComponents = props.post.additional.filter(
        (addi) => addi.__component === 'external-api.book-container' ||
                  addi.__component === 'external-api.open-library-isbn'
      )

      if (bookComponents.length) {
        // Transform components into a format that WidgetOpenLibraryList expects
        const transformedBooks = []

        bookComponents.forEach(component => {
          if (component.__component === 'external-api.open-library-isbn') {
            // Legacy components: wrap the ISBN data as individual book entries
            transformedBooks.push({
              __component: 'external-api.open-library-isbn',
              isbn: component.isbn,
              amazonRefUrl: component.amazonRefUrl,
              genialokalRefUrl: component.genialokalRefUrl,
              showAmazonRef: component.showAmazonRef,
              showGenialokalRef: component.showGenialokalRef
            })
          } else if (component.__component === 'external-api.book-container' && component.bookmeta) {
            // New container components: extract all books from bookmeta array
            component.bookmeta.forEach(book => {
              transformedBooks.push(book)
            })
          }
        })

        return transformedBooks.length > 0 ? [{ bookmeta: transformedBooks }] : false
      }
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
