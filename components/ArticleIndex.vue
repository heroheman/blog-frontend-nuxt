<template>
  <div class="article-index">
    <div v-if="view === 'list'" class="article-index__list space-y-4">
      <article
        v-for="(article, index) in articles"
        :key="index"
        class="article-index__listitem"
      >
        <div class="article-item group">
          <nuxt-link
            :to="`/blog/${article.slug}`"
            class="block py-3 border-b border-gray-200 hover:border-gray-300 transition-colors duration-200"
            data-umami-event="index-click-article"
            :data-umami-event-title="article.title"
            :data-umami-event-url="`/blog/${article.slug}`"
          >
            <div class="flex flex-col space-y-2">
              <div class="flex items-start justify-between">
                <h3 class="text-lg sm:text-xl font-head font-normal text-gray-900 group-hover:text-gray-700 transition-colors duration-200 flex-1 min-w-0 pr-4 mb-0">
                  {{ article.title }}
                  <Rating
                    v-if="showRatings && getRating(article)"
                    :rating="getRating(article)"
                    :compact="true"
                    class="inline-block ml-2"
                  />
                  &nbsp;
                <time
                  v-if="article.display_published_date"
                  class="text-xs sm:text-sm text-gray-500 font-meta flex-shrink-0"
                  :datetime="article.display_published_date"
                >
                  {{ formatDate(article.display_published_date, true) }}
                </time>
                </h3>
              </div>
              <p v-if="showDescription && article.description" class="text-sm text-gray-600 font-meta leading-relaxed">
                {{ article.description }}
              </p>
              <p v-if="showGenre && getGenreInfo(article)" class="text-xs text-gray-500 font-meta">
                <span class="text-gray-400">Genre:</span> {{ getGenreInfo(article) }}
                <template v-if="showSeries && getSeriesInfo(article)">
                  &nbsp;
                  <span class="text-xs text-gray-500 font-meta">
                    <span class="text-gray-400">Serie:</span> {{ getSeriesInfo(article) || 'NO SERIES FOUND' }}
                  </span>
                </template>
              </p>
            </div>
          </nuxt-link>
        </div>
      </article>
    </div>

    <div v-if="view === 'thumbs'" class="article-index__thumbs grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
      <article
        v-for="(article, index) in articles"
        :key="index"
        class="article-index__thumbitem"
      >
        <nuxt-link
          :to="`/blog/${article.slug}`"
          class="block group"
          data-umami-event="index-click-article-thumb"
          :data-umami-event-title="article.title"
          :data-umami-event-url="`/blog/${article.slug}`"
        >
          <figure class="article-item">
            <div v-if="getCoverFormats(article)" class="aspect-w-4 aspect-h-3 mb-3 rounded overflow-hidden bg-gray-100">
              <img
                v-if="getCoverFormats(article).small?.url || getCoverFormats(article).thumbnail?.url"
                :srcset="buildSrcset(article)"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                :src="getCoverFormats(article).small?.url || getCoverFormats(article).thumbnail?.url"
                :alt="article.title"
                class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
              />
              <div v-else class="w-full h-full bg-gray-300 flex items-center justify-center">
                <span class="text-gray-500 text-sm">No Image Available</span>
              </div>
            </div>
            <figcaption class="space-y-2">
              <h3 class="text-base sm:text-lg font-head font-normal text-gray-900 group-hover:text-gray-700 transition-colors duration-200 leading-tight">
                {{ article.title }}
                <Rating
                  v-if="showRatings && getRating(article)"
                  :rating="getRating(article)"
                  :compact="true"
                  class="inline-block ml-2"
                />
              </h3>
              <time
                v-if="article.display_published_date"
                class="text-xs text-gray-500 font-meta block"
                :datetime="article.display_published_date"
              >
                {{ formatDate(article.display_published_date, true) }}
              </time>
              <p v-if="showGenre && getGenreInfo(article)" class="text-xs text-gray-500 font-meta">
                <span class="text-gray-400">Genre:</span> {{ getGenreInfo(article) }}
              </p>
              <!-- Debug and series display -->
              <template v-if="showSeries">
                <!-- <p class="text-xs text-red-500 font-meta">
                  Debug Thumbs: showSeries={{ showSeries }}, seriesInfo='{{ getSeriesInfo(article) }}', type={{ typeof getSeriesInfo(article) }}
                </p> -->
                <p class="text-xs text-gray-500 font-meta">
                  <span class="text-gray-400">Serie:</span> {{ getSeriesInfo(article) || 'NO SERIES FOUND' }}
                </p>
              </template>
            </figcaption>
          </figure>
        </nuxt-link>
      </article>
    </div>
  </div>
</template>

