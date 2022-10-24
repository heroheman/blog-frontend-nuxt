<template>
  <main class="w-full lg:max-w-3xl">
    <collection-index
      show-single-collections
      :collection="items.data"
      link-path="/series"
    />
  </main>
</template>

<script>
export default {
  name: 'IndexSeriesOverview',
  data() {
    return {
      items: [],
      loading: true,
    }
  },
  async fetch() {
    // const tmp = await this.$strapi.find('bookseries')
    // this.items = tmp
    const payload = await this.$strapi.find('bookseries', {
      populate: '*', // populate all relations
      pagination: {
        pageSize: 200,
      },
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
