<template>
  <div class="link-post-list">
    <a
      v-for="(item, index) in items"
      :key="index"
      :href="item.link"
      target="_blank"
      rel="noopener noreferrer"
      class="group block py-3 border-b border-monochrome-600"
      data-umami-event="index-click-linkpost"
      :data-umami-event-title="item.title"
    >
      <h3 class="font-head text-base leading-snug text-ink group-hover:text-accent transition-colors duration-200 flex items-start gap-1 mb-0">
        <span class="min-w-0">{{ item.title }}</span>
        <svg
          class="shrink-0 mt-1 w-3 h-3 text-monochrome-300 group-hover:text-accent transition-colors"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 17L17 7M7 7h10v10" />
        </svg>
      </h3>
      <time
        v-if="item.date"
        :datetime="item.date"
        class="block mt-1 font-meta text-xs text-monochrome-100"
      >
        {{ formatDate(item.date, true) }}
      </time>
    </a>
  </div>
</template>

<script setup>
import { formatDate } from '~/utils/helper'

defineProps({
  items: {
    type: Array,
    default: () => [],
  },
})
</script>
