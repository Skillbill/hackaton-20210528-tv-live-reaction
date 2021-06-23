<template>
  <video loop ref="video"></video>
  <div class="click-message" v-if="isBrowser && clickMessage">
    <span>click to play the video</span>
  </div>
</template>

<script>
import shaka from "shaka-player";
import { isBrowser } from "../lib/platformCheck";

export default {
  data() {
    return {
      clickMessage: false,
      isBrowser: isBrowser()
    };
  },

  mounted() {
    shaka.polyfill.installAll();

    const video = this.$refs.video;
    const player = new shaka.Player(video);

    player.load(
      "https://storage.googleapis.com/shaka-demo-assets/sintel/dash.mpd"
    );

    video.addEventListener("loadedmetadata", () => {
      video.play().catch((e) => {
        console.error(e);
        this.clickMessage = true;
      });
    });

    video.addEventListener("play", () => {
      this.clickMessage = false;
    });

    if (this.isBrowser) {
      document.addEventListener("click", () => {
        if (video.paused) {
          video.play().catch(console.error);
        }
      });
    }
  },
};
</script>

<style scooped lang="scss">
video,
.click-message {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
}

.click-message {
  background-image: url("../assets/play.svg");
  background-position: center;
  background-size: contain;
  background-repeat: no-repeat;

  span {
    color: white;
    position: absolute;
    bottom: 30%;
    left: 0;
    right: 0;
    text-align: center;
  }
}
</style>