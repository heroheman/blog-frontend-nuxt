<template>
  <div class="container">
    <div class="flex flex-wrap">
      <Header class="w-full px-8 py-2 mx-auto lg:w-1/3 xl:w-1/5" />
      <div
        class="
          flex-auto
          w-full
          min-h-full
          px-8
          py-2
          mx-auto
          lg:w-2/3
          xl:w-3/5
          main-wrapper
        "
      >
        <nuxt />
      </div>
      <Footer class="w-full px-8 py-2 mx-auto mb-8" />
    </div>
  </div>
</template>

<style lang="postcss">
.main-wrapper {
  min-height: 80vh;
}
</style>
