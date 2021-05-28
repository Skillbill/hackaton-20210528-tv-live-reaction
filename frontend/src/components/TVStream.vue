<template>
  <video autoplay ref="video"></video>
</template>

<script>
import shaka from "shaka-player";
import { isBrowser } from "../lib/platformCheck";

export default {
  mounted() {
    shaka.polyfill.installAll();

    const video = this.$refs.video;
    const player = new shaka.Player(video);

    player.load('https://storage.googleapis.com/shaka-demo-assets/sintel/dash.mpd');

    if(isBrowser()) {
      document.addEventListener("click", () => {
        if(video.paused) {
          console.log("play");
          video.play().catch(console.error);
        } else {
          console.log("pause");
          video.pause();
        }
      });
    }

    window.video = video;
  }
}
</script>

<style>
video {
  height: 100%;
  width: 100%;
}
</style>