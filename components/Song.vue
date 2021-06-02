<template>
  <div class="songs">
    <div v-for="(song, index) in songs" :key="index" class="my-4 mb-10">
      <p>
        <strong>{{ song.title }}</strong>
      </p>
      <p>
        <em>{{ song.description }}</em>
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
  </div>
</template>

<script>
export default {
  props: {
    songs: {
      type: Array,
      default: () => [],
    },
  },
}
</script>
