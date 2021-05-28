<template>
  <div id="tv">
    <TVStream />
  </div>
  <div id="overlay">
    <Reactions :images="availableReactions" :reactions="reactionsTotal"/>
    <ReactionsFeedback :reaction="userReaction" :reactionsTotal="reactionsTotal"/>
  </div>
</template>

<script>
import TVStream from './components/TVStream.vue'
import Reactions from './components/Reactions.vue'
import ReactionsFeedback from './components/ReactionsFeedback.vue'
import { init as initApi, sendReaction } from './lib/api';
import { KEY_CODES } from './lib/keyCodes.js';

export default {
  name: "App",
  components: {
    TVStream,
    Reactions,
    ReactionsFeedback
  },
  data () {
    return {
      reactionsTotal: {},
      availableReactions: [],
      userReaction: ''
    }
  },
  created() {
    initApi({
      onReactions: (reactions) => {
        this.reactionsTotal = reactions;
      },
      onStatusChange: (reactions) => {
        if(reactions.length > 0) {
          this.availableReactions = reactions;
        } else {
          this.availableReactions = [];
        }
      }
    });

    document.addEventListener("keypress", event => {
      if(this.availableReactions.length > 0) {
        let reaction = ''
        switch(event.keyCode) {
          case KEY_CODES.RED:
            reaction = this.availableReactions[0]
            break;
          case KEY_CODES.GREEN:
            reaction = this.availableReactions[1]
            break;
          case KEY_CODES.YELLOW:
            reaction = this.availableReactions[2]
            break;
          case KEY_CODES.BLUE:
            reaction = this.availableReactions[3]
            break;
        }
        if(reaction) {
          this.userReaction = reaction
          sendReaction(reaction)
        }
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
