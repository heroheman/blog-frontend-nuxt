<template>
  <div class="book" v-if="isLoaded">
    <figure class="book__image w-full sm:w-1/4 lg:w-1/6">
      <img
        loading="lazy"
        :src="getBookImage()"
        :alt="`Cover: ${metadata.title}`"
        :title="`Bookcover: ${metadata.title}`"
        class="object-contain"
      />
    </figure>
    <div class="book__detail w-full sm:w-3/4 lg:w-5/6">
      <p
        class="font-italic"
        v-if="
          Object.prototype.hasOwnProperty.call(metadata, 'authors') &&
          metadata.authors.length
        "
      >
        {{ metadata.authors[0].name }}
      </p>
      <p class="font-bold">{{ metadata.title }}</p>
      <p v-if="Object.prototype.hasOwnProperty.call(metadata, 'publishers')">
        {{ metadata.publishers[0].name }},
      </p>
      <p>
        {{ metadata.publish_date }}<br />
        {{ metadata.number_of_pages || metadata.pagination }} Seiten<br />
      </p>
      <p>
        <small class="text-xs text-[#aaaaaa]">
          {{ getIsbn() }}
        </small>
      </p>

      <div
        class="mt-4 mb-2 refbuttons"
        v-if="bookMeta.showAmazonRef || bookMeta.showGenialokalRef"
      >
        <p class="!mt-0 !mb-1 font-bold inline-block">
          <small> Bestellen bei*: </small>
        </p>
        <ui-button
          v-if="bookMeta.showGenialokalRef && bookMeta.genialokalRefUrl !== ''"
          class="ref-button"
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
          class="ref-button"
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
        <p class="!mt-0 !mb-1 !text-xs text-[#aaaaaa] !mt-0">
          *Partnerlinks - Ich bekomme einen kleinen Prozentsatz von den Händlern
          und du bekommst ein Buch.
          <span v-if="bookMeta.showGenialokalRef">
            Mit Genialokal kannst du im übrigen direkt bei deiner Buchhandlung
            um die Ecke bestellen und unterstützt den lokalen Handel.
          </span>
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

<style lang="postcss">
.book {
  @apply flex flex-wrap;
  @apply my-4 py-4 pt-8 px-8 mb-10;
  @apply border-t border-solid border-[#a2a2a2];
  @apply bg-[#f6f6f6];

  &__image {
    @apply pr-4 !mt-0 !mb-0;
  }

  &__detail {
    p {
      @apply italic leading-normal text-sm;
      @apply mb-0;
    }
  }
}

.refbuttons svg {
  height: 14px;
}

.ref-button {
  padding: 0.3rem 0.8rem;
  border: 0;
  @apply !border-0;
  @apply text-sm;
  @apply hover:bg-[#f2f2f2];
}
</style>
