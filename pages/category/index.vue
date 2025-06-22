<template>
  <main class="w-full lg:w-3/4">
    <collection-index
      show-single-collections
      :collection-title="title"
      :collection="items.data"
      link-path="/category"
    />
  </main>
</template>

<script>
export default {
  name: 'IndexCategoryOverview',
  data() {
    return {
      items: [],
      loading: true,
    }
  },
  async fetch() {
    try {
      const response = await fetch('https://flrnz.strapi.florenz.dev/api/categories?populate=*&pagination[pageSize]=200')
      const payload = await response.json()
      this.items = payload
    } catch (error) {
      console.error('Error fetching categories:', error)
      this.items = { data: [] }
    }
  },
  fetchOnServer: true,
}
</script>

<style lang="postcss">
.articleview-main {
  @apply my-20;
}
</style>
