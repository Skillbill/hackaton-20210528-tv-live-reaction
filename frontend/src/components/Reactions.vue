<template>
  <div>
    <vue-star animate="yourAnimateCssClass" color="rgb(152, 138, 222)">
      <img/>
    </vue-star>
  </div>
</template>

<script>
import VueStar from 'vue-star'

export default {
  components: {
    VueStar
  },
  data () {
    return {image: null}
  },
  created() {

  }
}
</script>

<style>

</style>