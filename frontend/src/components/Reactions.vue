<template>
  <div>
    <img :src="image"/>
  </div>
</template>

<script>
import Angry from '../assets/icons/emoji-angry.svg';

export default {
  data() {
    return {image: Angry}
  }
}
</script>

<style>

</style>