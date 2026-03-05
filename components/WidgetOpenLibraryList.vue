<template>
  <div :class="compact ? 'books-section--compact' : 'books-section'">
    <widget-open-library
      v-for="(book, index) in books"
      :key="index"
      :book-meta="book"
      :compact="compact"
      class="book-item"
    />
  </div>
</template>

<script>
// `https://openlibrary.org/isbn/${this.isbn.isbn}.json`
export default {
  name: 'WidgetOpenLibraryList',
  props: {
    books: {
      type: Array,
      required: true,
      default: () => [],
    },
    compact: {
      type: Boolean,
      default: false,
    },
  },
}
</script>

<style lang="postcss" scoped>
.books-section {
  @apply mt-8 space-y-6;
}

.books-section--compact {
  @apply mt-3 flex flex-wrap gap-2;
}

.books-section--compact .book-item {
  @apply flex-1 min-w-48;
}

.book-item {
  @apply w-full;
}

/* Mobile adjustments */
@media (max-width: 640px) {
  .books-section {
    @apply mt-4 space-y-3;
  }

  .book-item {
    @apply shadow-sm; /* Add subtle shadow for better separation on mobile */
  }
}
</style>
