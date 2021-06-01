<template>
  <article
    role="article"
    class="text-left articleview-main"
    v-if="post !== undefined"
  >
    <!-- {{ post }} -->
    <div class="flex flex-col mb-4">
      <nuxt-link v-if="!detail" :to="`blog/${post.slug}`" class="text-center">
        <h2 class="article-title title">
          {{ post.title }}
        </h2>
      </nuxt-link>

      <h2 v-else class="article-title title">
        {{ post.title }}
      </h2>

      <div class="text-center">
        <h6 v-if="post.display_published_date" class="date">
          {{ formatDate(post.display_published_date) }}
        </h6>
      </div>
    </div>

    <div class="relative" v-html="$md.render(post.body)" />

    <template v-if="!!songs">
      <div v-for="(song, index) in songs" :key="index" class="my-4 mb-10">
        <p>
          <strong>
            {{ song.title }}
          </strong>
        </p>
        <p>
          <em>
            {{ song.description }}
          </em>
        </p>
        <ui-button
          v-if="song.spotify_url !== ''"
          :href="song.spotify_url"
          target="_blank"
          class="mb-4 md:mr-2"
        >
          <font-awesome-icon
            :icon="['fab', 'spotify']"
            :style="{ color: '#1DB954' }"
          />
          Auf Spotify
        </ui-button>
        <ui-button
          v-if="song.youtube_url !== ''"
          :href="song.youtube_url"
          target="_blank"
        >
          <font-awesome-icon
            :icon="['fab', 'youtube']"
            :style="{ color: '#FF0000' }"
          />
          Auf YouTube
        </ui-button>
      </div>
    </template>

    <rating v-if="!!rating" class="w-full" :rating="rating.ratingnumber" />

    <tags v-if="detail" class="mt-8" :tags="post.Tags" />

    <!-- <nuxt-link -->
    <!--   v-if="!detail && bodyText.length > 1" -->
    <!--   :to="`blog/${post.slug}`" -->
    <!--   class=" -->
    <!--     inline-block -->
    <!--     px-6 -->
    <!--     py-2 -->
    <!--     my-4 -->
    <!--     rounded-sm -->
    <!--     bg-primary-500 -->
    <!--     text-monochrome-999 -->
    <!--   " -->
    <!-- > -->
    <!--   Weiterlesen -->
    <!-- </nuxt-link> -->
  </article>
</template>

<script>
import { formatDate } from '@/utils/helper.js'
export default {
  name: 'ArticleView',
  props: {
    post: {
      type: Object,
      default: () => {},
    },
    detail: {
      type: [Boolean],
      default: false,
    },
  },
  computed: {
    rating() {
      if (this.post.additional.length) {
        return this.post.additional.filter(
          (addi) => addi.__typename === 'ComponentContentRating'
        )[0]
      } else {
        return false
      }
    },
    songs() {
      if (this.post.additional.length) {
        return this.post.additional.filter(
          (addi) => addi.__typename === 'ComponentMediaTrack'
        )
      } else {
        return false
      }
    },
    bodyText() {
      const text = this.post.body.split('<!--more-->')
      return text
    },
  },
  methods: {
    formatDate,
  },
}
</script>
