<template>
  <div id="tv">
    <TVStream />
  </div>
  <div id="app">
    <Reactions />
  </div>
</template>

<script>
import TVStream from './components/TVStream.vue'
import Reactions from './components/Reactions.vue'

export default {
  name: "App",
  components: {
    TVStream,
    Reactions
  },
};
</script>

<style>
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

#app,
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

#app {
  z-index: 1;
}
</style>
