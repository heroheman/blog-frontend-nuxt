<!-- eslint-disable vue/no-v-html -->
<template>
  <article
    v-if="post !== undefined"
    role="article"
    class="articleview h-entry"
    :class="{ 'articleview--detail': detail }"
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
        class="article-content max-w-none text-gray-700 leading-relaxed e-content"
        :class="[getRatingClass]"
        v-html="renderedBody"
      />

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
        <h1 class="text-3xl sm:text-4xl lg:text-5xl font-head font-normal leading-tight text-gray-900 mb-6 sm:mb-8">
          {{ post.title }}
        </h1>

        <internal-book-linking
          :date="post.display_published_date"
          :author="post.author"
          :series="post.bookseries"
          :bookgenre="post.genre_books"
        />
      </header>

      <div
        class="article-content max-w-none text-gray-700 leading-relaxed e-content"
        :class="[getRatingClass]"
        v-html="renderedBody"
      />
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

<style lang="postcss">
.articleview {
  &--detail {
    @apply mt-8 sm:mt-12;
  }
}

.star-rating {
  > p:last-of-type::after {
    @apply block mt-6 text-2xl;
    color: #fbbf24;
    letter-spacing: 0.1em;
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

/* Article content styles for readable typography */
.article-content {
  @apply text-gray-700 leading-relaxed;
  font-size: 1.125rem;
  line-height: 1.8;

  h1, h2, h3, h4, h5, h6 {
    @apply font-head font-normal text-gray-900 mt-8 mb-4;
    line-height: 1.3;
    letter-spacing: -0.025em;
  }

  h1 { @apply text-3xl sm:text-4xl mt-12 mb-6; }
  h2 { @apply text-2xl sm:text-3xl mt-10 mb-5; }
  h3 { @apply text-xl sm:text-2xl mt-8 mb-4; }
  h4 { @apply text-lg sm:text-xl mt-6 mb-3; }
  h5 { @apply text-base sm:text-lg mt-6 mb-3; }
  h6 { @apply text-sm sm:text-base mt-4 mb-2; }

  p {
    @apply mb-6 text-gray-700;
    line-height: 1.8;
  }

  a {
    @apply text-gray-900 underline decoration-gray-300 underline-offset-2 transition-colors duration-200;

    &:hover {
      @apply text-gray-600 decoration-gray-500;
    }
  }

  strong {
    @apply font-semibold text-gray-900;
  }

  em {
    @apply italic;
  }

  blockquote {
    @apply border-l-4 border-gray-200 pl-6 italic text-gray-600 my-8 bg-gray-50 py-4;

    p {
      @apply mb-0;
    }
  }

  ul, ol {
    @apply my-6 space-y-2 pl-6;
  }

  ul {
    @apply list-disc;
  }

  ol {
    @apply list-decimal;
  }

  li {
    @apply text-gray-700 leading-relaxed;

    p {
      @apply mb-2;
    }
  }

  img {
    @apply rounded-lg my-8 w-full;
    max-width: 100%;
    height: auto;
  }

  figure {
    @apply my-8;

    figcaption {
      @apply text-sm text-gray-500 text-center mt-2 italic;
    }
  }

  code {
    @apply bg-gray-100 px-2 py-1 rounded text-sm font-mono text-gray-800;
    font-size: 0.875em;
  }

  pre {
    @apply bg-gray-100 p-4 rounded-lg overflow-x-auto my-6;

    code {
      @apply bg-transparent p-0 text-gray-800;
    }
  }

  hr {
    @apply border-0 border-t border-gray-200 my-8;
  }

  table {
    @apply w-full my-6 border-collapse;

    th, td {
      @apply border border-gray-200 px-4 py-2 text-left;
    }

    th {
      @apply bg-gray-50 font-semibold;
    }
  }
}

/* Mobile adjustments */
@media (max-width: 640px) {
  .article-content {
    font-size: 1rem;
    line-height: 1.7;

    h1 { @apply text-2xl mt-8 mb-4; }
    h2 { @apply text-xl mt-6 mb-4; }
    h3 { @apply text-lg mt-6 mb-3; }
    h4 { @apply text-base mt-4 mb-3; }

    blockquote {
      @apply pl-4 my-6;
    }

    ul, ol {
      @apply pl-4;
    }
  }
}
</style>
