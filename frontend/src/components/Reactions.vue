<template>
  <div class="container">
    <div class="inner">
      <div
        class="reaction-column"
        v-for="reaction in reactionsList"
        :key="reaction.name"
      >
        <img
          class="reaction"
          :src="reaction.src"
          :class="{ active: activeReaction === reaction.name }"
          tabindex="1"
        />
        <div
          class="reaction-color"
          :style="{ 'background-color': reaction.color }"
        ></div>
        <div class="percentage">{{reaction.value}}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Reactions",
  data() {
    return {
      colors: ["red", "green", "yellow", "blue"],
    };
  },
  props: {
    reactions: {
      type: Object,
    },
    activeReaction: {
      type: String,
      default: "",
    },
    images: {
      type: Array,
      required: true,
    },
  },
  computed: {
    reactionsList: function () {
      return this.images.map((e, i) => ({
        name: e,
        color: this.colors[i],
        src: require(`@/assets/icons/${e}.svg`),
        value: this.reactions[e] || 0
      }));
    },
  },
};
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
  border-radius: 30px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 10px;
}

.reaction-column {
  flex-direction: column;
  display: flex;
  align-items: center;
}

.reaction-column > * {
  margin-bottom: 10px;
}

.reaction {
  width: 50px;
  height: 50px;
  border-radius: 50%;
}

.reaction-color {
  height: 4px;
  width: 100%;
  background-color: red;
}

.percentage {
  color: white;
  font-size: 1.2em;
  text-shadow: black 1px 0 10px;
}
</style>