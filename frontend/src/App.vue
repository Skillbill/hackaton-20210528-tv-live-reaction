<template>
  <div id="tv">
    <TVStream />
  </div>
  <div id="overlay">
    <Reactions :images="images" :reactions="reactions"/>
  </div>
</template>

<script>
import TVStream from './components/TVStream.vue'
import Reactions from './components/Reactions.vue'
import { init as initApi, sendReaction } from './lib/api';
import { KEY_CODES } from './lib/keyCodes.js';

export default {
  name: "App",
  components: {
    TVStream,
    Reactions
  },
  data () {
    return {
      reactions: {},
      images: [ "angry", "dizzy", "laughing", "smile"],
      reaction: ''
    }
  },
  created() {
    initApi({
      onReactions: (reactions) => {
        this.reactions = reactions;
      },
      onStatusChange: console.log
    });

    document.addEventListener("keypress", event => {
      let reaction = ''
      switch(event.keyCode) {
        case KEY_CODES.RED:
          reaction = 'red'
          break;
        case KEY_CODES.GREEN:
          reaction = 'green'
          break;
        case KEY_CODES.YELLOW:
          reaction = 'yellow'
          break;
        case KEY_CODES.BLUE:
          reaction = 'blue'
          break;
      }
      if(reaction) {
        sendReaction(reaction)
      }
    })
  }
};
</script>

<style lang="scss">
@import '~animate.css/source/animate.css';

* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

#overlay,
#tv {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}

#tv {
  z-index: 0;
  background-color: black;
}

#overlay {
  z-index: 1;
}
</style>
