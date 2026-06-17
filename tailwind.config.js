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
        display: ['Playfair Display', ...defaultTheme.fontFamily.serif],
        // Brand display face, matched to the flore.nz landing page (github_profile)
        brand: ['Fraunces', 'Georgia', ...defaultTheme.fontFamily.serif],
        head: ['Crimson Text', ...defaultTheme.fontFamily.serif],
        body: ['Crimson Text', ...defaultTheme.fontFamily.serif],
        meta: ['Inter', ...defaultTheme.fontFamily.sans],
        // Space Mono — the landing page's interface/label type
        mono: ['"Space Mono"', ...defaultTheme.fontFamily.mono],
      },
      colors: {
        paper: {
          DEFAULT: '#FBF9F4',
          deep: '#F4F0E8',
        },
        ink: '#1C1B19',
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
          DEFAULT: '#A84048',
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
  plugins: [
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/typography')
  ],
}
