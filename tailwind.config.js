const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: [
    './components/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './nuxt.config.{js,ts}',
    './app.vue'
  ],
  theme: {
    screens: {
      xs: '475px',
      ...defaultTheme.screens,
    },
    extend: {
      fontFamily: {
        head: ['Playfair Display', ...defaultTheme.fontFamily.serif],
        body: ['PT Serif', ...defaultTheme.fontFamily.serif],
        meta: ['Open Sans', ...defaultTheme.fontFamily.sans],
        mono: [...defaultTheme.fontFamily.mono],
      },
      colors: {
        monochrome: {
          100: '#5E5E5E',
          200: '#797979',
          300: '#949494',
          400: '#AFAFAF',
          500: '#CACACA',
          600: '#e5e5e5',
          700: '#E7E7E7',
          800: '#E9E9E9',
          900: '#ECECEC',
          910: '#EEEEEE',
          920: '#F0F0F0',
          930: '#F2F2F2',
          950: '#F4F4F4',
          999: '#FFFFFF',
        },
        primary: {
          100: '#ECEFF5',
          200: '#CBD2E1',
          300: '#ABB6CD',
          400: '#8C9AB7',
          500: '#6F7FA0',
          default: '#526488',
          600: '#3E4F70',
          700: '#2C3A57',
          800: '#1C263B',
          900: '#0D131E',
        },
        accent: {
          100: '#F9E9EA',
          200: '#EEC3C6',
          300: '#E09FA4',
          400: '#CF7D83',
          500: '#BD5D65',
          default: '#A84048',
          600: '#8D2D34',
          700: '#6E1D23',
          800: '#4D1015',
          900: '#280709',
        },
      },
      opacity: {
        10: '0.1',
        20: '0.2',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require('@tailwindcss/aspect-ratio')],
}
