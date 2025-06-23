<template>
  <header
    class="header"
    :class="{
      'header--blogpost': isPost || isCategory || isBlogIndexCompact,
      'header--index': !isPost && !isCategory && !isBlogIndexCompact,
    }"
  >
    <!-- Mobile menu button -->
    <button
      v-if="!isPost && !isCategory && !isBlogIndexCompact"
      @click="toggleMobileMenu"
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
      v-if="isMobileMenuOpen && (!isPost && !isCategory && !isBlogIndexCompact)"
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
            class="text-2xl font-semibold text-gray-900 hover:text-blue-600 transition-colors" 
            to="/category/musik"
          >
            Gehört
          </nuxt-link>
          <nuxt-link 
            @click="closeMobileMenu"
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
            class="p-3 bg-orange-100 rounded-xl hover:bg-orange-200 transition-colors"
          >
            <SimpleIcon name="rss" size="24" class="text-orange-600" />
          </a>
          <a
            rel="me noopener noreferrer"
            href="https://norden.social/@florenz"
            target="_blank"
            title="Mastodon"
            class="p-3 bg-blue-100 rounded-xl hover:bg-blue-200 transition-colors"
          >
            <SimpleIcon name="mastodon" size="24" class="text-blue-600" />
          </a>
          <a
            rel="me noopener noreferrer"
            href="https://bsky.app/profile/flore.nz"
            target="_blank"
            title="Bluesky"
            class="p-3 bg-blue-100 rounded-xl hover:bg-blue-200 transition-colors"
          >
            <SimpleIcon name="bluesky" size="24" class="text-blue-600" />
          </a>
        </div>
      </div>
    </div>

    <div class="header__brand">
      <nuxt-link data-umami-event="header-click-logo" to="/">
        <div class="brand">
          <div class="brand__name">
            <h1 class="mb-2 lg:mb-4 italic leading-snug text-gray-900">
              {{ settings.sitetitle }}
            </h1>
            <div class="brand__slogan" v-if="settings.Phrases && settings.Phrases.length">
              <span v-if="randomHeadNumber < 2" class="text-gray-600">
                {{ settings.Phrases[0].phrase }}
              </span>
              <span v-else-if="randomHeadNumber < 4" class="text-gray-600">
                {{ settings.Phrases[1].phrase }}
              </span>
              <span v-else-if="randomHeadNumber < 6" class="text-gray-600">
                {{ settings.Phrases[2].phrase }}
              </span>
              <span v-else-if="randomHeadNumber < 8" class="text-gray-600">
                {{ settings.Phrases[3].phrase }}
              </span>
              <span v-else-if="randomHeadNumber < 10" class="text-gray-600">
                {{ settings.Phrases[4].phrase }}
              </span>
            </div>
          </div>
        </div>
      </nuxt-link>
    </div>

    <nav class="header__nav hidden md:flex">
      <nuxt-link 
        data-umami-event="nav-click-article-index" 
        to="/blog"
        class="nav-link"
      >
        Artikel
      </nuxt-link>
      <nuxt-link
        data-umami-event="nav-click-books-index"
        to="/category/buecher"
        class="nav-link"
      >
        Gelesen
      </nuxt-link>
      <nuxt-link 
        class="nav-link" 
        to="/category/musik"
        data-umami-event="nav-click-music-index"
      >
        Gehört
      </nuxt-link>
      <nuxt-link 
        class="nav-link" 
        to="/about"
        data-umami-event="nav-click-about"
      >
        Über
      </nuxt-link>
    </nav>

    <div class="header__social hidden md:flex">
      <a
        href="/feed.xml"
        target="_blank"
        title="RSS Feed"
        class="social-link"
      >
        <SimpleIcon name="rss" size="20" class="text-orange-500 hover:text-orange-600 transition-colors" />
      </a>
      <a
        rel="me noopener noreferrer"
        href="https://norden.social/@florenz"
        target="_blank"
        class="social-link"
        data-umami-event="nav-click-sm-mastodon"
        title="Mastodon"
      >
        <SimpleIcon name="mastodon" size="20" class="text-blue-500 hover:text-blue-600 transition-colors" />
      </a>
      <a
        rel="me noopener noreferrer"
        href="https://www.goodreads.com/user/show/64751703-florenz"
        target="_blank"
        data-umami-event="nav-click-sm-goodreads"
        title="Goodreads"
        class="social-link"
      >
        <SimpleIcon name="goodreads" size="20" class="text-gray-600 hover:text-gray-700 transition-colors" />
      </a>
      <a
        rel="me noopener noreferrer"
        href="https://bsky.app/profile/flore.nz"
        target="_blank"
        class="social-link"
        data-umami-event="nav-click-sm-bluesky"
        title="Bluesky"
      >
        <SimpleIcon name="bluesky" size="20" class="text-blue-500 hover:text-blue-600 transition-colors" />
      </a>
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
const isPost = computed(() => route.name === 'blog-post')

const isCategory = computed(() => {
  return ['category-category', 'series-series', 'category', 'genre-book', 'genre-book-bookgenre', 'author-author', 'author'].includes(route.name)
})

const isBlogIndexCompact = computed(() => route.name === 'blog')

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
.header {
  @apply pt-8;
  display: grid;

  &--index {
    grid-template-areas: 'nav' 'brand' 'social';
    grid-template-rows: 60px minmax(260px, auto) 60px;
    grid-template-columns: 1fr;
    @screen md {
      grid-template-areas: 'nav' 'brand' 'social';
      grid-template-rows: 80px minmax(150px, auto) 60px;
      grid-template-columns: 1fr;
    }
  }

  &--blogpost {
    grid-template-areas: 'brand' 'nav';
    grid-template-rows: 30px 20px;
    grid-template-columns: 1fr;
    @screen md {
      grid-template-areas: 'brand nav';
      grid-template-rows: 60px;
      grid-template-columns: auto 1fr;
    }
  }

  @apply border-b border-solid border-gray-200;
  @apply pb-4;

  &.header--blogpost {
    @apply border-b-0 pb-16 md:pb-2;
  }

  &__brand {
    grid-area: brand;
  }
  &__nav {
    grid-area: nav;
  }
  &__social {
    grid-area: social;
    .header--blogpost & {
      display: none;
    }
    @apply py-4 px-0;
  }

  &__nav {
    .header--blogpost & {
      @apply pt-0 text-left md:ml-4;
    }
    
    @apply pt-4 pb-8 px-0 space-x-6;
    
    .nav-link {
      @apply text-sm md:text-lg font-medium text-gray-700 hover:text-blue-600 transition-colors duration-200;
      @apply font-head pb-1;

      &.router-link-exact-active {
        @apply border-b-2 border-solid border-blue-600 text-blue-600;
      }
    }
  }

  &__social {
    @apply pt-4 pb-8 px-0 flex space-x-4;

    .social-link {
      @apply p-2 rounded-lg hover:bg-gray-100 transition-colors;
    }
  }
}

.brand {
  display: grid;
  grid-template-areas: 'bname';
  grid-template-rows: 50px;
  grid-template-columns: 1fr;
  
  &__name {
    grid-area: bname;
    @apply font-head text-4xl;

    .header--blogpost & {
      @apply text-base md:text-lg;
      @screen md {
        margin-top: 2px;
      }
    }
  }
  
  &__slogan {
    @apply text-xl italic;

    .header--blogpost & {
      display: none;
    }
  }
}
</style>
