<template>
  <div class="songs" v-if="songs.length">
    <div v-for="(song, index) in songs" :key="index" class="song">
      <p class="!mb-2">
        <strong class="italic">{{ song.title }}</strong>
      </p>

      <div class="relative text-sm" v-html="$md.render(song.description)" />

      <yt-embed :url="song.youtube_url" v-if="song.embed_youtube" />

      <ui-button
        v-if="song.spotify_url !== ''"
        :href="song.spotify_url"
        target="_blank"
        rel="noopener noreferrer"
        class="mb-4 md:"
        title="Auf Spotify anhöremr-2"
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
        rel="noopener noreferrer"
        target="_blank"
        title="Auf YouTube anhören"
      >
        <font-awesome-icon
          :icon="['fab', 'youtube']"
          :style="{ color: '#FF0000' }"
        />
        Auf YouTube
      </ui-button>

      <ui-button
        v-if="hasSongwhip(song)"
        :href="song.songwhip_url"
        rel="noopener noreferrer"
        target="_blank"
        title="Songwhip"
      >
        <font-awesome-icon
          :icon="['fas', 'compact-disc']"
          :style="{ color: '#5b5b5b' }"
        />
        Alle Plattformen
      </ui-button>
    </div>
    <p>
      Alle Songs finden sich auch in meiner
      <a
        href="https://open.spotify.com/playlist/6AL0K5kauc5GJRBnN1zZYi?si=8499ec9d18654a04"
        rel="noopener noreferrer"
        target="_blank"
        >Spotify Playlist</a
      >.
    </p>
  </div>
</template>

<script>
export default {
  name: 'SongList',
  props: {
    songs: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    hasSongwhip(songObj) {
      return songObj.songwhip_url !== '' && Reflect.has(songObj, 'songwhip_url')
    },
    hasYoutube(songObj) {
      return songObj.youtube_url !== '' && Reflect.has(songObj, 'youtube_url')
    },
    hasSpotify(songObj) {
      return songObj.spotify_url !== '' && Reflect.has(songObj, 'spotify_url')
    },
  },
}
</script>

<style lang="pcss">
.video-container {
  position: relative;
  padding-bottom: 56.25%;
  padding-top: 0;
  height: 0;
  overflow: hidden;
}

.video-container iframe,
.video-container object,
.video-container embed {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.song {
  @apply my-4 py-4 pt-8 px-8 mb-10;
  @apply border-t border-solid border-[#a2a2a2];
  @apply bg-[#f6f6f6];

  p {
    @apply text-base;
  }
}
</style>
