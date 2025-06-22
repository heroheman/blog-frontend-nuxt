/* eslint-disable prettier/prettier */
import { feedContentParsed } from './utils/helper'

// TODO: env file to uberspace... somehow
const BLOG_EP = process.env.STRAPI_URL || 'https://flrnz.strapi.florenz.dev'

export default defineNuxtConfig({
  // Compatibility version
  compatibilityDate: '2025-06-22',

  // Disable certain warnings
  typescript: {
    typeCheck: false
  },

  // Build configuration to reduce middleware conflicts
  build: {
    transpile: []
  },

  // Runtime config
  runtimeConfig: {
    public: {
      strapiUrl: BLOG_EP,
    }
  },

  // Global page headers
  app: {
    head: {
      title: 'flore.nz',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
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
          rel: 'icon',
          type: 'image/x-icon',
          href: '/favicon.ico',
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
          color: '#5bbad5',
        },
      ],
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
  },

  // Global CSS
  css: [
    '@/assets/css/main.pcss',
    'lite-youtube-embed/src/lite-yt-embed.css'
  ],

  // Plugins
  plugins: [
    '~/plugins/youtube.client.js'
  ],

  // Auto import components
  components: true,

  // Modules
  modules: [
    '@nuxtjs/tailwindcss',
  ],

  /*
  // FontAwesome config - Disabled for Nuxt 3 migration
  fontawesome: {
    component: 'fa',
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
  */

  /*
  // MarkdownIt config - Disabled, using 'marked' instead
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
    ],
  },
  */

  // Nitro config for generation
  nitro: {
    prerender: {
      crawlLinks: true,
      routes: ['/sitemap.xml']
    },
    experimental: {
      wasm: true
    }
  },

  // Route rules to prevent middleware conflicts
  routeRules: {
    // Static pages
    '/': { prerender: true },
    // Disable prerendering for dynamic routes to prevent middleware conflicts
    '/blog/**': { prerender: false },
    '/category/**': { prerender: false },
    '/author/**': { prerender: false },
    '/series/**': { prerender: false },
    '/genre/**': { prerender: false },
    // API routes
    '/api/**': { prerender: false }
  },

  // Experimental features
  experimental: {
    payloadExtraction: false
  },

  // Hooks to suppress middleware warnings
  hooks: {
    'nitro:config': (nitroConfig) => {
      // Basic nitro config setup
      if (!nitroConfig.handlers) nitroConfig.handlers = []
    }
  },

  // PostCSS config
  postcss: {
    plugins: {
      'tailwindcss/nesting': {},
      tailwindcss: {},
      'postcss-import': {},
      autoprefixer: {},
    },
  },

  /*
  // Feed config - Disabled for Nuxt 3 migration
  feed: [
    {
      path: '/feed.xml',
      async create(feed: any) {
        feed.options = {
          title: 'flore.nz RSS',
          link: 'http://flore.nz/feed.xml',
          description: 'RSS Feeds are not dead',
        }

        const posts = await $fetch(`${BLOG_EP}/api/articles?populate=*&sort%5B0%5D=createdAt:DESC`)

        posts.data.forEach((post: any) => {
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

        feed.items.sort((a: any, b: any) => b.date - a.date)
      },
      type: 'rss2',
    },
  ],
  */

  /*
  // Sitemap config - Disabled for Nuxt 3 migration
  sitemap: {
    hostname: 'https://flore.nz',
    gzip: true,
    defaults: {
      changefreq: 'daily',
      priority: 1,
      lastmod: new Date(),
    },
    sources: [
      async () => {
        const articles = await $fetch(`${BLOG_EP}/api/articles?populate=*`)
        return articles.data.map((article: any) => `/blog/${article.slug}`)
      },
      async () => {
        const pages = await $fetch(`${BLOG_EP}/api/pages`)
        return pages.data.map((page: any) => `/${page.slug}`)
      },
      async () => {
        const categories = await $fetch(`${BLOG_EP}/api/categories`)
        return categories.data.map((page: any) => `/category/${page.slug}`)
      },
      async () => {
        const bookSeries = await $fetch(`${BLOG_EP}/api/bookseries`)
        return bookSeries.data.map((page: any) => `/series/${page.slug}`)
      },
      async () => {
        const genreBooks = await $fetch(`${BLOG_EP}/api/genre-books`)
        return genreBooks.data.map((page: any) => `/genre/book/${page.slug}`)
      },
      async () => {
        const bookAuthors = await $fetch(`${BLOG_EP}/api/authors`)
        return bookAuthors.data.map((page: any) => `/author/${page.slug}`)
      }
    ]
  },
  */
})
