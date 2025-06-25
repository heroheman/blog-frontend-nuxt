<template>
  <div
    v-if="!customRating"
    class="inline-flex items-center"
    :class="compact ? 'space-x-0.5' : 'space-x-1'"
  >
    <div
      v-for="i in 5"
      :key="i"
      :class="compact ? 'h-4 w-4' : 'h-5 w-5'"
    >
      <!-- Full Star -->
      <svg
        v-if="roundedRating >= i"
        class="h-full w-full"
        :class="compact ? 'text-gray-900' : 'text-amber-400'"
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>

      <!-- Half Star -->
      <div v-else-if="roundedRating >= i - 0.5" class="relative h-full w-full">
        <svg class="h-full w-full text-gray-300" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
        <div class="absolute inset-y-0 left-0 w-1/2 overflow-hidden">
          <svg
            class="h-full w-full"
            :class="compact ? 'text-gray-900' : 'text-amber-400'"
            fill="currentColor"
            viewBox="0 0 20 20"
            style="width:200%; max-width: 200%;"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        </div>
      </div>

      <!-- Empty Star -->
      <svg v-else class="h-full w-full text-gray-300" fill="currentColor" viewBox="0 0 20 20">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    </div>
  </div>
  <span
    v-else
    class="tracking-wider"
    :class="compact ? 'text-base' : 'text-2xl'"
  >
    {{ customRatingUnit.repeat(rating) }}
  </span>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  rating: {
    type: Number,
    required: true,
    validator: (value) => value >= 0 && value <= 5,
  },
  compact: {
    type: Boolean,
    default: false,
  },
  customRating: {
    type: Boolean,
    default: false,
  },
  customRatingUnit: {
    type: String,
    default: '★',
  },
})

const roundedRating = computed(() => {
  return Math.ceil(props.rating * 2) / 2
})
</script>
