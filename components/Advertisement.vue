<template>
  <div class="referer">
    <p v-if="adData.showAmazon && adData.showGenial">
      <em
        >Ihr könnt diesen Blog unterstützen in dem ihr ihr dieses Buch bei
        <a
          :href="adData.genialokalUrl"
          target="_blank"
          rel="noopener sponsored nofollow"
          data-umami-event="ad-click-genial-text"
          data-umami-event-source="advertisement-text"
          >Genialokal</a
        >
        oder bei
        <a
          :href="adData.amazonUrl"
          target="_blank"
          rel="noopener sponsored nofollow"
          data-umami-event="ad-click-amazon-text"
          data-umami-event-source="advertisement-text"
          >Amazon</a
        >, kauft.
        <br />
        <br />
        Bei
        <a
          href="https://www.awin1.com/cread.php?s=2518196&v=17358&q=376921&r=926729"
          target="_blank"
          rel="noopener sponsored nofollow"
          data-umami-event="ad-click-genial-general"
          data-umami-event-source="advertisement-general"
          >Genialokal</a
        >
        könnt ihr direkt bei einer lokalen Buchhandlung bestellen, abholen oder
        direkt nach Hause liefern lassen. Dies geht genauso schnell, wenn nicht
        sogar schneller als Amazon und ihr könnt euren lokalen Buchhandel
        unterstützen.<br />
        <br />
        So oder so bekomme ich einen kleinen Prozentsatz des Umsatzes. Und das
        motiviert. :)
      </em>
    </p>

    <p v-if="adData.showAmazon && !adData.showGenial">
      <em>
        Ihr könnt diesen Blog unterstützen in dem ihr ihr dieses Buch bei
        <a
          :href="adData.amazonUrl"
          target="_blank"
          rel="noopener nofollow sponsored"
          data-umami-event="ad-click-amazon-only"
          data-umami-event-source="advertisement-amazon-only"
          >Amazon</a
        >
        kauft.
      </em>
    </p>

    <p v-if="!adData.showAmazon && adData.showGenial">
      <em>
        Ihr könnt diesen Blog - und gleichzeitig eure Buchhandlung vor Ort -
        unterstützen in dem ihr ihr dieses Buch bei
        <a
          :href="adData.genialokalUrl"
          target="_blank"
          rel="noopener nofollow sponsored"
          data-umami-event="ad-click-genial-only"
          data-umami-event-source="advertisement-genial-only"
          >Genialokal</a
        >
        kauft.
      </em>
    </p>
  </div>
</template>

<script>
export default {
  name: 'Advertisement',
  props: {
    adData: {
      type: Object,
      default: () => {},
    },
  },
}
</script>

<style lang="postcss">
.referer {
  p {
    @apply p-4 border-4 border-solid border-[#fcdc4c] mb-0;
    @apply text-base;
    @apply leading-6;
  }

  a {
    @apply bg-[#fcdc4c] inline-block px-1;
    @apply border-t border-b border-white;
  }
}
</style>
