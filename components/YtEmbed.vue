<template>
  <div v-if="url !== '' && url" class="mb-10 video-container">
    <lite-youtube
      :videoid="getYoutubeId(url)"
      :playlabel="getYoutubeId(url)"
      params="modestbranding=2&rel=0&enablejsapi=1"
    />
  </div>
</template>

<script>
export default {
  name: 'YouTubeEmbed',
  props: {
    url: {
      type: [Boolean, String],
      default: false,
    },
  },
  methods: {
    getYoutubeId(url) {
      if (url) {
        const videoId = url.split('v=')[1]
        const ampersandPosition = videoId.indexOf('&')
        if (ampersandPosition !== -1) {
          return videoId.substring(0, ampersandPosition)
        } else {
          return videoId
        }
      } else {
        return false
      }
    },
  },
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
