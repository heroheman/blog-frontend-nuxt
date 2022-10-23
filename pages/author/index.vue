<template>
  <main class="w-full lg:max-w-3xl">
    <collection-index :collection="items" link-path="/author" />
  </main>
</template>

<script>
export default {
  name: 'IndexAuthorOverview',
  data() {
    return {
      items: [],
      loading: true,
    }
  },
  async fetch() {
    // const tmp = await this.$strapi.find('authors')
    const payload = await this.$strapi.find('authors', {
      populate: 'deep,3', // populate all relations
    })

    const tmp = payload.data[0].attributes
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
