<template>
  <div class="container">
    <div class="flex flex-wrap">
      <Header class="w-full px-8 py-2 mx-auto sm:w-1/4 md:w-1/5" />
      <div
        class="
          flex-auto
          w-full
          min-h-full
          px-8
          py-2
          mx-auto
          sm:w-3/4
          md:w-4/5
          main-wrapper
        "
      >
        <nuxt />
      </div>
      <Footer class="w-full px-8 py-2 mx-auto mb-8" />
    </div>
  </div>
</template>

<script></script>

<style scoped>
.main-wrapper {
  min-height: 80vh;
}
</style>
