<template>
  <main class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
    <article-view v-if="objIsNotEmpty(article)" detail :post="article[0]" />
    <div v-else class="flex items-center justify-center min-h-[400px]">
      <loading />
    </div>
  </main>
</template>

<script setup>
const { article, objIsNotEmpty } = await useArticlePage({ locale: 'en' })
</script>
