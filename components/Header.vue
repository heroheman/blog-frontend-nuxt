<template>
  <header class="py-4 header sm:sticky sm:pt-16">
    <nav class="relative flex flex-wrap justify-between w-full">
      <nuxt-link to="/">
        <h1 class="flex flex-wrap items-center pr-3 sm:block">
          <img src="/img/me.jpg" alt="me" class="w-10 mb-4 mr-2" />
          <div class="text-left">
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
      <ul class="flex w-full pl-0 mt-8 text-left list-none sm:block">
        <li class="my-0 mb-6 mr-4">
          <nuxt-link class="nav-link" to="/">Artikel</nuxt-link>
        </li>
        <!-- <li class="my-0 mb-6 mr-4"> -->
        <!--   <nuxt-link class="nav-link" to="/blog">Everything</nuxt-link> -->
        <!-- </li> -->
        <!-- <li class="my-0 mb-12 mr-4"> -->
        <!--   <nuxt-link class="nav-link" to="/about">Werwiewas?</nuxt-link> -->
        <!-- </li> -->
      </ul>
      <div class="block my-0 mb-4">
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
