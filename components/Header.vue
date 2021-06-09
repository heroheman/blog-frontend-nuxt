<template>
  <header class="header">
    <h1 class="header__brand">
      <nuxt-link class="" to="/">
        <div class="brand">
          <!-- <figure class="brand__img"> -->
          <!--   <img src="/img/me.jpg" alt="me" class="w-10" /> -->
          <!-- </figure> -->
          <div class="brand__name">
            <div class="mb-4 italic">Florenz Heldermann</div>
            <div class="brand__slogan">
              <span v-if="randomHeadNumber < 2">
                "Ein Untertitel, der mich treffend beschreibt. Unbedingt vor
                Livegang austauschen"
              </span>
              <span v-else-if="randomHeadNumber < 4">
                "Vollgepackt mit tollen Sachen, die das Leben schöner machen,
                hinein ins Weekend-Feeling"
              </span>
              <span v-else-if="randomHeadNumber < 6">
                "I, I will be king. And you, you will be queen. Though nothing
                will drive them away. We can beat them, just for one day. We can
                be Heroes, just for one day."
              </span>
              <span v-else-if="randomHeadNumber < 8">
                "Tanz immer so als würden dich alle sehen"
              </span>
              <span v-else-if="randomHeadNumber < 10">
                "Empty your mind, be formless, shapeless — like water. ... Now
                water can flow or it can crash. Be water, my friend. Oder
                Kaffee. Kaffee ist auch gut. — Bruce Lee"
              </span>
            </div>
          </div>
        </div>
      </nuxt-link>
    </h1>

    <ul class="header__nav">
      <li class="">
        <nuxt-link class="nav-link" to="/">Artikel</nuxt-link>
      </li>
      <li class="">
        <nuxt-link class="nav-link" to="/blog">Everything</nuxt-link>
      </li>
      <li class="">
        <nuxt-link class="nav-link" to="/about">Werwiewas?</nuxt-link>
      </li>
    </ul>

    <ul class="header__social">
      <li>
        <a href="/feed.xml" target="_blank" title="RSS Feed">
          <font-awesome-icon icon="rss" :style="{ color: '#ee802f' }" />
        </a>
      </li>
      <li>
        <a
          href="https://www.goodreads.com/user/show/64751703-florenz"
          target="_blank"
          title="Goodreads"
        >
          <font-awesome-icon
            :icon="['fab', 'goodreads']"
            :style="{ color: '#666666' }"
          />
        </a>
      </li>
      <li>
        <a href="https://instagram.com/flrnz" target="_blank" title="Instagram">
          <font-awesome-icon
            :icon="['fab', 'instagram']"
            :style="{ color: '#fd1d1d' }"
          />
        </a>
      </li>
      <li>
        <a
          href="https://open.spotify.com/user/1121802350?si=96to6js2SQCDoiwpnMKLbw"
          target="_blank"
          title="Spotify"
        >
          <font-awesome-icon
            :icon="['fab', 'spotify']"
            :style="{ color: '#1db954' }"
          />
        </a>
      </li>
      <li>
        <a
          href="https://twitter.com/StadtInItalien"
          target="_blank"
          title="Twitter"
        >
          <font-awesome-icon
            :icon="['fab', 'twitter']"
            :style="{ color: '#0084b4' }"
          />
        </a>
      </li>
    </ul>
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
  @apply pt-8;
  display: grid;
  grid-template-areas: 'social nav' 'brand brand';
  grid-template-rows: 1fr 2fr;
  grid-template-columns: 1fr 1fr;

  &__brand {
    grid-area: brand;
  }
  &__nav {
    grid-area: nav;
    text-align: right;
  }
  &__social {
    grid-area: social;
    @apply py-4 px-0;
  }

  &__nav,
  &__social {
    @apply pt-4 pb-8 px-0;

    li {
      @apply inline-block;
      @apply mr-4;

      a {
        @apply text-lg uppercase font-normal;
        svg {
          @apply w-7 h-7;
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
  }
  &__slogan {
    @apply text-2xl;
    color: var(--text-secondary);
  }
}

.nav-link {
  @apply font-meta pb-1;

  &.nuxt-link-exact-active {
    @apply border-b-2 border-solid border-gray-900;
  }
}
</style>
