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
    const payload = await this.$strapi.find('genre-books', {
      populate: '*', // populate all relations
    })

    this.items = payload
  },
  fetchOnServer: true,
}
</script>

<style lang="postcss">
.articleview-main {
  @apply my-20;
}
</style>
