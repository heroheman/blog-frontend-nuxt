<template>
  <div class="book" v-if="isLoaded">
    <figure class="w-full pr-4 !mt-0 !mb-0 sm:w-1/4 lg:w-1/6">
      <img
        loading="lazy"
        :src="getBookImage()"
        :alt="`Cover: ${metadata.title}`"
        :title="`Bookcover: ${metadata.title}`"
        class="object-contain"
      />
    </figure>
    <div class="w-full italic leading-normal sm:w-3/4 lg:w-5/6 font-sm">
      <em
        v-if="
          Object.prototype.hasOwnProperty.call(metadata, 'authors') &&
          metadata.authors.length
        "
        >{{ metadata.authors[0].name }}</em
      >
      <br />
      <strong>{{ metadata.title }}</strong>
      <br />
      <span v-if="Object.prototype.hasOwnProperty.call(metadata, 'publishers')"
        >{{ metadata.publishers[0].name }},</span
      >
      {{ metadata.publish_date }}<br />
      {{ metadata.number_of_pages || metadata.pagination }} Seiten<br />
      <span class="text-xs text-[#aaaaaa]">
        {{ getIsbn() }}
      </span>

      <div
        class="mt-4 mb-2 refbuttons"
        v-if="bookMeta.showAmazonRef || bookMeta.showGenialokalRef"
      >
        <p class="!mt-0 !mb-1 text-sm font-bold">
          <small> Bestellen bei*: </small>
        </p>
        <ui-button
          v-if="bookMeta.showGenialokalRef && bookMeta.genialokalRefUrl !== ''"
          :href="bookMeta.genialokalRefUrl"
          rel="noopener noreferrer"
          target="_blank"
          title="Dieses Buch bei Genialokal kaufen oder bei deinen lokalen Buchhändler bestellen und nach Hause liefern lassen"
        >
          <font-awesome-icon
            :icon="['fas', 'book-open']"
            :style="{ color: '#a4c408' }"
          />
          Genialokal
        </ui-button>
        <ui-button
          v-if="bookMeta.showAmazonRef && bookMeta.amazonRefUrl !== ''"
          :href="bookMeta.amazonRefUrl"
          rel="noopener noreferrer"
          target="_blank"
          title="Dieses Buch bei Amazon kaufen"
        >
          <font-awesome-icon
            :icon="['fab', 'amazon']"
            :style="{ color: '#ff9900' }"
          />
          Amazon
        </ui-button>
        <p class="!mt-0 !mb-1 text-xs text-[#aaaaaa] !mt-2">
          <small>
            *Partnerlinks - Ich bekomme einen kleinen Prozentsatz von den
            Händlern und du bekommst ein Buch.
            <span v-if="bookMeta.showGenialokalRef">
              Mit Genialokal kannst du im übrigen direkt bei deiner Buchhandlung
              um die Ecke bestellen und unterstützt den lokalen Handel.
            </span>
          </small>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
// `https://openlibrary.org/isbn/${this.isbn.isbn}.json`
export default {
  name: 'WidgetOpenLibrary',
  props: {
    bookMeta: {
      type: Object,
      required: true,
      default: () => {},
    },
  },
  data() {
    return {
      isLoaded: false,
      isEmptyResponse: false,
      metadata: {},
    }
  },
  async fetch() {
    const id = `ISBN:${this.bookMeta.isbn}`
    const tmp = await this.$http.$get(
      `https://openlibrary.org/api/books?bibkeys=${id}&jscmd=data&format=json`
    )
    if (JSON.stringify(tmp) !== '{}') {
      this.metadata = tmp[id]
      this.isLoaded = true
    } else {
      this.isEmptyResponse = true
      this.isLoaded = false
    }
  },
  methods: {
    getIsbn() {
      const isbn10 = Object.prototype.hasOwnProperty.call(
        this.metadata.identifiers,
        'isbn_10'
      )
        ? this.metadata.identifiers.isbn_10
        : 'Not Found'
      const isbn13 = Object.prototype.hasOwnProperty.call(
        this.metadata.identifiers,
        'isbn_10'
      )
        ? this.metadata.identifiers.isbn_10
        : 'Not Found'

      return `ISBN: ${isbn10} (ISBN-13: ${isbn13})`
    },
    getBookImage() {
      // checko for custom cover
      if (this.bookMeta.cover !== null) {
        if (
          Object.prototype.hasOwnProperty.call(
            this.bookMeta.cover.formats,
            'small'
          )
        ) {
          return this.bookMeta.cover.formats.small.url
        }
        if (
          Object.prototype.hasOwnProperty.call(
            this.bookMeta.cover.formats,
            'thumbnail'
          )
        ) {
          return this.bookMeta.cover.formats.thumbnail.url
        }
      } else if (Object.prototype.hasOwnProperty.call(this.metadata, 'cover')) {
        // else use open lib cover
        return this.metadata.cover.medium
      } else {
        // just use placeh0older
        return 'https://res.cloudinary.com/dlsll9dkn/image/upload/v1640007514/book_09ed7892d7.png'
      }
    },
  },
}
</script>

<style>
.book {
  @apply flex flex-wrap p-4 border-4 border-solid border-[#c2c2c2];
}

.refbuttons svg {
  height: 14px;
}
</style>
