<template>
  <div class="article-index">
    <ul v-if="view === 'list'" class="article-index__list">
      <li
        v-for="(articles, index) in articles"
        :key="index"
        class="article-index__listitem"
      >
        <div class="article-item">
          <div class="article-item__title">
            <span
              v-if="articles.display_published_date"
              class="article-item__date"
            >
              {{ formatDate(articles.display_published_date, true) }}
              <span class="hidden mx-1 sm:inline-block"> &ndash; </span>
            </span>

            <h3 class="title title--index">
              <nuxt-link
                :to="`/blog/${articles.slug}`"
                class="inline-block mb-2 article article--clickable"
              >
                {{ articles.title }}
              </nuxt-link>
            </h3>
            <p class="article-item__body" v-if="showDescription">
              {{ articles.description }}
            </p>
          </div>
          <!-- <tags -->
          <!--   v-if="blogPost.tags" -->
          <!--   class="w-full mb-2 md:self-end sm:w-full md:w-auto" -->
          <!--   :tags="blogPost.tags" -->
          <!-- /> -->
        </div>
      </li>
    </ul>

    <ul v-if="view === 'thumbs'" class="article-index__thumbs">
      <li
        v-for="(article, index) in articles"
        :key="index"
        class="article-index__thumbitem"
      >
        <figure class="article-item">
          <img
            v-if="article.cover"
            :src="article.cover.formats.thumbnail.url"
            :alt="articles.title"
            :height="article.cover.formats.thumbnail.height.$numberInt"
            :width="article.cover.formats.thumbnail.width.$numberInt"
          />
          <figcaption class="article-item__title">
            <span
              v-if="article.display_published_date"
              class="article-item__date"
            >
              {{ formatDate(article.display_published_date, true) }}
              <span class="hidden mx-1 sm:inline-block"> &ndash; </span>
            </span>

            <h3 class="title title--index">
              <nuxt-link
                :to="`/blog/${article.slug}`"
                class="inline-block mb-2 article article--clickable"
              >
                {{ article.title }}
              </nuxt-link>
            </h3>
            <!-- <p class="article-item__body" v-if="showDescription"> -->
            <!--   {{ article.description }} -->
            <!-- </p> -->
          </figcaption>
        </figure>
      </li>
    </ul>
  </div>
</template>

<script>
import { formatDate } from '@/utils/helper.js'
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
  },
  methods: { formatDate },
}
</script>

<style lang="postcss">
.article-index {
  &__list {
    @apply list-none;
    @apply flex flex-col md:pt-32 pl-0;
  }
  &__listitem {
    @apply flex flex-col;
    &:not(:last-child) {
      @apply border-b border-gray-200 border-solid;
    }
  }

  &__thumbs {
    @apply flex flex-row flex-wrap md:pt-32 pl-0;
    @apply list-none;

    figure.article-item {
      @apply aspect-four-by-three;

      img {
        @apply m-0;
      }
    }
  }

  &__thumbitem {
    @apply w-full sm:w-1/2 md:w-1/3;
  }
}

.article-item {
  @apply flex flex-wrap text-left align-baseline font-meta;

  &__title {
    @apply w-full pr-2 mb-2 sm:w-full font-meta;
  }

  &__date {
    @apply block md:inline-block mb-2 text-sm text-left;
  }

  &__body {
    @apply text-sm;
  }
}
</style>
