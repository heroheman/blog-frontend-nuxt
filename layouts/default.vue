<template>
  <div class="container">
    <div class="flex flex-wrap">
      <Header class="w-full px-8 py-2 mx-auto sm:w-1/3 lg:w-1/5" />
      <div
        class="
          flex-auto
          w-full
          min-h-full
          px-8
          py-2
          mx-auto
          sm:w-2/3
          lg:w-3/5
          main-wrapper
        "
      >
        <nuxt />
      </div>
      <Footer class="w-full px-8 py-2 mx-auto mb-8" />
    </div>
  </div>
</template>

<script>
/* eslint-disable */
export default {
  mounted() {
    this.$nextTick(() => {
      this.$nuxt.$loading.start()

      setTimeout(() => this.$nuxt.$loading.finish(), 500)
    })
  },
}
</script>

<style scoped>
.main-wrapper {
  min-height: 80vh;
}
</style>
