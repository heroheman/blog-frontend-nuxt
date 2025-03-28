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
            <div class="brand__slogan" v-if="settings.Phrases.length">
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
      <li data-umami-event="nav-click-about" class="umami--click--nav-about">
        <nuxt-link class="nav-link" to="/about">Über</nuxt-link>
      </li>
    </ul>

    <ul class="header__social">
      <li>
        <a
          href="/feed.xml"
          target="_blank"
          title="RSS Feed"
          umami--click--nav-article
        >
          <font-awesome-icon icon="rss" :style="{ color: '#ee802f' }" />
        </a>
      </li>

      <li>
        <a
          rel="me noopener noreferrer"
          href="https://norden.social/@florenz"
          target="_blank"
          class="umami--click--social-mastodon"
          data-umami-event="nav-click-sm-mastodon"
          title="Mastodon"
        >
          <font-awesome-icon
            :icon="['fab', 'mastodon']"
            :style="{ color: '#0084b4' }"
          />
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
          <font-awesome-icon
            :icon="['fab', 'goodreads']"
            :style="{ color: '#666666' }"
          />
        </a>
      </li>
      <!-- <li>
        <a
          rel="me noopener noreferrer"
          href="https://instagram.com/flrnz"
          target="_blank"
           class="umami--click--social-instagram"
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
          class="umami--click--social-spotify"
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
          href="https://bsky.app/profile/flrnz.bsky.social"
          target="_blank"
          class="umami--click--social-bluesky"
          data-umami-event="nav-click-sm-bluesky"
          title="Bluesky @flrnz.bsky.social"
        >
          <font-awesome-icon
            :icon="['fab', 'bluesky']"
            :style="{ color: '#0084b4' }"
          />
        </a>
      </li>
      <!-- <li>
        <a
          rel="me noopener noreferrer"
          href="https://twitter.com/StadtInItalien"
          target="_blank"
           class="umami--click--social-twitter"
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

<script>
export default {
  name: 'HeaderGlobal',
  props: {
    // eslint-disable-next-line vue/require-default-prop
    settings: {
      type: Object,
      value: () => {},
    },
  },
  data() {
    return {
      randomHeadNumber: Math.floor(Math.random() * 10),
    }
  },
  computed: {
    isPost() {
      return this.$route.name === 'blog-post'
    },
    isCategory() {
      if (
        this.$route.name === 'category-category' ||
        this.$route.name === 'series-series' ||
        this.$route.name === 'category' ||
        this.$route.name === 'genre-book' ||
        this.$route.name === 'genre-book-bookgenre' ||
        this.$route.name === 'author-author' ||
        this.$route.name === 'author'
      ) {
        return true
      } else {
        return false
      }
    },
    isBlogIndexCompact() {
      return this.$route.name === 'blog'
    },
  },
  methods: {
    getSocialIcon(name) {
      return `['fab', '${name}']`
    },
    getSocialColor(color) {
      return `{ color: ${color} }`
    },
  },
}
// grid-template-areas: 'nav social' 'brand brand';
// grid-template-rows: 1fr 2fr;
// grid-template-columns: 1fr 1fr;
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
