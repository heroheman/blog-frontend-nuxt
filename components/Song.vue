  <template>
  <div class="songs" v-if="songs.length">
<div v-for="(song, index) in songs" :key="index" class="my-4 pb-4 mb-10 border-b border-solid border-[#a2a2a2]">
<p class="!mb-2"><strong class="italic">{{ song.title }}</strong></p>
<div class="relative text-sm">
<p>{{ song.description }}</p>
</div>
<yt-embed :url="song.youtube_url" v-if="song.embed_youtube" />
<ui-button
v-if="song.spotify_url !== ''"
:href="song.spotify_url"
target="_blank"
rel="noopener noreferrer"
class="mb-4 md:mr-2"
title="Auf Spotify anhören"
><font-awesome-icon :icon="['fab', 'spotify']" :style="{ color: '#1DB954' }" />Auf Spotify
</ui-button>

<ui-button
  v-if="song.youtube_url !== ''"
  :href="song.youtube_url"
  rel="noopener noreferrer"
  target="_blank"
  class="mb-4 md:mr-2"
  title="Auf YouTube anhören"
>
  <font-awesome-icon :icon="['fab', 'youtube']" :style="{ color: '#FF0000' }" />Auf YouTube
</ui-button>

<ui-button
  v-if="hasSongwhip(song)"
  :href="song.songwhip_url"
  rel="noopener noreferrer"
  target="_blank"
  title="Songwhip"
>
<font-awesome-icon :icon="['fas', 'compact-disc']" :style="{ color: '#5b5b5b' }" />Alle Plattformen
</ui-button>
</div>
<p>Alle Songs finden sich auch in meiner
<a
  href="https://open.spotify.com/playlist/6AL0K5kauc5GJRBnN1zZYi?si=8499ec9d18654a04"
  rel="noopener noreferrer"
  target="_blank"
>
  Spotify Playlist
</a>.</p></div>
</template>

<script>
export default {
  name: 'LiedgutSongs',
  props: {
    songs: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    hasSongwhip (songObj) {
      return songObj.songwhip_url !== '' && Reflect.has(songObj, 'songwhip_url')
    },
    hasYoutube (songObj) {
      return songObj.youtube_url !== '' && Reflect.has(songObj, 'youtube_url')
    },
    hasSpotify (songObj) {
      return songObj.spotify_url !== '' && Reflect.has(songObj, 'spotify_url')
    }
  }
}
</script>

<style>
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
</style>
