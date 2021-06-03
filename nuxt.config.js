// import glob from 'glob'
import path from 'path'
import axios from 'axios'
// import fs from 'fs'
import postcssImport from 'postcss-import'
import postcssNested from 'postcss-nesting'
import postcssPresetEnv from 'postcss-preset-env'

const md = require('markdown-it')()

export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: 'server',
  ssr: true,

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
  css: ['@/assets/css/main.pcss'],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [],

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
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/apollo',
    '@nuxtjs/axios',
    '@nuxtjs/markdownit',
    // https://go.nuxtjs.dev/pwa
    // '@nuxtjs/strapi',
    '@nuxtjs/pwa',
    '@nuxtjs/feed',
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {},

  apollo: {
    includeNodeModules: true,
    clientConfigs: {
      default: '@/apollo/client-configs/default.js',
    },
    // clientConfigs: {
    //   default: {
    //     httpEndpoint: 'https://api.flore.nz/graphql',
    //   }
    // }
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
      lang: 'en',
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
  tailwindcss: {
    cssPath: '~/assets/css/tailwind.css',
    exposeConfig: false, // enables `import { theme } from '~tailwind.config'`
  },

  markdownit: {
    injected: true,
    linkify: true,
    breaks: true,
    runtime: true,
    use: ['markdown-it-footnote'],
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

        const posts = await axios.get('https://api.flore.nz/posts')

        // const sortedPosts = posts.data.sort(
        //   (a, b) =>
        //   new Date(a.display_published_date).getTime() / 1000 <
        //     new Date(b.display_published_date).getTime() / 1000
        // )

        posts.data.forEach((post) => {
          const mdcontent = md.render(post.body)
          feed.addItem({
            title: post.title,
            date: new Date(post.display_published_date),
            id: post.url,
            link: 'https://flore.nz/blog/' + post.slug,
            description: post.description,
            content: post.body ? mdcontent : post.description,
            // image: post.cover
            //   ? 'https://flore.nz/' + cover.formats.small.url
            //   : '',
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

  // pwa: {
  //   icon: {
  //     source: 'static/icon.jpeg',
  //     filename: 'icon.jpeg'
  //   },
  //   manifest: { name: SITE_INFO.sitename || process.env.npm_package_name || '', lang: process.env.lang },
  //   meta: {
  //     name: SITE_INFO.sitename || process.env.npm_package_name || '',
  //     lang: process.env.lang,
  //     ogHost: process.env.URL,
  //     ogImage: '/icon.jpeg'
  //   }
  // }
}
