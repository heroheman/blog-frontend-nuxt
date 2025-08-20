<template>
  <main class="main max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
    <nav class="mb-6">
      <div class="flex gap-2 mb-4">
        <span class="px-3 py-1.5 text-sm font-meta bg-gray-100 text-gray-900 rounded-full">
          Autoren
        </span>
        <nuxt-link to="/genre/book" class="px-3 py-1.5 text-sm font-meta bg-gray-50 text-gray-600 hover:bg-gray-100 hover:text-gray-900 rounded-full transition-colors duration-200">
          Genres
        </nuxt-link>
        <nuxt-link to="/series" class="px-3 py-1.5 text-sm font-meta bg-gray-50 text-gray-600 hover:bg-gray-100 hover:text-gray-900 rounded-full transition-colors duration-200">
          Serien
        </nuxt-link>
      </div>
    </nav>
    <collection-index
      show-single-collections
      compact
      :collection="items.data"
      link-path="/author"
    />
  </main>
</template>

<script>
export default {
  name: 'IndexAuthorOverview',
  data() {
    return {
      items: { data: [] },
      loading: true,
    }
  },
  async mounted() {
    try {
      const response = await fetch('https://flrnz.strapi.florenz.dev/api/authors?populate=*&pagination[pageSize]=200')
      const payload = await response.json()
      this.items = payload
      this.loading = false
    } catch (error) {
      console.error('Error fetching authors:', error)
      this.items = { data: [] }
      this.loading = false
    }
  },
}
</script>

<style lang="postcss">
.articleview-main {
  @apply my-20;
}
</style>
