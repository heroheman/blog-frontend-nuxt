<template>
  <div class="relative mb-4 article-text lg:max-w-3xl">
    <div v-show="false" class="slot"><slot /></div>
    <div v-html="$md.render(body)"></div>
  </div>
</template>

<script>
export default {
  name: 'ArticleMarkdown',
  data() {
    return {
      body: '',
    }
  },
  mounted() {
    console.log(this.$el.getElementsByClassName('slot')[0].innerHTML)
    this.body = this.$el.getElementsByClassName('slot')[0].innerHTML
    // console.log(this.$el.getElementsByClassName('markdown')[0].innerHTML)
  },
}
</script>
