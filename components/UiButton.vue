<template>
  <component
    :is="buttonType"
    class="block btn md:w-auto md:inline-block"
    :class="{
      [buttonClass]: buttonClass,
      [buttonSize]: buttonSize,
      [buttonFontSize]: buttonFontSize,
    }"
    :title="title"
    v-bind="buttonProps"
    @click.stop="callback($event)"
  >
    <slot />
  </component>
</template>

<script>
/**
 * Buttonelement: `a-button`
 * Add `to` for a `router-link`, add `href` for a link, use none of them for a button. Button can also emit a value with `@click`.
 */

export default {
  name: 'UiButton',
  props: {
    variant: {
      type: [String, Boolean],
      default: 'primary',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    size: {
      type: [String, Boolean],
      default: false, // sm, md, lg, md = default
    },
    href: {
      type: [String, Boolean],
      default: false,
    },
    to: {
      type: [String, Object, Boolean],
      default: false,
    },
    tag: {
      type: [String, Boolean],
      default: 'button',
    },
    title: {
      type: [String, Boolean],
      default: false,
    },
  },
  data() {
    return {
      isDisabled: false,
    }
  },
  computed: {
    buttonProps() {
      const props = {}
      if (this.to) {
        props.tag = this.tag
        props.role = 'button'
      }
      if (this.href) {
        props.is = 'a'
        props.href = this.href
      }
      if (this.disabled) props.disabled = 'disabled'

      return props
    },
    buttonType() {
      return this.to ? 'nuxt-link' : 'button'
    },
    buttonClass() {
      if (this.variant) {
        return `btn--${this.variant}`
      } else {
        return ``
      }
    },
    buttonSize() {
      if (this.size) {
        return `btn--${this.size}`
      } else {
        return ``
      }
    },
    buttonFontSize() {
      switch (this.fontSize) {
        case 'sm':
          return 'text-copy-small'
        case 'md':
          return 'text-copy-normal'
        case 'lg':
          return 'text-copy-large'
        default:
          return ''
      }
    },
  },
  methods: {
    callback(evt) {
      /**
       * Emitted when the button is clicked.
       * @event click
       * @type {Event}
       */

      // @Note the delay is neccessary to avoid a doubleclick
      if (this.isDisabled) return
      this.isDisabled = true

      setTimeout(() => {
        this.isDisabled = false
        this.$emit('click', evt)
      }, 500)
    },
  },
}
</script>

<style lang="postcss" scoped>
.btn {
  @apply border border-solid border-black;
  @apply px-4 py-2 rounded-full;
}
</style>
