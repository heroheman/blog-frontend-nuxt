<template>
  <footer class="footer">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 text-sm text-gray-500 font-meta">
        <div class="flex flex-wrap items-center gap-x-2 gap-y-1">
          <span>&copy; 1983 - {{ new Date().getFullYear() }} flore.nz</span>
        </div>
        <div class="flex flex-wrap items-center gap-x-4 gap-y-2">
          <nuxt-link
            data-umami-event="footer-click-imprint"
            to="/impressum"
            class="text-gray-500 hover:text-gray-700 transition-colors duration-200"
          >
            Impressum
          </nuxt-link>
          <nuxt-link
            data-umami-event="footer-click-privacy"
            to="/datenschutz"
            class="text-gray-500 hover:text-gray-700 transition-colors duration-200"
          >
            Datenschutz
          </nuxt-link>
        </div>
      </div>
    </div>
  </footer>
</template>

<style lang="postcss" scoped>
.footer {
  @apply border-t border-gray-200 bg-gray-50 mt-16 sm:mt-20;
}

/* Mobile adjustments */
@media (max-width: 640px) {
  .footer {
    @apply mt-12;
  }
}
</style>
