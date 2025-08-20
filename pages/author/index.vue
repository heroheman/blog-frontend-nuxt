<template>
  <main class="main max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
    <collection-index
      show-single-collections
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
