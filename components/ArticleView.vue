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

      <!-- Footnotes section positioned after Rating -->
      <div
        v-if="footnotesSection && detail"
        class="footnotes-container mt-6"
        v-html="footnotesSection"
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

      <!-- Localization notice: link to English version -->
      <div
        v-if="englishLocalization"
        class="mb-8 rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-700 flex items-center gap-3"
      >
        <svg class="shrink-0 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 0 1 6.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
        </svg>
        <span>This article is also available in English: <nuxt-link :to="`/blog/en/${englishLocalization.slug}`" class="font-medium underline underline-offset-2 hover:text-gray-900 transition-colors">Read the English version</nuxt-link></span>
      </div>

      <!-- Backlink: German original version -->
      <div
        v-if="germanLocalization"
        class="mb-8 rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-700 flex items-center gap-3"
      >
        <svg class="shrink-0 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 0 1 6.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
        </svg>
        <span>This is the English version. Read the original: <nuxt-link :to="`/blog/${germanLocalization.slug}`" class="font-medium underline underline-offset-2 hover:text-gray-900 transition-colors">Deutsche Version</nuxt-link></span>
      </div>

      <div
        class="prose sm:prose-lg max-w-none e-content article-content"
        v-html="renderedBody"
      />
      <Rating v-if="showRating" :rating="rating.ratingnumber" class="mt-6 block" />

      <!-- Footnotes section positioned after Rating -->
      <div
        v-if="footnotesSection && detail"
        class="footnotes-container mt-6"
        v-html="footnotesSection"
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

  <!-- Lightbox -->
  <Teleport to="body">
    <Transition name="lightbox">
      <div
        v-if="isLightboxOpen"
        class="lightbox-overlay"
        :class="{ closing: isClosing }"
        @click.self="closeLightbox"
      >
        <!-- Close button -->
        <button
          class="lightbox-close"
          @click="closeLightbox"
          aria-label="Close lightbox"
        >
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <!-- Previous button -->
        <button
          v-if="lightboxImages.length > 1"
          class="lightbox-nav prev"
          :class="{ hidden: currentImageIndex === 0 }"
          @click="prevImage"
          aria-label="Previous image"
        >
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <!-- Image container -->
        <div class="lightbox-image-container">
          <img
            :src="lightboxImages[currentImageIndex]"
            :alt="`Image ${currentImageIndex + 1} of ${lightboxImages.length}`"
          >
        </div>

        <!-- Next button -->
        <button
          v-if="lightboxImages.length > 1"
          class="lightbox-nav next"
          :class="{ hidden: currentImageIndex === lightboxImages.length - 1 }"
          @click="nextImage"
          aria-label="Next image"
        >
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>
        </button>

        <!-- Counter -->
        <div v-if="lightboxImages.length > 1" class="lightbox-counter">
          {{ currentImageIndex + 1 }} / {{ lightboxImages.length }}
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { computed, ref, onMounted, onUnmounted, nextTick } from 'vue'
import { Marked } from 'marked'
import markedFootnote from 'marked-footnote'
import { formatDate, hasProperty } from '~/utils/helper'
import Rating from '~/components/Rating.vue'

// Create marked instance with footnote extension
const marked = new Marked()
  .use(markedFootnote({
    prefixId: 'footnote-',
    refMarkers: true, // Use square brackets around footnote references
    footnoteDivider: false, // We handle the divider with CSS
    sectionClass: 'footnotes', // Use your existing CSS class
    headingClass: 'sr-only'
  }))

// Counter for inline footnotes
let inlineFootnoteCounter = 0

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

// Lightbox state
const isLightboxOpen = ref(false)
const currentImageIndex = ref(0)
const lightboxImages = ref([])
const isClosing = ref(false)
const isMobile = ref(false)

// Mobile detection
const checkMobile = () => {
  if (process.client) {
    isMobile.value = window.innerWidth <= 768
  }
}

// Open lightbox
const openLightbox = (index) => {
  // On mobile, open image in new tab instead
  if (isMobile.value) {
    const imageUrl = lightboxImages.value[index]
    // Get original URL without cloudinary transformation
    const originalUrl = imageUrl.replace('https://res.cloudinary.com/dlsll9dkn/image/fetch/c_limit,w_768,f_auto,q_auto:low/', '')
    window.open(originalUrl, '_blank')
    return
  }

  currentImageIndex.value = index
  isLightboxOpen.value = true
  isClosing.value = false

  if (process.client) {
    document.body.classList.add('lightbox-open')
  }
}

// Close lightbox
const closeLightbox = () => {
  isClosing.value = true
  setTimeout(() => {
    isLightboxOpen.value = false
    isClosing.value = false
    if (process.client) {
      document.body.classList.remove('lightbox-open')
    }
  }, 300) // Match animation duration
}

// Navigate to next image
const nextImage = () => {
  if (currentImageIndex.value < lightboxImages.value.length - 1) {
    currentImageIndex.value++
  }
}

// Navigate to previous image
const prevImage = () => {
  if (currentImageIndex.value > 0) {
    currentImageIndex.value--
  }
}

// Keyboard navigation
const handleKeydown = (e) => {
  if (!isLightboxOpen.value) return

  if (e.key === 'Escape') {
    closeLightbox()
  } else if (e.key === 'ArrowRight') {
    nextImage()
  } else if (e.key === 'ArrowLeft') {
    prevImage()
  }
}

// Extract images from rendered content
const extractImages = () => {
  if (!process.client) return

  nextTick(() => {
    const articleContent = document.querySelector('.article-content')
    if (!articleContent) return

    const images = articleContent.querySelectorAll('p:has(> img) img')
    lightboxImages.value = Array.from(images).map(img => img.src)

    // Add click handlers to images
    images.forEach((img, index) => {
      img.style.cursor = 'zoom-in'
      img.addEventListener('click', (e) => {
        e.preventDefault()
        openLightbox(index)
      })
    })
  })
}

