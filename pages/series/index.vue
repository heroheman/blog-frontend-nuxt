<template>
  <main class="w-full lg:max-w-3xl">
    <collection-index :collection="items" link-path="/series" />
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
    const tmp = await this.$strapi.find('bookseries')
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
