<template>
  <main class="w-full lg:max-w-3xl">
    <collection-index
      show-single-collections
      :collection="items.data"
      link-path="/genre/book"
    />
  </main>
</template>

<script>
export default {
  name: 'IndexGenreBooksOverview',
  data() {
    return {
      items: [],
      loading: true,
    }
  },
  async fetch() {
    try {
      const response = await fetch('https://flrnz.strapi.florenz.dev/api/genre-books?populate=*')
      const payload = await response.json()
      this.items = payload
    } catch (error) {
      console.error('Error fetching genres:', error)
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
