<template>
  <ul v-if="tagsArray.length" class="tags">
    <li v-for="(tag, index) in tagsArray" :key="index">
      <nuxt-link :to="`/blog?tag=${tag}`"> #{{ tag }} </nuxt-link>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'Tags',
  props: {
    tags: {
      type: [String],
      default: '',
    },
  },
  computed: {
    tagsArray() {
      return this.tags.split(',')
    },
  },
}
</script>

<style lang="postcss" scoped>
.tags {
  list-style: none;
  padding: 0;
  & li {
    @apply text-xs uppercase font-meta;
    @apply inline-block mr-2 p-1 rounded-sm;
    @apply bg-primary-300 text-monochrome-900;

    & a {
      font-weight: 400;
    }
  }
}
</style>
