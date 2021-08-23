<template>
  <main class="w-full lg:max-w-3xl">
    <collection-index :collection="items" link-path="/genre/book" />
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
    const tmp = await this.$strapi.find('genre-books')
    this.items = tmp
  },
  fetchOnServer: true,
}
</script>

<style lang="postcss">
.articleview-main {
  @apply my-20;
}
</style>
