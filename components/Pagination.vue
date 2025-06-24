<template>
  <nav aria-label="Pagination" class="flex justify-center">
    <div class="flex items-center space-x-1 sm:space-x-2">
      <!-- First page -->
      <nuxt-link
        :to="{ name: 'page-page', params: { page: 1 } }"
        data-umami-event="pagination-click-first"
        data-umami-event-page="1"
        class="pagination-btn pagination-btn--nav"
        :class="{ 'pagination-btn--disabled': currentPage === 0 }"
      >
        <span class="sr-only">First page</span>
        ◂◂
      </nuxt-link>

      <!-- Previous page -->
      <nuxt-link
        :to="{ name: 'page-page', params: { page: Math.max(currentPage, 1) } }"
        data-umami-event="pagination-click-prev"
        :data-umami-event-page="Math.max(currentPage, 1)"
        class="pagination-btn pagination-btn--nav"
        :class="{ 'pagination-btn--disabled': currentPage === 0 }"
      >
        <span class="sr-only">Previous page</span>
        ◂
      </nuxt-link>

      <!-- Page numbers -->
      <div class="flex items-center space-x-1">
        <nuxt-link
          v-for="index in totalPages"
          :key="index"
          :to="index === 1 ? { name: 'index' } : { name: 'page-page', params: { page: index } }"
          data-umami-event="pagination-click-page"
          :data-umami-event-page="index"
          class="pagination-btn"
          :class="{ 'pagination-btn--active': index - 1 === currentPage }"
        >
          {{ index }}
        </nuxt-link>
      </div>

      <!-- Next page -->
      <nuxt-link
        :to="{ name: 'page-page', params: { page: Math.min(currentPage + 2, totalPages) } }"
        data-umami-event="pagination-click-next"
        :data-umami-event-page="Math.min(currentPage + 2, totalPages)"
        class="pagination-btn pagination-btn--nav"
        :class="{ 'pagination-btn--disabled': currentPage === lastPage }"
      >
        <span class="sr-only">Next page</span>
        ▸
      </nuxt-link>

      <!-- Last page -->
      <nuxt-link
        :to="{ name: 'page-page', params: { page: totalPages } }"
        data-umami-event="pagination-click-last"
        :data-umami-event-page="totalPages"
        class="pagination-btn pagination-btn--nav"
        :class="{ 'pagination-btn--disabled': currentPage === lastPage }"
      >
        <span class="sr-only">Last page</span>
        ▸▸
      </nuxt-link>
    </div>
  </nav>
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
      return Math.max(Math.ceil(this.articlesCount / this.perPage) - 1, 0)
    },
    totalPages() {
      return Math.max(Math.ceil(this.articlesCount / this.perPage), 1)
    }
  },
}
</script>

<style lang="postcss" scoped>
.pagination-btn {
  @apply inline-flex items-center justify-center;
  @apply w-10 h-10 text-sm font-meta font-medium;
  @apply text-gray-700 bg-white border border-gray-200;
  @apply transition-all duration-200 ease-in-out;
  @apply focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2;

  &:hover:not(.pagination-btn--disabled):not(.pagination-btn--active) {
    @apply bg-gray-50 border-gray-300 text-gray-900;
  }

  &--active {
    @apply bg-gray-900 border-gray-900 text-white;
    @apply cursor-default;
  }

  &--nav {
    @apply text-gray-500;

    &:hover:not(.pagination-btn--disabled) {
      @apply text-gray-700;
    }
  }

  &--disabled {
    @apply text-gray-300 cursor-not-allowed;
    pointer-events: none;
  }
}

/* Mobile adjustments */
@media (max-width: 640px) {
  .pagination-btn {
    @apply w-8 h-8 text-xs;
  }
}
</style>
