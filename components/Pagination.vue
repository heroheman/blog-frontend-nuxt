<template>
  <ul class="mt-10 pagination">
    <li class="pagination__item pagination__item--symbol">
      <nuxt-link :to="{ name: 'page-page', params: { page: 1 } }"
        data-umami-event="pagination-click-first"
        data-umami-event-page="1"
      >
        ◂◂
      </nuxt-link>
    </li>
    <li
      class="pagination__item pagination__item--symbol"
      :class="{ 'pagination__item--disabled': currentPage === 0 }"
    >
      <nuxt-link :to="{ name: 'page-page', params: { page: currentPage - 1 } }"
        data-umami-event="pagination-click-prev"
        :data-umami-event-page="currentPage - 1"
      >
        ◂
      </nuxt-link>
    </li>
    <li
      v-for="index in parseInt(articlesCount / perPage + 1)"
      :key="index"
      class="pagination__item"
      :class="{ 'pagination__item--active': index - 1 === currentPage }"
    >
      <nuxt-link
        v-if="index !== 1"
        :to="{ name: 'page-page', params: { page: index } }"
        data-umami-event="pagination-click-page"
        :data-umami-event-page="index"
      >
        {{ index }}
      </nuxt-link>
      <nuxt-link v-else :to="{ name: 'index' }"
        data-umami-event="pagination-click-page"
        :data-umami-event-page="1"
      >
        {{ index }}
      </nuxt-link>
    </li>

    <li
      class="pagination__item pagination__item--symbol"
      :class="{
        'pagination__item--disabled': currentPage === lastPage,
      }"
    >
      <nuxt-link :to="{ name: 'page-page', params: { page: currentPage + 2 } }"
        data-umami-event="pagination-click-next"
        :data-umami-event-page="currentPage + 2"
      >
        ▸
      </nuxt-link>
    </li>
    <li class="pagination__item pagination__item--symbol">
      <nuxt-link
        :to="{
          name: 'page-page',
          params: { page: Math.round(articlesCount / perPage) },
        }"
        data-umami-event="pagination-click-last"
        :data-umami-event-page="Math.round(articlesCount / perPage)"
      >
        ▸▸
      </nuxt-link>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'PaginationComponent',
  props: {
    articlesCount: {
      type: Number,
      default: 0,
    },
    perPage: {
      type: Number,
      default: 0,
    },
    currentPage: {
      type: Number,
      default: 0,
    },
  },
  computed: {
    lastPage() {
      return Math.round(this.articlesCount / this.perPage) - 1
    },
  },
}
</script>

<style lang="postcss" scoped>
.pagination {
  position: relative;

  &__item {
    @apply inline-block border border-monochrome-300 border-solid;
    @apply mx-1;

    a {
      @apply inline-block;
      @apply px-3 py-2;
      @apply text-sm;
    }

    &--active {
      @apply bg-monochrome-800;
    }

    &--disabled {
      @apply border-monochrome-400 text-monochrome-400;
      a {
        pointer-events: none;
      }
    }

    &--active {
      @apply bg-monochrome-800;
    }
  }
}
</style>
