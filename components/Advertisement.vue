<template>
  <div class="referer">
   <p v-if="adData.showAmazon && adData.showGenial">
     <em>Ihr könnt diesen Blog - und gleichzeitig eure Buchhandlung vor Ort - unterstützen in dem ihr ihr dieses Buch bei <a :href="adData.genialokalUrl" target="_blank" rel="noopener sponsored nofollow">Genialokal</a> kauft. Oder finanziert Jeff Bezos's nächsten Weltraumspazierung und klickt diesen <a :href="adData.amazonUrl" target="_blank" rel="noopener sponsored nofollow">Amazonlink</a>.</em>
   </p>
   <p v-if="adData.showAmazon && !adData.showGenial">
     <em>Ihr könnt diesen Blog unterstützen in dem ihr ihr dieses Buch bei <a :href="adData.amazonUrl" target="_blank" rel="noopener nofollow sponsored">Amazon</a> kauft. Oder noch besser, besucht eure Buchhandlung um die Ecke. Soll dort auch ganz schön sein.</em>
   </p>
   <p v-if="!adData.showAmazon && adData.showGenial">
     <em>Ihr könnt diesen Blog - und gleichzeitig eure Buchhandlung vor Ort - unterstützen in dem ihr ihr dieses Buch bei <a :href="adData.genialokalUrl" target="_blank" rel="noopener nofollow sponsored">Genialokal</a> kauft.</em>
   </p>
  </div>
</template>

<script>
export default {
  name: 'Advertisement',
  props: {
    adData: {
      type: Object,
      default: () => {}
    }
  }
}
</script>
