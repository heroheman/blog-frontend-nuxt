<template>
  <header
    class="pt-8 border-b border-solid border-gray-200 pb-4"
    :class="{
      'border-b-0 pb-16 md:pb-2': isPost || isCategory || isBlogIndexCompact,
    }"
  >
    <!-- Mobile menu button -->
    <button
      @click="toggleMobileMenu"
      data-umami-event="nav-click-mobile-menu-toggle"
      :data-umami-event-state="isMobileMenuOpen ? 'close' : 'open'"
      class="md:hidden fixed top-4 right-4 z-50 p-2 bg-white rounded-lg shadow-lg border border-gray-200"
      aria-label="Toggle menu"
    >
      <svg v-if="!isMobileMenuOpen" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
      </svg>
      <svg v-else class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
      </svg>
    </button>

    <!-- Mobile menu overlay -->
    <div
      v-if="isMobileMenuOpen"
      class="md:hidden fixed inset-0 z-40 bg-white"
    >
      <div class="flex flex-col h-full justify-center items-center space-y-8">
        <nav class="flex flex-col items-center space-y-6">
          <nuxt-link
            @click="closeMobileMenu"
            data-umami-event="nav-click-article-index"
            to="/blog"
            class="text-2xl font-semibold text-gray-900 hover:text-blue-600 transition-colors"
          >
            Artikel
          </nuxt-link>
          <nuxt-link
            @click="closeMobileMenu"
            data-umami-event="nav-click-books-index"
            to="/category/buecher"
            class="text-2xl font-semibold text-gray-900 hover:text-blue-600 transition-colors"
          >
            Gelesen
          </nuxt-link>
          <nuxt-link
            @click="closeMobileMenu"
            data-umami-event="nav-click-music-index"
            class="text-2xl font-semibold text-gray-900 hover:text-blue-600 transition-colors"
            to="/category/musik"
          >
            Gehört
          </nuxt-link>
          <nuxt-link
            @click="closeMobileMenu"
            data-umami-event="nav-click-about"
            class="text-2xl font-semibold text-gray-900 hover:text-blue-600 transition-colors"
            to="/about"
          >
            Über
          </nuxt-link>
        </nav>

        <div class="flex items-center space-x-6">
          <a
            href="/feed.xml"
            target="_blank"
            title="RSS Feed"
            data-umami-event="nav-click-mobile-rss"
            class="p-3 bg-orange-100 rounded-xl hover:bg-orange-200 transition-colors"
          >
            <SimpleIcon name="rss" size="24" class="text-orange-600" />
          </a>
          <a
            rel="me noopener noreferrer"
            href="https://norden.social/@florenz"
            target="_blank"
            title="Mastodon"
            data-umami-event="nav-click-mobile-mastodon"
            class="p-3 bg-blue-100 rounded-xl hover:bg-blue-200 transition-colors"
          >
            <SimpleIcon name="mastodon" size="24" class="text-blue-600" />
          </a>
          <a
            rel="me noopener noreferrer"
            href="https://www.goodreads.com/user/show/64751703-florenz"
            target="_blank"
            title="Goodreads"
            data-umami-event="nav-click-mobile-goodreads"
            class="p-3 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors"
          >
            <SimpleIcon name="goodreads" size="24" class="text-gray-600" />
          </a>
          <a
            rel="me noopener noreferrer"
            href="https://bsky.app/profile/flore.nz"
            target="_blank"
            title="Bluesky"
            data-umami-event="nav-click-mobile-bluesky"
            class="p-3 bg-blue-100 rounded-xl hover:bg-blue-200 transition-colors"
          >
            <SimpleIcon name="bluesky" size="24" class="text-blue-600" />
          </a>
        </div>
      </div>
    </div>

    <!-- Desktop Header Layout -->
    <div class="hidden md:block max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- First Row: Logo | Nav | Dynamic Space | Social -->
      <div class="flex items-center">
        <!-- Logo -->
        <div class="flex-shrink-0 mr-8">
          <nuxt-link data-umami-event="header-click-logo" to="/">
            <h1 class="font-head italic leading-snug text-gray-900" :class="isPost || isCategory || isBlogIndexCompact ? 'text-lg' : 'text-4xl'">
              {{ settings.sitetitle }}
            </h1>
          </nuxt-link>
        </div>

        <!-- Navigation (right next to logo) -->
        <nav class="flex items-center space-x-6">
          <nuxt-link
            data-umami-event="nav-click-article-index"
            to="/blog"
            class="text-sm md:text-lg font-medium text-gray-700 hover:text-blue-600 transition-colors duration-200 font-head pb-1 border-b-2 border-transparent hover:border-blue-600"
            :class="{ 'border-blue-600 text-blue-600': $route?.path === '/blog' }"
          >
            Artikel
          </nuxt-link>
          <nuxt-link
            data-umami-event="nav-click-books-index"
            to="/category/buecher"
            class="text-sm md:text-lg font-medium text-gray-700 hover:text-blue-600 transition-colors duration-200 font-head pb-1 border-b-2 border-transparent hover:border-blue-600"
            :class="{ 'border-blue-600 text-blue-600': $route?.path?.includes('/category/buecher') }"
          >
            Gelesen
          </nuxt-link>
          <nuxt-link
            to="/category/musik"
            data-umami-event="nav-click-music-index"
            class="text-sm md:text-lg font-medium text-gray-700 hover:text-blue-600 transition-colors duration-200 font-head pb-1 border-b-2 border-transparent hover:border-blue-600"
            :class="{ 'border-blue-600 text-blue-600': $route?.path?.includes('/category/musik') }"
          >
            Gehört
          </nuxt-link>
          <nuxt-link
            to="/about"
            data-umami-event="nav-click-about"
            class="text-sm md:text-lg font-medium text-gray-700 hover:text-blue-600 transition-colors duration-200 font-head pb-1 border-b-2 border-transparent hover:border-blue-600"
            :class="{ 'border-blue-600 text-blue-600': $route?.path === '/about' }"
          >
            Über
          </nuxt-link>
        </nav>

        <!-- Dynamic Space -->
        <div class="flex-grow"></div>

        <!-- Social Media Icons (on the far right) -->
        <div class="flex items-center space-x-3">
          <a
            href="/feed.xml"
            target="_blank"
            title="RSS Feed"
            data-umami-event="nav-click-rss"
            class="p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <SimpleIcon name="rss" size="20" class="text-orange-500 hover:text-orange-600 transition-colors" />
          </a>
          <a
            rel="me noopener noreferrer"
            href="https://norden.social/@florenz"
            target="_blank"
            title="Mastodon"
            data-umami-event="nav-click-sm-mastodon"
            class="p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <SimpleIcon name="mastodon" size="20" class="text-blue-500 hover:text-blue-600 transition-colors" />
          </a>
          <a
            rel="me noopener noreferrer"
            href="https://www.goodreads.com/user/show/64751703-florenz"
            target="_blank"
            data-umami-event="nav-click-sm-goodreads"
            title="Goodreads"
            class="p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <SimpleIcon name="goodreads" size="20" class="text-gray-600 hover:text-gray-700 transition-colors" />
          </a>
          <a
            rel="me noopener noreferrer"
            href="https://bsky.app/profile/flore.nz"
            target="_blank"
            data-umami-event="nav-click-sm-bluesky"
            title="Bluesky"
            class="p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <SimpleIcon name="bluesky" size="20" class="text-blue-500 hover:text-blue-600 transition-colors" />
          </a>
        </div>
      </div>

      <!-- Second Row: Slogan (conditionally shown) -->
      <div v-if="!(isPost || isCategory || isBlogIndexCompact) && settings.Phrases && settings.Phrases.length" class="mt-4">
        <div class="text-xl italic text-gray-600">
          <span v-if="randomHeadNumber < 2">
            {{ settings.Phrases[0].phrase }}
          </span>
          <span v-else-if="randomHeadNumber < 4">
            {{ settings.Phrases[1].phrase }}
          </span>
          <span v-else-if="randomHeadNumber < 6">
            {{ settings.Phrases[2].phrase }}
          </span>
          <span v-else-if="randomHeadNumber < 8">
            {{ settings.Phrases[3].phrase }}
          </span>
          <span v-else-if="randomHeadNumber < 10">
            {{ settings.Phrases[4].phrase }}
          </span>
        </div>
      </div>
    </div>

    <!-- Mobile Header Layout -->
    <div class="md:hidden text-center max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <nuxt-link data-umami-event="header-click-logo-mobile" to="/">
        <h1 class="font-head text-3xl italic leading-snug text-gray-900 mb-4">
          {{ settings.sitetitle }}
        </h1>
      </nuxt-link>

      <div v-if="!(isPost || isCategory || isBlogIndexCompact) && settings.Phrases && settings.Phrases.length" class="text-lg italic text-gray-600">
        <span v-if="randomHeadNumber < 2">
          {{ settings.Phrases[0].phrase }}
        </span>
        <span v-else-if="randomHeadNumber < 4">
          {{ settings.Phrases[1].phrase }}
        </span>
        <span v-else-if="randomHeadNumber < 6">
          {{ settings.Phrases[2].phrase }}
        </span>
        <span v-else-if="randomHeadNumber < 8">
          {{ settings.Phrases[3].phrase }}
        </span>
        <span v-else-if="randomHeadNumber < 10">
          {{ settings.Phrases[4].phrase }}
        </span>
      </div>
    </div>
  </header>
</template>

<script setup>
const route = useRoute()

// Inject settings from the layout
const settings = inject('settings', () => reactive({
  sitetitle: 'flore.nz',
  sitedescription: 'The personal website of Florenz',
  Phrases: []
}), true)

// Mobile menu state
const isMobileMenuOpen = ref(false)

// Reactive data
const randomHeadNumber = ref(Math.floor(Math.random() * 10))

// Computed properties
const isPost = computed(() => route?.name === 'blog-slug' || (route?.path?.startsWith('/blog/') && route?.params?.slug))

const isCategory = computed(() => {
  return route?.name && ['category-category', 'series-series', 'category', 'genre-book', 'genre-book-bookgenre', 'author-author', 'author'].includes(route.name)
})

const isBlogIndexCompact = computed(() => route?.name === 'blog')

const isIndexPage = computed(() => route?.name === 'index' || route?.path === '/')

// Mobile menu methods
const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

const closeMobileMenu = () => {
  isMobileMenuOpen.value = false
}

// Close mobile menu when route changes
watch(() => route.path, () => {
  isMobileMenuOpen.value = false
})
</script>

<style lang="postcss" scoped>
/* No complex CSS needed - everything is handled with Tailwind classes in the template */
</style>
