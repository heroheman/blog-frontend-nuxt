<template>
  <div class="books-section">
    <widget-open-library
      v-for="(book, index) in books"
      :key="index"
      :book-meta="book"
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
  },
}
</script>

<style lang="postcss" scoped>
.books-section {
  @apply mt-8 space-y-6;
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