<script>
import { formatDate } from '~/utils/helper'
export default {
  name: 'ArticleIndex',
  props: {
    view: {
      type: String,
      default: 'list', // list, thumbs
    },
    articles: {
      type: Array,
      default: () => [],
    },
    showDescription: {
      type: Boolean,
      default: false,
    },
    showRatings: {
      type: Boolean,
      default: false,
    },
    showGenre: {
      type: Boolean,
      default: false,
    },
    showSeries: {
      type: Boolean,
      default: false,
    },
    description: {
      type: String,
      default: 'no description given', // list, thumbs
    },
  },
  methods: {
    formatDate,
    getRating(article) {
      // Extract rating from the additional dynamic zone
      if (!article.additional || !Array.isArray(article.additional)) {
        return null
      }

      const ratingComponent = article.additional.find(
        component => component.__component === 'content.rating'
      )

      if (ratingComponent && ratingComponent.ratingnumber) {
        return parseFloat(ratingComponent.ratingnumber)
      }

      return null
    },
    getGenreInfo(article) {
      // Get genre information from the article
      const genres = []

      // Add category if available (handle multiple possible structures)
      if (article.category) {
        let categoryTitle = null
        if (article.category.data && article.category.data.title) {
          categoryTitle = article.category.data.title
        } else if (article.category.data && article.category.data.attributes && article.category.data.attributes.title) {
          categoryTitle = article.category.data.attributes.title
        } else if (article.category.title) {
          categoryTitle = article.category.title
        } else if (article.category.attributes && article.category.attributes.title) {
          categoryTitle = article.category.attributes.title
        }

        if (categoryTitle) {
          genres.push(categoryTitle)
        }
      }

      // Add book genres if available (handle multiple possible structures)
      if (article.genre_books) {
        let genreList = article.genre_books.data || article.genre_books
        if (Array.isArray(genreList)) {
          genreList.forEach(genre => {
            let genreTitle = null
            if (genre.title) {
              genreTitle = genre.title
            } else if (genre.attributes && genre.attributes.title) {
              genreTitle = genre.attributes.title
            }

            if (genreTitle) {
              genres.push(genreTitle)
            }
          })
        }
      }

      return genres.length > 0 ? genres.join(', ') : null
    },
    getSeriesInfo(article) {
      // Get series information from the article
      // console.log('getSeriesInfo called for:', article.title, 'bookseries:', article.bookseries)

      if (!article.bookseries) {
        // console.log('No bookseries found for:', article.title)
        return null
      }

      // Handle different possible structures
      let seriesTitle = null

      // Case 1: bookseries is an array (your actual structure)
      if (Array.isArray(article.bookseries) && article.bookseries.length > 0) {
        if (article.bookseries[0].title) {
          seriesTitle = article.bookseries[0].title
          // console.log('Found series title in array:', seriesTitle)
        }
      }
      // Case 2: Direct object with title
      else if (article.bookseries.title) {
        seriesTitle = article.bookseries.title
        // console.log('Found series title directly:', seriesTitle)
      }
      // Case 3: bookseries.data.title (Strapi v4/v5 relation format)
      else if (article.bookseries.data && article.bookseries.data.title) {
        seriesTitle = article.bookseries.data.title
        // console.log('Found series title in data:', seriesTitle)
      }
      // Case 4: bookseries.data as array
      else if (article.bookseries.data && Array.isArray(article.bookseries.data) && article.bookseries.data.length > 0) {
        if (article.bookseries.data[0].title) {
          seriesTitle = article.bookseries.data[0].title
          // console.log('Found series title in data array:', seriesTitle)
        }
      }

      // console.log('Final series result for', article.title, ':', seriesTitle)
      return seriesTitle || null
    },
    getCoverFormats(article) {
      // Try direct formats first, then data.formats for backward compatibility
      if (article.cover && article.cover.formats) {
        return article.cover.formats;
      }
      if (article.cover && article.cover.data && article.cover.data.formats) {
        return article.cover.data.formats;
      }
      return null;
    },
    buildSrcset(article) {
      const formats = this.getCoverFormats(article);
      if (!formats) return '';

      const srcsetParts = [];
      if (formats.thumbnail) {
        srcsetParts.push(`${formats.thumbnail.url} ${formats.thumbnail.width}w`);
      }
      if (formats.small) {
        srcsetParts.push(`${formats.small.url} ${formats.small.width}w`);
      }
      if (formats.medium) {
        srcsetParts.push(`${formats.medium.url} ${formats.medium.width}w`);
      }
      if (formats.large) {
        srcsetParts.push(`${formats.large.url} ${formats.large.width}w`);
      }

      return srcsetParts.join(', ');
    }
  },
}
</script>

<style lang="postcss" scoped>
.article-index {
  @apply w-full;
}

.article-index__list {
  @apply w-full;
}

.article-index__listitem {
  @apply w-full;
}

.article-index__thumbs {
  @apply w-full;
}

.article-index__thumbitem {
  @apply w-full;
}

.article-item {
  @apply w-full;
}

/* Ensure proper aspect ratio for thumbnails */
.aspect-w-4 {
  position: relative;
  padding-bottom: 75%; /* 4:3 aspect ratio */
}

.aspect-w-4 > img {
  position: absolute;
  height: 100%;
  width: 100%;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}
</style>
