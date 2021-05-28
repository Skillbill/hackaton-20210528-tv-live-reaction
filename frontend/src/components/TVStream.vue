<template>
  <video autoplay ref="video"></video>
</template>

<script>
import shaka from "shaka-player";

export default {
  mounted() {
    shaka.polyfill.installAll();

    const video = this.$refs.video;
    const player = new shaka.Player(video);

    player.load('https://storage.googleapis.com/shaka-demo-assets/sintel/dash.mpd');

    video.play().catch(console.error);
  }
}
</script>

<style>
video {
  height: 100%;
  width: 100%;
}
</style>