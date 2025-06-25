<!-- eslint-disable vue/no-use-v-if-with-v-for -->
<template>
  <div v-if="isActive" class="collection-index">
    <div class="collection-index__list">
      <div v-if="props.collectionTitle && !props.asTab" class="mb-6 sm:mb-8">
        <h2 class="text-2xl sm:text-3xl font-head font-normal text-gray-900">
          {{ props.collectionTitle }}
        </h2>
      </div>

      <div v-if="!props.compact" class="space-y-4">
        <div
          v-for="(item, index) in props.collection"
          :key="index"
          class="collection-index__listitem"
          :class="{
            'is-hidden': isSingleCollection(item) && !props.showSingleCollections,
          }"
        >
          <div class="collection-item group">
            <nuxt-link
              :to="`${props.linkPath}/${item.slug}`"
              class="block py-3 border-b border-gray-200 hover:border-gray-300 transition-colors duration-200"
              data-umami-event="index-click-collection"
              :data-umami-event-title="item.title || item.name"
              :data-umami-event-url="`${props.linkPath}/${item.slug}`"
            >
              <div class="flex items-center justify-between">
                <div class="flex-1 min-w-0">
                  <h3 class="text-lg sm:text-xl font-head font-normal text-gray-900 group-hover:text-gray-700 transition-colors duration-200">
                    {{ item.title || item.name }}
                  </h3>
                </div>
                <div v-if="item.articles && item.articles.length > 1" class="flex-shrink-0 ml-4">
                  <span class="inline-flex items-center justify-center w-8 h-8 bg-gray-100 text-gray-600 text-xs font-meta font-medium rounded-full group-hover:bg-gray-200 transition-colors duration-200">
                    {{ item.articles.length }}
                  </span>
                </div>
              </div>
            </nuxt-link>
          </div>
        </div>
      </div>

      <div v-else class="flex flex-wrap gap-2 sm:gap-3 mb-12">
        <nuxt-link
          v-for="(item, index) in props.collection"
          :key="index"
          :to="`${props.linkPath}/${item.slug}`"
          class="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 hover:text-gray-900 text-sm font-meta rounded-full transition-colors duration-200"
          :class="{
            'is-hidden': isSingleCollection(item) && !props.showSingleCollections,
          }"
          data-umami-event="index-click-collection-compact"
          :data-umami-event-title="item.title || item.name"
          :data-umami-event-url="`${props.linkPath}/${item.slug}`"
        >
          <span>{{ item.title || item.name }}</span>
          <span v-if="!isSingleCollection(item)" class="inline-flex items-center justify-center w-5 h-5 bg-white text-gray-600 text-xs font-medium rounded-full">
            {{ item.articles.length }}
          </span>
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, inject } from 'vue'

const props = defineProps({
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
  asTab: {
    type: Boolean,
    default: false,
  },
})

const isSingleCollection = (item) => {
  return item.articles && item.articles.length === 1
}

const registerTab = inject('registerTab', null)
const selectedTab = inject('selectedTab', null)

if (props.asTab && registerTab) {
  registerTab(props.collectionTitle)
}

const isActive = computed(() => {
  if (!props.asTab) return true
  if (selectedTab) {
    return selectedTab.value === props.collectionTitle
  }
  return false
})
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
