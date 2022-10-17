<!-- eslint-disable vue/no-use-v-if-with-v-for -->
<template>
  <div class="collection-index">
    <ul class="collection-index__list mb-4">
      <li v-if="collectionTitle">
        <h4 class="mt-0 pt-0">
          {{ collectionTitle }}
        </h4>
      </li>

      <li
        v-for="(item, index) in collection"
        :key="index"
        class="collection-index__listitem"
        :class="{
          'is-hidden': isSingleCollection(item) && !showSingleCollections,
        }"
      >
        <div class="collection-item">
          <div class="collection-item__title">
            <h3 class="title title--index">
              <nuxt-link
                :to="`${linkPath}/${item.attributes.slug}`"
                class="inline-block mb-2 collection--clickable"
              >
                {{ item.attributes.title || item.attributes.name }}
              </nuxt-link>
              <span class="collection-item__counter">
                <span>
                  {{ item.attributes.articles.data.length }}
                </span>
              </span>
            </h3>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { formatDate } from '@/utils/helper.js'
export default {
  name: 'CollectionIndex',
  props: {
    collectionTitle: {
      type: String,
      default: '',
    },
    linkPath: {
      type: String,
      default: '',
    },
    collection: {
      type: Array,
      default: () => [],
    },
    showSingleCollections: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    formatDate,
    isSingleCollection(item) {
      return item.attributes.articles.data.length === 1
    },
  },
}
</script>

<style lang="postcss">
.is-hidden {
  @apply !hidden;
}
.collection-index {
  &__list {
    @apply flex flex-col pl-0;
    @screen md {
      padding-top: 2.4rem;
    }

    &:first-child {
      @apply pt-0;
    }
  }
  &__listitem {
    @apply flex flex-col;
    &:not(:last-child) {
      @apply border-b border-gray-200 border-solid;
    }
  }
}

.collection-item {
  @apply flex flex-wrap text-left align-baseline font-meta;

  &__title {
    @apply w-full pr-2 mb-2 sm:w-full font-meta;
  }

  &__counter {
    @apply inline-block rounded-full relative;
    top: 5px;
    width: 20px;
    height: 20px;
    background: #ccc;
    > span {
      @apply absolute;
      @apply text-base font-meta p-1 inline-block;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      font-size: 10px;
    }
  }

  &__date {
    @apply block md:inline-block mb-2 text-sm text-left;
  }

  &__body {
    @apply text-sm;
  }
}
</style>
