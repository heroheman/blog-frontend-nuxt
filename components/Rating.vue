<template>
  <div class="rating">
    <div class="stars" v-if="!customRating">
      <span v-if="rating > 0">★</span>
      <span v-else>☆</span>

      <span v-if="rating > 1">★</span>
      <span v-else>☆</span>

      <span v-if="rating > 2">★</span>
      <span v-else>☆</span>

      <span v-if="rating > 3">★</span>
      <span v-else>☆</span>

      <span v-if="rating > 4">★</span>
      <span v-else>☆</span>
    </div>
    <div class="custom" v-else>
      <span v-if="rating > 0">
        {{ customRatingUnit }}
      </span>
      <span v-if="rating > 1">
        {{ customRatingUnit }}
      </span>
      <span v-if="rating > 2">
        {{ customRatingUnit }}
      </span>
      <span v-if="rating > 3">
        {{ customRatingUnit }}
      </span>
      <span v-if="rating > 4">
        {{ customRatingUnit }}
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'StarRating',
  props: {
    rating: {
      type: [Number, String],
      required: true,
      default: 0,
    },
    customRating: {
      type: [Boolean, String],
      default: false,
    },
    customRatingUnit: {
      type: [String],
      default: '★',
    },
  },
  data() {
    return {
      maxRating: 5,
    }
  },
}
</script>

<style lang="postcss">
.rating {
  unicode-bidi: bidi-override;
}
.rating > span {
  display: inline-block;
  position: relative;
  width: 1.1em;
}

.rating > .custom span {
  margin-right: 7px;
}
</style>
