<template>
  <div class="min-h-screen bg-white">
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <Header class="w-full" />
      <main class="flex-1">
        <slot />
      </main>
      <Footer class="w-full" />
    </div>
  </div>
</template>

<script setup>
const { public: { strapiUrl } } = useRuntimeConfig()

// Fetch global settings
const { data: response } = await useFetch('/api/global', {
  baseURL: strapiUrl,
  query: {
    populate: '*'
  }
})

const settings = computed(() => response.value?.data || {
  sitetitle: 'flore.nz',
  sitedescription: 'The personal website of Florenz',
  Phrases: []
})

// Make settings available to child components
provide('settings', settings)
</script>

<style lang="postcss">
/* Layout styles moved to global styles */
</style>
