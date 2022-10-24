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
    // const tmp = await this.$strapi.find('genre-books')
    // const payload = await this.$strapi.find('bookseries', {
    //   populate: 'deep,3', // populate all relations
    // })

    // const tmp = payload.data[0].attributes
    // this.items = tmp
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
