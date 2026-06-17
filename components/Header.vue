<template>
  <div class="sticky top-0 z-50 w-full bg-paper/90 backdrop-blur border-b border-monochrome-600">
    <!-- Mobile menu overlay (teleported to body so the header's backdrop-blur
         doesn't trap this fixed element in a containing block) -->
    <Teleport to="body">
    <div
      v-if="isMobileMenuOpen"
      class="md:hidden fixed inset-0 z-[60] bg-paper"
    >
      <button
        @click="closeMobileMenu"
        data-umami-event="nav-click-mobile-menu-close"
        class="absolute top-5 right-4 p-2 text-ink hover:text-accent transition-colors"
        aria-label="Menü schließen"
      >
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
        </svg>
      </button>
      <div class="flex flex-col h-full justify-center items-center space-y-10">
        <nav class="flex flex-col items-center space-y-7">
          <nuxt-link
            @click="closeMobileMenu"
            data-umami-event="nav-click-article-index"
            to="/blog"
            class="font-mono text-xl uppercase tracking-[0.2em] text-ink hover:text-accent transition-colors"
          >
            Artikel
          </nuxt-link>
          <nuxt-link
            @click="closeMobileMenu"
            data-umami-event="nav-click-books-index"
            to="/category/buecher"
            class="font-mono text-xl uppercase tracking-[0.2em] text-ink hover:text-accent transition-colors"
          >
            Gelesen
          </nuxt-link>
          <a
            @click="closeMobileMenu"
            href="https://opentabs.flore.nz/"
            target="_blank"
            rel="noopener noreferrer"
            title="OpenTabs Microblog"
            data-umami-event="nav-click-opentabs-mobile"
            class="font-mono text-xl uppercase tracking-[0.2em] text-ink hover:text-accent transition-colors text-center"
          >
            Verlinkt
          </a>
          <nuxt-link
            @click="closeMobileMenu"
            data-umami-event="nav-click-music-index"
            class="font-mono text-xl uppercase tracking-[0.2em] text-ink hover:text-accent transition-colors"
            to="/category/musik"
          >
            Gehört
          </nuxt-link>
          <nuxt-link
            @click="closeMobileMenu"
            data-umami-event="nav-click-about"
            class="font-mono text-xl uppercase tracking-[0.2em] text-ink hover:text-accent transition-colors"
            to="/about"
          >
            Über
          </nuxt-link>
        </nav>

        <!-- Social icons (uniform tone) -->
        <div class="flex items-center space-x-6 text-monochrome-100">
          <a
            rel="me noopener noreferrer"
            href="https://norden.social/@florenz"
            target="_blank"
            title="Mastodon"
            data-umami-event="nav-click-mobile-mastodon"
            class="hover:text-accent transition-colors"
          >
            <SimpleIcon name="mastodon" size="26" />
          </a>
          <a
            rel="me noopener noreferrer"
            href="https://www.goodreads.com/user/show/64751703-florenz"
            target="_blank"
            title="Goodreads"
            data-umami-event="nav-click-mobile-goodreads"
            class="hover:text-accent transition-colors"
          >
            <SimpleIcon name="goodreads" size="26" />
          </a>
          <a
            rel="me noopener noreferrer"
            href="https://bsky.app/profile/flore.nz"
            target="_blank"
            title="Bluesky"
            data-umami-event="nav-click-mobile-bluesky"
            class="hover:text-accent transition-colors"
          >
            <SimpleIcon name="bluesky" size="26" />
          </a>
        </div>

        <!-- RSS feeds -->
        <div class="flex items-center gap-5 font-mono text-xs uppercase tracking-[0.12em] text-monochrome-100">
          <a href="/feed.xml" target="_blank" title="RSS Feed (Artikel)" data-umami-event="nav-click-mobile-rss" class="inline-flex items-center gap-1.5 hover:text-accent transition-colors">
            <SimpleIcon name="rss" size="15" /> RSS
          </a>
          <a href="/feed-en.xml" target="_blank" title="RSS Feed (English)" data-umami-event="nav-click-mobile-rss-en" class="inline-flex items-center gap-1.5 hover:text-accent transition-colors">
            <SimpleIcon name="rss" size="15" /> EN
          </a>
          <a href="https://opentabs.flore.nz/recommendations/feed" target="_blank" rel="noopener noreferrer" title="OpenTabs Linkblog Feed" data-umami-event="nav-click-mobile-opentabs-rss" class="inline-flex items-center gap-1.5 hover:text-accent transition-colors">
            <SimpleIcon name="rss" size="15" /> Linkblog
          </a>
        </div>
      </div>
    </div>
    </Teleport>

    <div class="max-w-6xl xl:max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Desktop Header Layout -->
      <div class="hidden md:flex items-center py-4">
        <!-- Logo -->
        <div class="flex-shrink-0 mr-10">
          <nuxt-link data-umami-event="header-click-logo" to="/">
            <span class="brand-logo font-brand text-3xl font-medium tracking-tight text-ink leading-none">
              <template v-for="(part, i) in logoParts" :key="i"><span v-if="i" class="text-accent">.</span>{{ part }}</template>
            </span>
          </nuxt-link>
        </div>

        <!-- Navigation -->
        <nav class="flex items-center gap-7">
          <nuxt-link
            data-umami-event="nav-click-article-index"
            to="/blog"
            class="nav-link font-mono text-[0.72rem] uppercase tracking-[0.18em] text-ink hover:text-accent transition-colors duration-200"
            :class="{ 'is-active text-accent': $route?.path === '/blog' }"
          >
            Artikel
          </nuxt-link>
          <nuxt-link
            data-umami-event="nav-click-books-index"
            to="/category/buecher"
            class="nav-link font-mono text-[0.72rem] uppercase tracking-[0.18em] text-ink hover:text-accent transition-colors duration-200"
            :class="{ 'is-active text-accent': $route?.path?.includes('/category/buecher') }"
          >
            Gelesen
          </nuxt-link>
          <a
            href="https://opentabs.flore.nz/"
            target="_blank"
            rel="noopener noreferrer"
            title="OpenTabs Microblog"
            data-umami-event="nav-click-opentabs"
            class="nav-link font-mono text-[0.72rem] uppercase tracking-[0.18em] text-ink hover:text-accent transition-colors duration-200"
          >
            Verlinkt
          </a>
          <nuxt-link
            to="/category/musik"
            data-umami-event="nav-click-music-index"
            class="nav-link font-mono text-[0.72rem] uppercase tracking-[0.18em] text-ink hover:text-accent transition-colors duration-200"
            :class="{ 'is-active text-accent': $route?.path?.includes('/category/musik') }"
          >
            Gehört
          </nuxt-link>
          <nuxt-link
            to="/about"
            data-umami-event="nav-click-about"
            class="nav-link font-mono text-[0.72rem] uppercase tracking-[0.18em] text-ink hover:text-accent transition-colors duration-200"
            :class="{ 'is-active text-accent': $route?.path === '/about' }"
          >
            Über
          </nuxt-link>
        </nav>

        <!-- Dynamic Space -->
        <div class="flex-grow"></div>

        <!-- Social Media Icons (uniform tone) -->
        <div class="flex items-center space-x-1 text-monochrome-100">
          <!-- RSS popover -->
          <div class="relative">
            <button
              @click="toggleRss"
              data-umami-event="nav-click-rss-toggle"
              :aria-expanded="isRssOpen"
              aria-label="RSS Feeds"
              title="RSS Feeds"
              class="p-2 rounded-lg hover:bg-paper-deep hover:text-accent transition-colors"
              :class="{ 'text-accent': isRssOpen }"
            >
              <SimpleIcon name="rss" size="20" />
            </button>

            <!-- click-away backdrop -->
            <div v-if="isRssOpen" class="fixed inset-0 z-40" @click="isRssOpen = false"></div>

            <!-- popover -->
            <div
              v-if="isRssOpen"
              class="absolute right-0 mt-2 w-56 z-50 rounded-lg border border-monochrome-600 bg-paper shadow-lg py-1"
            >
              <a
                href="/feed.xml"
                target="_blank"
                @click="isRssOpen = false"
                data-umami-event="nav-click-rss"
                class="flex items-center gap-2.5 px-3 py-2 font-mono text-xs uppercase tracking-[0.08em] text-ink hover:bg-paper-deep hover:text-accent transition-colors"
              >
                <SimpleIcon name="rss" size="15" /> Artikel <span class="text-monochrome-300 normal-case">· Deutsch</span>
              </a>
              <a
                href="/feed-en.xml"
                target="_blank"
                @click="isRssOpen = false"
                data-umami-event="nav-click-rss-en"
                class="flex items-center gap-2.5 px-3 py-2 font-mono text-xs uppercase tracking-[0.08em] text-ink hover:bg-paper-deep hover:text-accent transition-colors"
              >
                <SimpleIcon name="rss" size="15" /> Articles <span class="text-monochrome-300 normal-case">· English</span>
              </a>
              <a
                href="https://opentabs.flore.nz/recommendations/feed"
                target="_blank"
                rel="noopener noreferrer"
                @click="isRssOpen = false"
                data-umami-event="nav-click-opentabs-rss"
                class="flex items-center gap-2.5 px-3 py-2 font-mono text-xs uppercase tracking-[0.08em] text-ink hover:bg-paper-deep hover:text-accent transition-colors"
              >
                <SimpleIcon name="rss" size="15" /> Linkblog <span class="text-monochrome-300 normal-case">· Verlinkt</span>
              </a>
            </div>
          </div>

          <a
            rel="me noopener noreferrer"
            href="https://norden.social/@florenz"
            target="_blank"
            title="Mastodon"
            data-umami-event="nav-click-sm-mastodon"
            class="p-2 rounded-lg hover:bg-paper-deep hover:text-accent transition-colors"
          >
            <SimpleIcon name="mastodon" size="20" />
          </a>
          <a
            rel="me noopener noreferrer"
            href="https://www.goodreads.com/user/show/64751703-florenz"
            target="_blank"
            data-umami-event="nav-click-sm-goodreads"
            title="Goodreads"
            class="p-2 rounded-lg hover:bg-paper-deep hover:text-accent transition-colors"
          >
            <SimpleIcon name="goodreads" size="20" />
          </a>
          <a
            rel="me noopener noreferrer"
            href="https://bsky.app/profile/flore.nz"
            target="_blank"
            data-umami-event="nav-click-sm-bluesky"
            title="Bluesky"
            class="p-2 rounded-lg hover:bg-paper-deep hover:text-accent transition-colors"
          >
            <SimpleIcon name="bluesky" size="20" />
          </a>
        </div>
      </div>

      <!-- Mobile Header Layout -->
      <div class="md:hidden flex items-center justify-between py-4">
        <nuxt-link data-umami-event="header-click-logo-mobile" to="/" @click="closeMobileMenu">
          <span class="brand-logo font-brand text-2xl font-medium tracking-tight text-ink leading-none">
            <template v-for="(part, i) in logoParts" :key="i"><span v-if="i" class="text-accent">.</span>{{ part }}</template>
          </span>
        </nuxt-link>

        <button
          @click="toggleMobileMenu"
          data-umami-event="nav-click-mobile-menu-toggle"
          :data-umami-event-state="isMobileMenuOpen ? 'close' : 'open'"
          class="relative z-[9999] p-2 -mr-2 text-ink"
          aria-label="Toggle menu"
        >
          <svg v-if="!isMobileMenuOpen" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
          </svg>
          <svg v-else class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
const route = useRoute()

// Inject settings from the layout
const settings = inject('settings', () => reactive({
  sitetitle: 'flore.nz',
  sitedescription: 'The personal website of Florenz',
  Phrases: []
}), true)

// Logo split on "." so the dot can take the brand accent (e.g. flore·.·nz)
const logoParts = computed(() => (settings.value?.sitetitle || 'flore.nz').split('.'))

// Mobile menu state
const isMobileMenuOpen = ref(false)
// RSS popover state
const isRssOpen = ref(false)

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

const closeMobileMenu = () => {
  isMobileMenuOpen.value = false
}

const toggleRss = () => {
  isRssOpen.value = !isRssOpen.value
}

// Close menus when route changes
watch(() => route.path, () => {
  isMobileMenuOpen.value = false
  isRssOpen.value = false
})
</script>

<style lang="postcss" scoped>
.brand-logo {
  font-optical-sizing: auto;
}

/* Draw-in underline, matched to the flore.nz landing page link interaction */
.nav-link {
  position: relative;
  padding-bottom: 3px;
}
.nav-link::after {
  content: "";
  position: absolute;
  left: 0;
  bottom: 0;
  height: 1px;
  width: 100%;
  background: #a84048; /* accent */
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.45s cubic-bezier(0.16, 1, 0.3, 1);
}
.nav-link:hover::after,
.nav-link.is-active::after {
  transform: scaleX(1);
}
</style>
