<!-- eslint-disable vue/no-v-html -->
<template>
  <div v-if="songs.length" class="songs">
    <div v-for="(song, index) in songs" :key="index" class="song">
      <p class="!mb-2">
        <strong class="italic">{{ song.title }}</strong>
      </p>

      <div
        v-if="song.description !== '' && song.description !== null"
        class="relative text-sm"
        v-html="renderMarkdown(song.description)"
      />

      <div class="mb-4">
        <strong>Genre:</strong>
        <span class="italic">{{ song.genre }}</span>
      </div>

      <yt-embed v-if="song.embed_youtube" :url="song.youtube_url" />

      <ui-button
        v-if="hasSpotify(song)"
        :href="song.spotify_url"
        target="_blank"
        rel="noopener noreferrer"
        class="mb-4"
        data-umami-event="song-click-spotify"
        :data-umami-event-song="song.title"
        title="Auf Spotify anhöremr-2"
      >
        <SimpleIcon name="spotify" size="16" class="text-green-500 mr-2" />
        Auf Spotify
      </ui-button>

      <ui-button
        v-if="hasYoutube(song)"
        :href="song.youtube_url"
        rel="noopener noreferrer"
        target="_blank"
        data-umami-event="song-click-youtube"
        :data-umami-event-song="song.title"
        title="Auf YouTube anhören"
      >
        <SimpleIcon name="youtube" size="16" class="text-red-500 mr-2" />
        Auf YouTube
      </ui-button>

      <ui-button
        v-if="hasSongwhip(song)"
        :href="song.songwhip_url"
        rel="noopener noreferrer"
        target="_blank"
        data-umami-event="song-click-songwhip"
        :data-umami-event-song="song.title"
        title="Songwhip"
      >
        <SimpleIcon name="compact-disc" size="16" class="text-gray-500 mr-2" />
        Alle Plattformen
      </ui-button>
    </div>
    <p>
      Alle Songs finden sich auch in meiner
      <a
        href="https://open.spotify.com/playlist/6AL0K5kauc5GJRBnN1zZYi?si=8499ec9d18654a04"
        rel="noopener noreferrer"
        target="_blank"
        data-umami-event="song-click-playlist"
        >Spotify Playlist</a
      >.
    </p>
  </div>
</template>

<script setup>
import { renderMarkdown } from '~/utils/helper'

defineProps({
  songs: {
    type: Array,
    default: () => [],
  },
})

const hasSongwhip = (songObj) => {
  return songObj.songwhip_url && Reflect.has(songObj, 'songwhip_url')
}

const hasYoutube = (songObj) => {
  return songObj.youtube_url && Reflect.has(songObj, 'youtube_url')
}

const hasSpotify = (songObj) => {
  return songObj.spotify_url && Reflect.has(songObj, 'spotify_url')
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
