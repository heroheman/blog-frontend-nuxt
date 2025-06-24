<!-- eslint-disable vue/no-use-v-if-with-v-for -->
<template>
  <div class="collection-index">
    <div class="collection-index__list">
      <div v-if="collectionTitle" class="mb-6 sm:mb-8">
        <h2 class="text-2xl sm:text-3xl font-head font-normal text-gray-900">
          {{ collectionTitle }}
        </h2>
      </div>

      <div v-if="!compact" class="space-y-4">
        <div
          v-for="(item, index) in collection"
          :key="index"
          class="collection-index__listitem"
          :class="{
            'is-hidden': isSingleCollection(item) && !showSingleCollections,
          }"
        >
          <div class="collection-item group">
            <nuxt-link
              :to="`${linkPath}/${item.slug}`"
              class="block py-3 border-b border-gray-200 hover:border-gray-300 transition-colors duration-200"
              data-umami-event="index-click-collection"
              :data-umami-event-title="item.title || item.name"
              :data-umami-event-url="`${linkPath}/${item.slug}`"
            >
              <div class="flex items-center justify-between">
                <div class="flex-1 min-w-0">
                  <h3 class="text-lg sm:text-xl font-head font-normal text-gray-900 group-hover:text-gray-700 transition-colors duration-200">
                    {{ item.title || item.name }}
                  </h3>
                </div>
                <div class="flex-shrink-0 ml-4">
                  <span class="inline-flex items-center justify-center w-8 h-8 bg-gray-100 text-gray-600 text-xs font-meta font-medium rounded-full group-hover:bg-gray-200 transition-colors duration-200">
                    {{ item.articles ? item.articles.length : 0 }}
                  </span>
                </div>
              </div>
            </nuxt-link>
          </div>
        </div>
      </div>

      <div v-else class="flex flex-wrap gap-2 sm:gap-3 mb-12">
        <nuxt-link
          v-for="(item, index) in collection"
          :key="index"
          :to="`${linkPath}/${item.slug}`"
          class="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 hover:text-gray-900 text-sm font-meta rounded-full transition-colors duration-200"
          :class="{
            'is-hidden': (isSingleCollection(item) && !showSingleCollections) || (compact && isSingleCollection(item)),
          }"
          data-umami-event="index-click-collection-compact"
          :data-umami-event-title="item.title || item.name"
          :data-umami-event-url="`${linkPath}/${item.slug}`"
        >
          <span>{{ item.title || item.name }}</span>
          <span class="inline-flex items-center justify-center w-5 h-5 bg-white text-gray-600 text-xs font-medium rounded-full">
            {{ item.articles ? item.articles.length : 0 }}
          </span>
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
import { formatDate } from '~/utils/helper'
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
    compact: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    formatDate,
    isSingleCollection(item) {
      return item.articles && item.articles.length === 1
    },
  },
}
</script>

<style lang="postcss" scoped>
.is-hidden {
  @apply hidden;
}

.collection-index {
  @apply w-full;
}

.collection-index__list {
  @apply w-full;
}

.collection-index__listitem {
  @apply w-full;
}

.collection-item {
  @apply w-full;
}
</style>
