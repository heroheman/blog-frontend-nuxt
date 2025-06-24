<template>
  <div v-if="isLoaded" class="book-widget">
    <div class="flex flex-col sm:flex-row gap-3 sm:gap-4 sm:items-start p-4">
      <div class="book-cover flex-shrink-0 sm:w-20 !m-0">
        <img
        style="margin: 0 !important;"
          loading="lazy"
          :src="getBookImage()"
          :alt="`Cover: ${metadata.title}`"
          :title="`Bookcover: ${metadata.title}`"
          class="w-20 h-auto sm:w-16 rounded object-cover shadow-sm m-0"
        />
      </div>

      <div class="book-details flex-1 min-w-0 sm:pl-4">
        <div class="mb-4">
          <div class="!text-xl font-head font-medium text-gray-900 leading-tight !mb-2 font-bold">
            {{ metadata.title }}
          </div>
          <div
            v-if="
              Object.prototype.hasOwnProperty.call(metadata, 'authors') &&
              metadata.authors.length
            "
            class="text-xs text-gray-600 font-meta mb-2 leading-tight"
          >
            {{ metadata.authors[0].name }}
          </div>
          <div class="text-xxs text-gray-500 font-meta leading-tight space-y-0.5">
            <!-- <p v-if="Object.prototype.hasOwnProperty.call(metadata, 'publishers')" class="text-xs">
              {{ metadata.publishers[0].name }}
            </p> -->
            <p class="text-xs text-gray-400 leading-tight mb-0">
              {{ metadata.publish_date }} • {{ metadata.number_of_pages || metadata.pagination }} Seiten • {{ getIsbn() }}
            </p>

            <p class="text-xs text-gray-400 leading-tight">
            </p>
          </div>
        </div>

        <div
          v-if="bookMeta.showAmazonRef || bookMeta.showGenialokalRef"
          class="book-purchase"
        >
          <div class="text-xs font-meta font-medium text-gray-700 mb-2 leading-tight">
            Bestellen bei*:
          </div>
          <div class="flex flex-wrap gap-1 mb-1">
            <ui-button
              v-if="bookMeta.showGenialokalRef && bookMeta.genialokalRefUrl !== ''"
              class="purchase-btn purchase-btn--genial"
              data-umami-event="article-click-ad"
              data-umami-event-ad-type="geniallokal"
              :data-umami-event-ad-book="metadata.title"
              :href="bookMeta.genialokalRefUrl"
              rel="noopener noreferrer"
              target="_blank"
              title="Dieses Buch bei Genialokal kaufen oder bei deinen lokalen Buchhändler bestellen und nach Hause liefern lassen"
            >
              <SimpleIcon name="book-open" size="10" class="text-green-600 mr-1" />
              Genialokal
            </ui-button>
            <ui-button
              v-if="bookMeta.showAmazonRef && bookMeta.amazonRefUrl !== ''"
              class="purchase-btn purchase-btn--amazon"
              data-umami-event="article-click-ad"
              data-umami-event-ad-type="amazon"
              :data-umami-event-ad-book="metadata.title"
              :href="bookMeta.amazonRefUrl"
              rel="noopener noreferrer"
              target="_blank"
              title="Dieses Buch bei Amazon kaufen"
            >
              <SimpleIcon name="amazon" size="10" class="text-orange-500 mr-1" />
              Amazon
            </ui-button>
          </div>
          <p class="text-xs text-gray-500 leading-tight">
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
    // const tmp = await this.$http.$get(
    //   `https://openlibrary.org/api/books?bibkeys=${id}&jscmd=data&format=json`
    // )
    const tmp = await fetch(
      `https://openlibrary.org/api/books?bibkeys=${id}&jscmd=data&format=json`
    ).then((response) => response.json())

    if (JSON.stringify(tmp) !== '{}') {
      this.metadata = tmp[id]
      this.isLoaded = true
    } else {
      this.isEmptyResponse = true
      this.isLoaded = false
    }
  },
  async mounted() {
    const id = `ISBN:${this.bookMeta.isbn}`

    try {
      const tmp = await fetch(
        `https://openlibrary.org/api/books?bibkeys=${id}&jscmd=data&format=json`
      ).then((response) => response.json())

      if (JSON.stringify(tmp) !== '{}') {
        this.metadata = tmp[id]
        this.isLoaded = true
      } else {
        this.isEmptyResponse = true
        this.isLoaded = false
      }
    } catch (error) {
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
        ? this.metadata.identifiers.isbn_10[0]
        : 'Not Found'
      const isbn13 = Object.prototype.hasOwnProperty.call(
        this.metadata.identifiers,
        'isbn_13'
      )
        ? this.metadata.identifiers.isbn_13[0]
        : 'Not Found'

      return `ISBN: ${isbn10} (ISBN-13: ${isbn13})`
    },
    getBookImage() {
      if (
        this.bookMeta.cover !== null &&
        Object.prototype.hasOwnProperty.call(this.bookMeta, 'cover')
      ) {
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

<style lang="postcss" scoped>
.book-widget {
  @apply p-2 sm:p-3 bg-gray-50 rounded border border-gray-200 my-3;
}

.book-cover {
  @apply flex-shrink-0;
}

.book-cover img {
  @apply transition-transform duration-200;

  &:hover {
    @apply scale-105;
  }
}

.book-details h3 {
  @apply break-words;
}

.purchase-btn {
  @apply inline-flex items-center px-1.5 py-0.5 text-xs font-meta font-medium;
  @apply bg-white border border-gray-200 rounded;
  @apply hover:bg-gray-50 hover:border-gray-300;
  @apply transition-all duration-200 ease-in-out;
  @apply focus:outline-none focus:ring-1 focus:ring-offset-1 focus:ring-gray-300;
  line-height: 1.2;

  &--genial {
    @apply hover:bg-green-50 hover:border-green-200;

    &:focus {
      @apply ring-green-300;
    }
  }

  &--amazon {
    @apply hover:bg-orange-50 hover:border-orange-200;

    &:focus {
      @apply ring-orange-300;
    }
  }
}

/* Mobile adjustments */
@media (max-width: 640px) {
  .book-widget {
    @apply p-3 my-4;
  }

  .book-cover {
    @apply w-full mb-3 flex justify-center;

    img {
      @apply w-20 h-auto;
    }
  }

  .book-details {
    @apply pl-0 text-center;

    .book-purchase {
      @apply mt-4;

      .flex {
        @apply justify-center;
      }
    }
  }

  .purchase-btn {
    @apply px-2 py-1.5 text-sm;
    @apply min-h-[36px] min-w-[90px];
    line-height: 1.2;

    /* Make buttons more touch-friendly */
    &:active {
      @apply scale-95;
    }
  }

  /* Stack layout for very small screens */
  @media (max-width: 480px) {
    .flex.flex-wrap.gap-1 {
      @apply flex-col space-y-2;
    }

    .purchase-btn {
      @apply w-full justify-center;
    }
  }
}
</style>
