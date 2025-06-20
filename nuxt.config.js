/* eslint-disable prettier/prettier */
// import glob from 'glob'
// import path from 'path'
import axios from 'axios'
// import fs from 'fs'
// import postcssImport from 'postcss-import'
// import postcssNested from 'postcss-nesting'
// import postcssPresetEnv from 'postcss-preset-env'

import { feedContentParsed } from './utils/helper'

// TODO: env file to uberspace... somehow
const BLOG_EP = process.env.STRAPI_URL || 'https://strapi.flore.nz'

export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  publicRuntimeConfig: {
    // strapiUrl: process.env.STRAPI_URL || 'http://localhost:1337',
    strapiUrl: BLOG_EP,
  },

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'flore.nz',
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
      {
        name: 'fediverse:creator',
        content: '@florenz@norden.social'
      }

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
      {
        rel: 'me',
        href: 'https://github.com/heroheman',
      },
      {
        rel: 'webmention',
        href: 'https://webmention.io/flore.nz/webmention',
      },
      {
        rel: 'authorization_endpoint',
        href: 'https://indieauth.com/auth',
      },
      {
        rel: 'token_endpoint',
        href: 'https://tokens.indieauth.com/token',
      }
      // {
      //   rel: 'webmention',
      //   href: 'https://webmention.io/flore.nz/webmention',
      // }
    ], // ? Imports the font 'Karla' and is optimized by the netlify plugin 'Subfont'

    script: [
      {
        src: 'https://stats.florenz.dev/script.js',
        async: true,
        defer: true,
        'data-website-id': '63875107-1ca4-4f07-94b0-a075336f4bd4'
      },
      {
        src: 'https://umami.florenz.dev/script.js',
        async: true,
        defer: true,
        'data-website-id': '507df4fa-c87c-4ba8-aa8c-a2450e92c622',
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
  plugins: ['~/plugins/youtube.client.js', '~/plugins/strapi.js'],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxt/postcss8',
    '@nuxtjs/tailwindcss',
    '@nuxtjs/svg',
    '@nuxtjs/fontawesome',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/markdownit',
    // https://go.nuxtjs.dev/pwa
    // '@nuxtjs/strapi',
    '@nuxtjs/pwa',
    '@nuxtjs/axios',
    '@nuxtjs/feed',
    '@nuxtjs/robots',
    '@nuxtjs/sitemap',
  ],

  // strapi: {
  // baseURL: process.env.NUXT_ENV_STRAPI_EP,
  // url: process.env.STRAPI_URL || http://localhost:1337
  // url: BLOG_EP,
  // entities: ['articles', 'pages'],
  // },

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
        'faBluesky',
        'faMastodon',
        'faGithub',
        'faAmazon',
      ],
      solid: ['faRss', 'faCompactDisc', 'faBookOpen', 'faEnvelope'],
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
        'tailwindcss/nesting': {},
        tailwindcss: {},
        'postcss-import': {},
        autoprefixer: {},
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
    html: true,
    breaks: true,
    runtime: true,
    use: [
      'markdown-it-footnote',
      ['markdown-it-implicit-figures', { figcaption: true }],
      [
        'markdown-it-video',
        {
          youtube: { width: 640, height: 390, nocookie: true },
          vimeo: { width: 500, height: 281 },
        },
      ],
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
      'markdown-it-image-lazy-loading',
    ],
  },

  generate: {
    crawler: true,
    exclude: [
      /^\/page\/[-+][1-9]/
    ],
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
          // 'https://flrnz-blog-backend.herokuapp.com/articles'
          // `${BLOG_EP}/api/articles?populate=*`
          `${BLOG_EP}/api/articles?populate=*&sort%5B0%5D=createdAt:DESC`
        )

        posts.data.data.forEach((post) => {
          feed.addItem({
            title: post.attributes.title,
            date: new Date(post.attributes.display_published_date),
            id: post.attributes.url,
            link: 'https://flore.nz/blog/' + post.attributes.slug,
            description: post.attributes.description,
            content: feedContentParsed(post.attributes),
            // content: post.attributes.body,
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

  sitemap: {
    hostname: 'https://flore.nz',
    gzip: true,
    defaults: {
      changefreq: 'daily',
      priority: 1,
      lastmod: new Date(),
    },
    routes: () => {
      const articles = axios
        .get('http://strapi.flore.nz/api/articles?populate=deep,3')
        // .then(res => { console.log(res); return res;})
        .then((res) => {
          return res.data.data.map((article) => {
            return '/blog/' + article.attributes.slug
          })
        })

      const pagiIndex = axios
        .get('https://strapi.flore.nz/api/articles')
        .then((res) => {
          const pArray = []
          let n = 0
          const pp = res.data.meta.pagination.total / 10
          while (n < pp) {
            n++
            pArray.push('/page/' + n)
          }
          return pArray
        })

      const pages = axios
        .get('http://strapi.flore.nz/api/pages')
        .then((res) => {
          return res.data.data.map((page) => {
            return '/' + page.attributes.slug
          })
        })

      const categories = axios
        .get('http://strapi.flore.nz/api/categories')
        .then((res) => {
          return res.data.data.map((page) => {
            return '/category/' + page.attributes.slug
          })
        })

      const bookSeries = axios
        .get('http://strapi.flore.nz/api/bookseries')
        .then((res) => {
          return res.data.data.map((page) => {
            return '/series/' + page.attributes.slug
          })
        })

      const genreBooks = axios
        .get('http://strapi.flore.nz/api/genre-books')
        .then((res) => {
          return res.data.data.map((page) => {
            return '/genre/book/' + page.attributes.slug
          })
        })

      const bookAuthors = axios
        .get('http://strapi.flore.nz/api/authors')
        .then((res) => {
          return res.data.data.map((page) => {
            return '/author/' + page.attributes.slug
          })
        })

      return Promise.all([
        articles,
        pages,
        pagiIndex,
        categories,
        bookSeries,
        genreBooks,
        bookAuthors,
      ]).then((values) => {
        return values.join().split(',')
      })
    },
  },

  // tailwindcss: {
  //   cssPath: '~/assets/css/tailwind.css',
  //   exposeConfig: false, // enables `import { theme } from '~tailwind.config'`
  // },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // baseURL: 'https://flrnz-blog-backend.herokuapp.com',
    baseURL: 'https://strapi.flore.nz',
  },

  // apollo: {
  //   includeNodeModules: true,
  //   clientConfigs: {
  //     default: '@/apollo/client-configs/default.js',
  //   },
  // },
}
