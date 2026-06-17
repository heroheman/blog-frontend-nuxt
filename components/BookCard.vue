<template>
  <nuxt-link
    :to="`/blog/${book.slug}`"
    class="group block pb-5 mb-5 border-b border-monochrome-600"
    data-umami-event="index-click-book"
    :data-umami-event-title="book.title"
  >
    <!-- Cover (4:3) with genre · series overlaid -->
    <div class="relative aspect-[4/3] overflow-hidden rounded-sm bg-paper-deep mb-3">
      <img
        v-if="coverSrc"
        :src="coverSrc"
        :alt="book.title"
        loading="lazy"
        class="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-300"
      />
      <div v-else class="w-full h-full flex items-center justify-center">
        <SimpleIcon name="goodreads" size="24" class="text-monochrome-400" />
      </div>

      <div
        v-if="genre || series"
        class="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/85 via-ink/40 to-transparent px-3 pt-6 pb-2.5"
      >
        <p class="font-meta text-[10px] uppercase tracking-wider leading-tight text-paper/95">
          <span v-if="genre">{{ genre }}</span>
          <span v-if="series" class="text-paper/70"> · {{ series }}</span>
        </p>
      </div>
    </div>

    <!-- Headline -->
    <h3 class="font-display text-lg leading-snug text-ink group-hover:text-accent transition-colors duration-200 mb-1.5">
      {{ book.title }}
    </h3>

    <!-- Rating + date -->
    <div class="flex items-center gap-2 mb-2">
      <Rating v-if="rating" :rating="rating" compact />
      <time v-if="book.display_published_date" :datetime="book.display_published_date" class="font-meta text-xs text-monochrome-100">
        {{ formatDate(book.display_published_date, true) }}
      </time>
    </div>

    <!-- Lesen CTA -->
    <span class="inline-flex items-center text-xs font-meta font-medium text-accent group-hover:text-accent-600 transition-colors">
      Lesen
      <svg class="ml-1 w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
      </svg>
    </span>
  </nuxt-link>
</template>

<script setup>
import { computed } from 'vue'
import { formatDate } from '~/utils/helper'
import Rating from '~/components/Rating.vue'

const props = defineProps({
  book: {
    type: Object,
    required: true,
  },
})

const coverFormats = computed(() => {
  const cover = props.book.cover
  if (!cover) return null
  if (cover.formats) return cover.formats
  if (cover.data?.formats) return cover.data.formats
  return null
})

const coverSrc = computed(() => {
  const f = coverFormats.value
  if (f) return f.medium?.url || f.small?.url || f.thumbnail?.url || null
  return props.book.cover?.url || props.book.cover?.data?.url || null
})

const rating = computed(() => {
  const additional = props.book.additional
  if (!Array.isArray(additional)) return null
  const ratingComponent = additional.find((c) => c.__component === 'content.rating')
  return ratingComponent?.ratingnumber ? parseFloat(ratingComponent.ratingnumber) : null
})

const genre = computed(() => {
  const list = props.book.genre_books?.data || props.book.genre_books
  if (!Array.isArray(list)) return null
  const titles = list
    .map((g) => g.title || g.attributes?.title)
    .filter(Boolean)
  return titles.length ? titles.join(', ') : null
})

const series = computed(() => {
  const bs = props.book.bookseries
  if (!bs) return null
  if (Array.isArray(bs)) return bs[0]?.title || null
  if (bs.title) return bs.title
  if (bs.data?.title) return bs.data.title
  if (Array.isArray(bs.data)) return bs.data[0]?.title || null
  return null
})
</script>
