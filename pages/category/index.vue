<template>
  <main class="w-full lg:w-3/4">
    <collection-index :collection="items" link-path="/category" />
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
    const tmp = await this.$strapi.find('categories')
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
