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
      titleTemplate: '%s | flore.nz',
      htmlAttrs: {
        lang: 'de',
      },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          name: 'description',
          content: 'Persönlicher Blog mit Gedanken, Meinungen und Einblicken zu verschiedenen Themen des Lebens, der Technologie und mehr.',
        },
        {
          name: 'author',
          content: 'Florenz'
        },
        {
          name: 'robots',
          content: 'index, follow'
        },
        {
          name: 'googlebot',
          content: 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1'
        },
        {
          name: 'format-detection',
          content: 'telephone=no'
        },
        {
          property: 'og:site_name',
          content: 'flore.nz'
        },
        {
          property: 'og:type',
          content: 'website'
        },
        {
          property: 'og:locale',
          content: 'de_DE'
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
    'nuxt-module-feed',
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

  // Feed configuration
  feed: {
    sources: [
      {
        path: '/feed.xml',
        type: 'rss2',
        cacheTime: 60 * 15, // 15 minutes
      }
    ]
  },

  devtools: {
    enabled: false
  }
})
