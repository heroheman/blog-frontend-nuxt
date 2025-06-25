<template>
  <span class="text-2xl text-amber-400 tracking-wider">
    <template v-if="!customRating">
      {{ '★'.repeat(rating) }}{{ '☆'.repeat(5 - rating) }}
    </template>
    <template v-else>
      {{ customRatingUnit.repeat(rating) }}
    </template>
  </span>
</template>

<script setup>
defineProps({
  rating: {
    type: Number,
    required: true,
    validator: (value) => value >= 0 && value <= 5,
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
</script>
