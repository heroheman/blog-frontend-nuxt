<template>
  <div class="container mx-auto">
    <div class="flex flex-wrap px-10 mx-auto md:px-20">
      <Header class="w-full" :settings="settings.data.attributes" />
      <div class="flex-auto w-full">
        <nuxt :settings="settings" />
      </div>
      <Footer class="w-full mx-auto" />
    </div>
  </div>
</template>

<script>
import settingsMixin from '@/mixins/settingsMixin.js'

export default {
  name: 'DefaultLayout',
  mixins: [settingsMixin],
}
</script>

<style lang="postcss">
html {
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  padding: env(safe-area-inset);
}

body {
  background-color: var(--bg-secondary);
  color: var(--text);
  @apply transition-colors duration-200 ease-in-out;
}

.container {
  background-color: var(--bg);
  min-height: 100vh;
  max-width: 1200px;
  @apply my-0 mx-auto;
  @apply flex justify-center flex-col;
}
</style>