// Lifecycle hooks
onMounted(() => {
  checkMobile()
  extractImages()

  if (process.client) {
    window.addEventListener('keydown', handleKeydown)
    window.addEventListener('resize', checkMobile)
  }
})

onUnmounted(() => {
  if (process.client) {
    window.removeEventListener('keydown', handleKeydown)
    window.removeEventListener('resize', checkMobile)
    document.body.classList.remove('lightbox-open')
  }
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

  // Check if we need a partner link footnote
  let hasPartnerLink = false
  const partnerLinkRegex = /(https?:\/\/)?(www\.)?(amazon\.de|amzn\.to|tidd\.ly)/gi

  // Check if content contains Amazon or tidd.ly links
  if (partnerLinkRegex.test(content)) {
    hasPartnerLink = true
  }

  // Convert inline footnotes ^[text] to GFM footnote syntax
  inlineFootnoteCounter = 0
  const footnoteDefinitions = []

  content = content.replace(/\^\[([^\]]+)\]/g, (match, footnoteText) => {
    inlineFootnoteCounter++
    const footnoteId = `inline${inlineFootnoteCounter}`

    // Collect footnote definitions
    footnoteDefinitions.push(`[^${footnoteId}]: ${footnoteText}`)

    // Return the footnote reference
    return `[^${footnoteId}]`
  })

  // Add partner link footnotes to all partner links
  if (hasPartnerLink) {
    // Reset regex to find all matches
    partnerLinkRegex.lastIndex = 0

    // Replace partner links with footnote references in markdown links
    content = content.replace(/(\[([^\]]*)\]\()(https?:\/\/)?(www\.)?(amazon\.de|amzn\.to|tidd\.ly)([^)]*)\)/gi, (match, linkStart, linkText, protocol, www, domain, path) => {
      // Build the URL correctly, only add protocol if not present
      const fullUrl = protocol ? `${protocol}${www || ''}${domain}${path}` : `https://${www || ''}${domain}${path}`
      return `${linkStart}${fullUrl})[^partnerlink]`
    })

    // Also handle plain partner URLs that aren't in markdown link format
    content = content.replace(/(?<!\]\()(https?:\/\/)?(www\.)?(amazon\.de|amzn\.to|tidd\.ly)([^\s\)]*)/gi, (match, protocol, www, domain, path) => {
      // Build the URL correctly, only add protocol if not present
      const fullUrl = protocol ? `${protocol}${www || ''}${domain}${path}` : `https://${www || ''}${domain}${path}`
      return `${fullUrl}[^partnerlink]`
    })

    // Add the partner link footnote definition
    footnoteDefinitions.push('[^partnerlink]: Partnerlink')
  }

  // Add all footnote definitions at the end
  if (footnoteDefinitions.length > 0) {
    content += '\n\n' + footnoteDefinitions.join('\n\n')
  }

  return content
})

const renderedBody = computed(() => {
  let html = cachedHtml.value

  // Always remove footnotes section from the main content
  html = html.replace(/<section[^>]*class="[^"]*footnotes[^"]*"[^>]*>[\s\S]*?<\/section>/g, '')

  // Add Umami events to footnote reference links
  if (!props.detail) {
    // For index view: Add events for links to detail page footnotes
    html = html.replace(
      /<a([^>]*?)href="#footnote-([^"]+)"([^>]*?)>/g,
      (match, beforeHref, footnoteId, afterHref) => {
        const newHref = `/blog/${props.post.slug}#footnote-${footnoteId}`
        return `<a${beforeHref}href="${newHref}"${afterHref} data-umami-event="footnote-click-to-detail" data-umami-event-footnote="${footnoteId}" data-umami-event-article="${props.post.title}">`
      }
    )
  } else {
    // For detail view: Add events for internal footnote navigation
    html = html.replace(
      /<a([^>]*?)href="#footnote-([^"]+)"([^>]*?)>/g,
      `<a$1href="#footnote-$2"$3 data-umami-event="footnote-click-internal" data-umami-event-footnote="$2" data-umami-event-article="${props.post.title}">`
    )
  }

  return html
})

// Store the parsed HTML to avoid double parsing
const cachedHtml = computed(() => marked.parse(parsedBody.value))

// Extract footnotes section for separate rendering
const footnotesSection = computed(() => {
  if (!props.detail) return ''

  const footnotesMatch = cachedHtml.value.match(/<section[^>]*class="[^"]*footnotes[^"]*"[^>]*>[\s\S]*?<\/section>/)

  if (footnotesMatch) {
    let footnotesHtml = footnotesMatch[0]

    // Add events to back reference links
    footnotesHtml = footnotesHtml.replace(
      /<a([^>]*?)href="#footnote-ref-([^"]+)"([^>]*?)data-footnote-backref([^>]*?)>/g,
      `<a$1href="#footnote-ref-$2"$3data-footnote-backref$4 data-umami-event="footnote-back-click" data-umami-event-footnote="$2" data-umami-event-article="${props.post.title}">`
    )

    return footnotesHtml
  }

  return ''
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

const englishLocalization = computed(() => {
  const locs = props.post.localizations
  if (!Array.isArray(locs) || locs.length === 0) return null
  return locs.find((l) => l.locale === 'en') || null
})

const germanLocalization = computed(() => {
  const locs = props.post.localizations
  if (!Array.isArray(locs) || locs.length === 0) return null
  return locs.find((l) => l.locale === 'de') || null
})
</script>
