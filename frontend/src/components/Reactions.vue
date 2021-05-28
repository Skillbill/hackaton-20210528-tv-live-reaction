<template>
  <div class="container">
    <div class="inner">
      <img class="reaction"
        :src="image.src" 
        v-for="image in images" 
        :key="image"
        tabindex="1" />
    </div>
  </div>
</template>

<script>
import Angry from '../assets/icons/emoji-angry.svg';
import Dizzy from '../assets/icons/emoji-dizzy.svg';
import Laughing from '../assets/icons/emoji-laughing.svg';
import Smile from '../assets/icons/emoji-smile.svg';

export default {
  name: 'Reactions',
  data() {
    return {
      images: [{name:'angry', src: Angry}, {name:'dizzy', src: Dizzy}, {name:'laughing', src: Laughing}, {name:'smile', src: Smile}]
    }
  },
  props: {
    reactions: {
      type: Object
    }
  }
}
</script>

<style scoped>
.container {
  position: absolute;
  bottom: 50px;
  right: 0;
  left: 0;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.inner {
  width: 50%;
  max-width: 300px;
  min-width: 100px;
  height: 100%;
  background-color: #FB6703;
  border-radius: 30px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 10px;
}

.reaction {
  width: 30px;
  height: 30px;
}

.reaction.active {
  width: 40px;
  height: 40px;
}

.reaction:focus, .reaction:hover {
  width: 40px;
  height: 40px;
}
</style>