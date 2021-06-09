<template>
  <header class="py-4 header lg:sticky sm:pt-16">
    <nav class="relative flex flex-wrap justify-between w-full">
      <nuxt-link class="w-1/6 sm:w-1/6 lg:w-full" to="/">
        <h1 class="flex flex-wrap items-center pr-3 lg:block">
          <figure class="lg:w-1/3 lg:mb-4">
            <img src="/img/me.jpg" alt="me" class="w-10" />
          </figure>
          <div class="text-left w-full hidden lg:table">
            <span class="block font-meta">Florenz Heldermann</span>
            <span class="mb-4 text-xs italic text-gray-500">
              <span v-if="randomHeadNumber < 2">
                Ein Untertitel, der mich treffend beschreibt. Unbedingt vor
                Livegang austauschen
              </span>
              <span v-else-if="randomHeadNumber < 4">
                Stadtinitalien Heroheman
              </span>
              <span v-else-if="randomHeadNumber < 6">
                Triggerwarnung für dass/das
              </span>
              <span v-else-if="randomHeadNumber < 8">
                Jetzt mit 2% mehr Liebe pro Artikel
              </span>
              <span v-else-if="randomHeadNumber < 10">
                Der Mensch verschluckt im Durchschnitt 12 Spinnen pro Minute
              </span>
            </span>
          </div>
        </h1>
      </nuxt-link>

      <ul
        class="
          flex
          w-full
          sm:w-3/6
          lg:w-full
          pl-0
          mt-8
          sm:mt-2
          lg:mt-8
          text-sm
          sm:text-base
          text-left
          list-none
          lg:block
          sm:justify-end
          lg:justify-start
        "
      >
        <li class="my-0 mb-6 mr-4">
          <nuxt-link class="nav-link" to="/">Artikel</nuxt-link>
        </li>
        <li class="my-0 mb-6 mr-4">
          <nuxt-link class="nav-link" to="/blog">Everything</nuxt-link>
        </li>
        <li class="my-0 mb-12 mr-4">
          <nuxt-link class="nav-link" to="/about">Werwiewas?</nuxt-link>
        </li>
      </ul>

      <div class="text-right lg:text-left block mt-3 mb-4 sm:w-2/6 lg:w-full">
        <a
          class="mr-4 nav-link"
          href="/feed.xml"
          target="_blank"
          title="RSS Feed"
        >
          <font-awesome-icon icon="rss" :style="{ color: '#ee802f' }" />
        </a>
        <a
          class="mr-4 nav-link"
          href="https://www.goodreads.com/user/show/64751703-florenz"
          target="_blank"
          title="Goodreads"
        >
          <font-awesome-icon
            :icon="['fab', 'goodreads']"
            :style="{ color: '#666666' }"
          />
        </a>
        <a
          class="mr-4 nav-link"
          href="https://instagram.com/flrnz"
          target="_blank"
          title="Instagram"
        >
          <font-awesome-icon
            :icon="['fab', 'instagram']"
            :style="{ color: '#fd1d1d' }"
          />
        </a>
        <a
          class="mr-4 nav-link"
          href="https://open.spotify.com/user/1121802350?si=96to6js2SQCDoiwpnMKLbw"
          target="_blank"
          title="Spotify"
        >
          <font-awesome-icon
            :icon="['fab', 'spotify']"
            :style="{ color: '#1db954' }"
          />
        </a>
        <a
          class="mr-4 nav-link"
          href="https://twitter.com/StadtInItalien"
          target="_blank"
          title="Twitter"
        >
          <font-awesome-icon
            :icon="['fab', 'twitter']"
            :style="{ color: '#0084b4' }"
          />
        </a>
      </div>
    </nav>
  </header>
</template>

<script>
export default {
  name: 'Header',
  data() {
    return {
      randomHeadNumber: Math.floor(Math.random() * 10),
    }
  },
}
</script>

<style lang="postcss" scoped>
.header {
  height: 100%;
  top: 0;
}

.nav-link {
  @apply font-meta pb-1;

  &.nuxt-link-exact-active {
    @apply border-b-2 border-solid border-gray-900;
  }
}
</style>
