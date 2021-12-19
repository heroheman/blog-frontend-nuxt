<template>
  <div
    class="flex flex-wrap p-4 border-4 border-solid border-[#c2c2c2]"
    v-if="!$fetchState.pending"
  >
    <figure class="w-full pr-4 !mt-0 !mb-0 sm:w-1/4 lg:w-1/6">
      <img
        :src="metadata.cover.medium"
        :alt="`Cover: ${metadata.title}`"
        :title="`Bookcover: ${metadata.title}`"
        class="object-contain"
      />
    </figure>
    <div class="w-full italic leading-normal sm:w-3/4 lg:w-5/6 font-sm">
      <em v-if="metadata.authors.length">{{ metadata.authors[0].name }}</em>
      <br />
      <strong>{{ metadata.title }}</strong>
      <br />
      <span v-if="metadata.publishers.length && Object.prototype.hasOwnProperty.call(metadata, 'publishers')"
        >{{ metadata.publishers[0].name }},</span
      >
      {{ metadata.publish_date }}<br />
      {{ metadata.number_of_pages }} Seiten<br />
      <!-- <span class="text-xs text-[#aaaaaa]"> -->
      <!--   ISBN-10: {{ metadata.identifiers.isbn_10.length ?  metadata.identifiers.isbn_10[0] : 'Not Found' }} ISBN-13: -->
      <!--   {{ metadata.identifiers.isbn_13.length ?  metadata.identifiers.isbn_13[0] : 'Not Found' }} -->
      <!-- </span> -->
    </div>
  </div>
</template>

<script>
// `https://openlibrary.org/isbn/${this.isbn.isbn}.json`
export default {
  name: 'WidgetOpenLibrary',
  props: {
    isbn: {
      type: Object,
      required: true,
      default: () => {},
    },
  },
  data() {
    return {
      isLoaded: false,
      metadata: {},
    }
  },
  async fetch() {
    const id = `ISBN:${this.isbn.isbn}`
    const tmp = await this.$http.$get(
      `https://openlibrary.org/api/books?bibkeys=${id}&jscmd=data&format=json`
    )
    this.metadata = tmp[id]
  },
}
</script>
