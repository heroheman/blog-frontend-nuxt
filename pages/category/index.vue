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
    // const tmp = await this.$strapi.find('categories')
    const payload = await this.$strapi.find('categories', {
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
