<template>
  <div class="books">
    <widget-open-library
      v-for="(book, index) in books"
      :key="index"
      :book-meta="book"
      class="mt-8 mb-4 article-text lg:max-w-3xl"
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

<style></style>
