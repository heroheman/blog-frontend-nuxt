<template>
  <footer class="footer">
    &copy; 1983 - {{ new Date().getFullYear() }} - flore.nz -
    <nuxt-link data-umami-event="footer-click-imprint" to="/impressum">Impressum</nuxt-link> -
    <nuxt-link data-umami-event="footer-click-privacy" to="/datenschutz">Datenschutz</nuxt-link>
  </footer>
</template>

<style lang="postcss">
.footer {
  @apply py-4 text-left;
  @apply border-t border-solid border-gray-400;
  @apply text-sm text-gray-400;
}
</style>
