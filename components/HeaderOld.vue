<template>
  <header
    class="header"
    :class="{
      'header--blogpost': isPost || isCategory || isBlogIndexCompact,
      'header--index': !isPost && !isCategory && !isBlogIndexCompact,
    }"
  >
    <h1 class="header__brand">
      <nuxt-link data-umami-event="header-click-logo" to="/">
        <div class="brand">
          <div class="brand__name">
            <h1 class="mb-4 italic leading-snug">
              <!-- <figure class="brand__img">
                <img
                  src="/img/me.jpg"
                  class="w-10"
                  :alt="settings.sitetitle"
                  :title="settings.sitetitle"
                />
              </figure> -->
              {{ settings.sitetitle }}
            </h1>
            <div class="brand__slogan" v-if="settings.Phrases && settings.Phrases.length">
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
      </nuxt-link>
    </h1>

    <ul class="header__nav">
      <li class="">
        <nuxt-link data-umami-event="nav-click-article-index" to="/blog"
          >Artikel</nuxt-link
        >
      </li>
      <li class="">
        <nuxt-link
          data-umami-event="nav-click-books-index"
          to="/category/buecher"
        >
          Gelesen
        </nuxt-link>
      </li>
      <li data-umami-event="nav-click-music-index">
        <nuxt-link class="nav-link" to="/category/musik">Gehört</nuxt-link>
      </li>
      <!-- <li class=""> -->
      <!--   <nuxt-link class="nav-link" to="/blog">Everything</nuxt-link> -->
      <!-- </li> -->
      <li data-umami-event="nav-click-about">
        <nuxt-link class="nav-link" to="/about">Über</nuxt-link>
      </li>
    </ul>

    <ul class="header__social">
      <li>
        <a
          href="/feed.xml"
          target="_blank"
          title="RSS Feed"
          data-umami-event="nav-click-rss"
        >
          <SimpleIcon name="rss" size="20" class="text-orange-500" />
        </a>
      </li>

      <li>
        <a
          rel="me noopener noreferrer"
          href="https://norden.social/@florenz"
          target="_blank"
          data-umami-event="nav-click-sm-mastodon"
          title="Mastodon"
        >
          <SimpleIcon name="mastodon" size="20" class="text-blue-500" />
        </a>
      </li>
      <!-- <li v-for="(sm, index) of settings.socialmedia" :key="index"> -->
      <!--   <a -->
      <!--     rel="me noopener noreferrer" -->
      <!--     :href="sm.link" -->
      <!--     target="_blank" -->
      <!--     :title="sm.title" -->
      <!--   > -->
      <!--     <font-awesome-icon -->
      <!--       :icon="getSocialIcon(sm.icon_slug)" -->
      <!--       :style="getSocialColor(sm.color)" -->
      <!--     /> -->
      <!--   </a> -->
      <!-- </li> -->
      <li>
        <a
          rel="me noopener noreferrer"
          href="https://www.goodreads.com/user/show/64751703-florenz"
          target="_blank"
          data-umami-event="nav-click-sm-goodreads"
          title="Goodreads"
        >
          <SimpleIcon name="goodreads" size="20" class="text-gray-600" />
        </a>
      </li>
      <!-- <li>
        <a
          rel="me noopener noreferrer"
          href="https://instagram.com/flrnz"
          target="_blank"
          data-umami-event="nav-click-sm-instagram"
          title="Instagram"
        >
          <font-awesome-icon
            :icon="['fab', 'instagram']"
            :style="{ color: '#fd1d1d' }"
          />
        </a>
      </li> -->
      <!-- <li>
        <a
          rel="me noopener noreferrer"
          href="https://open.spotify.com/user/1121802350?si=96to6js2SQCDoiwpnMKLbw"
          target="_blank"
          data-umami-event="nav-click-sm-spotify"
          title="Spotify"
        >
          <font-awesome-icon
            :icon="['fab', 'spotify']"
            :style="{ color: '#1db954' }"
          />
        </a>
      </li>
      -->
      <li>
        <a
          rel="me noopener noreferrer"
          href="https://bsky.app/profile/flore.nz"
          target="_blank"
          data-umami-event="nav-click-sm-bluesky"
          title="Bluesky @flrnz.bsky.social"
        >
          <SimpleIcon name="bluesky" size="20" class="text-blue-500" />
        </a>
      </li>
      <!-- <li>
        <a
          rel="me noopener noreferrer"
          href="https://twitter.com/StadtInItalien"
          target="_blank"
          data-umami-event="nav-click-sm-twitter"
          title="Twitter"
        >
          <font-awesome-icon
            :icon="['fab', 'twitter']"
            :style="{ color: '#0084b4' }"
          />
        </a>
      </li> -->
    </ul>
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

// Reactive data
const randomHeadNumber = ref(Math.floor(Math.random() * 10))

// Computed properties
const isPost = computed(() => route.name === 'blog-post')

const isCategory = computed(() => {
  return ['category-category', 'series-series', 'category', 'genre-book', 'genre-book-bookgenre', 'author-author', 'author'].includes(route.name)
})

const isBlogIndexCompact = computed(() => route.name === 'blog')

// Methods
const getSocialIcon = (name) => `['fab', '${name}']`
const getSocialColor = (color) => `{ color: ${color} }`
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

  @apply border-b border-solid border-monochrome-500;
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
      li {
        a {
          @apply text-sm md:text-lg;
        }
      }
    }
  }

  &__nav,
  &__social {
    @apply pt-4 pb-8 px-0;

    li {
      @apply inline-block;
      @apply mr-4;

      a {
        @apply text-sm md:text-lg font-normal;
        @apply font-head;
        svg {
          @apply w-5 h-5 md:w-7 md:h-7;
        }
      }
    }
  }
}

.brand {
  display: grid;
  grid-template-areas: 'bname';
  grid-template-rows: 50px;
  grid-template-columns: 1fr;
  &__img {
    grid-area: bimg;
  }
  &__name {
    grid-area: bname;
    @apply font-head text-4xl;
    color: var(--text-title);

    .header--blogpost & {
      @apply text-base md:text-lg;
      @screen md {
        margin-top: 2px;
      }
    }
  }
  &__slogan {
    @apply text-xl italic;
    color: var(--text-secondary);

    .header--blogpost & {
      display: none;
    }
  }
}

.nav-link {
  @apply font-meta pb-1;

  &.nuxt-link-exact-active {
    @apply border-b-2 border-solid border-gray-900;
  }
}
</style>
