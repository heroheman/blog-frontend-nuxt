// import glob from 'glob'
import path from 'path'
import axios from 'axios'
// import fs from 'fs'
import postcssImport from 'postcss-import'
import postcssNested from 'postcss-nesting'
import postcssPresetEnv from 'postcss-preset-env'

import { feedContentParsed } from './utils/helper'

export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'flore.nz heroheman',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: 'description',
      },
      {
        name: 'msapplication-TileColor',
        content: '#00aba9',
      },
      {
        name: 'theme-color',
        content: '#ffffff',
      },
    ],
    link: [
      {
        rel: 'alternate',
        type: 'application/rss+xml',
        title: 'flore.nz RSS',
        href: 'https://flore.nz/feed.xml',
      },
      {
        rel: 'apple-touch-icon',
        sizes: '180x180',
        href: '/apple-touch-icon.png',
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '32x32',
        href: '/favicon-32x32.png',
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '16x16',
        href: '/favicon-16x16.png',
      },
      {
        rel: 'manifest',
        href: '/site.webmanifest',
      },
      {
        rel: 'mask-icon',
        href: '/safari-pinned-tab.svg',
        color: '#5bdad5',
      },
    ], // ? Imports the font 'Karla' and is optimized by the netlify plugin 'Subfont'
    script: [
      {
        src: '//gc.zgo.at/count.js',
        async: true,
        'data-goatcounter': 'https://flrnz.goatcounter.com/count',
      },
    ],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  // css: ['@/assets/css/tailwind.css', '@/assets/css/main.pcss'],
  css: [
    '@/assets/css/main.pcss',
    'node_modules/lite-youtube-embed/src/lite-yt-embed.css',
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: ['~/plugins/youtube.client.js'],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss',
    '@nuxtjs/svg',
    '@nuxtjs/fontawesome',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/markdownit',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/strapi',
    '@nuxtjs/pwa',
    '@nuxtjs/axios',
    '@nuxtjs/feed',
  ],

  strapi: {
    // baseURL: process.env.NUXT_ENV_STRAPI_EP,
    url: 'https://flrnz-blog-backend.herokuapp.com',
    entities: ['articles', 'pages'],
  },

  router: {
    scrollBehavior(to, from, savedPosition) {
      if (savedPosition) {
        return savedPosition
      }

      return { x: 0, y: 0 }
    },
  },

  fontawesome: {
    icons: {
      brands: [
        'faTwitter',
        'faSpotify',
        'faYoutube',
        'faInstagram',
        'faGoodreads',
      ],
      solid: ['faRss'],
    },
  },

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      name: 'Flore.nz',
      lang: 'de',
    },
    icon: {
      fileName: '/icon.jpeg',
    },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    extractCSS: true,
    postcss: {
      plugins: {
        tailwindcss: path.resolve(__dirname, './tailwind.config.js'),
        'postcss-import': postcssImport,
        'postcss-nested': postcssNested,
        'postcss-preset-env': postcssPresetEnv({
          stage: 2,
          autoprefixer: true,
          features: {
            'nesting-rules': true,
          },
        }),
      },
    },
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {
      config.node = {
        fs: 'empty',
      }
    },
  },

  /*
   ** Custom additions configuration
   */
  markdownit: {
    injected: true,
    linkify: true,
    breaks: true,
    runtime: true,
    use: [
      'markdown-it-footnote',
      'markdown-it-image-lazy-loading',
      [
        'markdown-it-link-attributes',
        {
          pattern: /^https:/,
          attrs: {
            target: '_blank',
            rel: 'noopener noreferrer',
          },
        },
      ],
    ],
  },

  generate: {
    crawler: true,
    // routes() {
    //   let articles = axios
    //     .get('https://flrnz-blog-backend.herokuapp.com/articles')
    //     .then((res) => {
    //       return res.data.map((article) => {
    //         return '/blog/' + article.slug
    //       })
    //     })

    //   let pagiIndex = axios
    //     .get('https://flrnz-blog-backend.herokuapp.com/articles/count')
    //     .then((res) => {
    //       let pArray = []
    //       let n = 0
    //       let pp = res.data / 5
    //       while (n < pp) {
    //         n++
    //         pArray.push('/page/' + n)
    //       }
    //       return pArray
    //     })

    //   let pages = axios
    //     .get('https://flrnz-blog-backend.herokuapp.com/pages')
    //     .then((res) => {
    //       return res.data.map((page) => {
    //         return '/' + page.slug
    //       })
    //     })
    //   return Promise.all([articles, pages, pagiIndex]).then((values) => {
    //     return values.join().split(',')
    //   })
    // },
  },

  feed: [
    {
      path: '/feed.xml', // The route to your feed.
      async create(feed) {
        feed.options = {
          title: 'flore.nz RSS',
          link: 'http://flore.nz/feed.xml',
          description: 'RSS Feeds are not dead',
        }

        const posts = await axios.get(
          'https://flrnz-blog-backend.herokuapp.com/articles'
        )

        posts.data.forEach((post) => {
          feed.addItem({
            title: post.title,
            date: new Date(post.display_published_date),
            id: post.url,
            link: 'https://flore.nz/blog/' + post.slug,
            description: post.description,
            content: feedContentParsed(post),
          })
        })

        feed.addContributor({
          name: 'Florenz heldermann',
          email: 'moin@flore.nz',
          link: 'https://flore.nz/',
        })

        feed.items.sort((a, b) => b.date - a.date)
      },
      // cacheTime: 1000 * 60 * 15, // How long should the feed be cached
      type: 'rss2', // Can be: rss2, atom1, json1
      // data: ['Some additional data'] // Will be passed as 2nd argument to `create` function
    },
  ],
  loading: '~/components/LoadingAnimation.vue',

  // tailwindcss: {
  //   cssPath: '~/assets/css/tailwind.css',
  //   exposeConfig: false, // enables `import { theme } from '~tailwind.config'`
  // },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    baseURL: 'https://flrnz-blog-backend.herokuapp.com',
  },

  // apollo: {
  //   includeNodeModules: true,
  //   clientConfigs: {
  //     default: '@/apollo/client-configs/default.js',
  //   },
  // },
}
