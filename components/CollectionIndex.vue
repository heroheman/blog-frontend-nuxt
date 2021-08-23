<template>
  <div class="collection-index">
    <ul class="collection-index__list">
      <li
        v-for="(item, index) in collection"
        :key="index"
        class="collection-index__listitem"
      >
        <div class="collection-item">
          <div class="collection-item__title">
            <h3 class="title title--index">
              <nuxt-link
                :to="`${linkPath}/${item.slug}`"
                class="inline-block mb-2 collection--clickable"
              >
                {{ item.title || item.name }}
              </nuxt-link>
              <span class="collection-item__counter">
                <span>
                  {{ item.articles.length }}
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
    linkPath: {
      type: String,
      default: '',
    },
    collection: {
      type: Array,
      default: () => [],
    },
  },
  methods: { formatDate },
}
</script>

<style lang="postcss">
.collection-index {
  &__list {
    @apply flex flex-col md:pt-32 pl-0;
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
