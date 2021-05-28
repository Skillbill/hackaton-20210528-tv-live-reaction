<template>
  <div ref="feedbacks" id="feedbacks"></div>
</template>

<script>
export default {
  name: "ReactionsFeedback",
  data() {
    return {};
  },
  props: {
    reaction: {
      type: String,
      default: "",
    },
    reactionsTotal: {
      type: Object
    }
  },
  watch: {
    reaction: function (val) {
      this.createIcon(val);
    },
    reactionsTotal: function(totals, oldTotals) {
      Object.keys(totals).forEach((key) => {
        const newTotal = totals[key];
        const oldTotal = oldTotals[key];
        const diff = Math.min(newTotal - oldTotal, 10);
        for (let index = 0; index < diff; index++) {
          this.createIcon(key);
        }
      });
    }
  },
  methods: {
    createIcon(type) {
      function random(min, max) {
        return min + Math.random() * (max - min);
      }

      const imageUrl = require(`@/assets/icons/${type}.svg`)

      console.log(imageUrl)
      const icon = document.createElement("div");
      icon.classList.add(type);
      icon.classList.add("icon");
      icon.style.backgroundImage = `url('${imageUrl}')`;
      icon.style.setProperty("--up-speed", `${random(2, 5)}s`);
      icon.style.setProperty("--start-pos", `${random(-2, 2)}%`);
      icon.style.setProperty("--h-speed", `${random(1, 3)}s`);
      icon.style.setProperty("--direction", Math.random() > 0.5 ? "alternate" : "alternate-reverse");
      this.$refs.feedbacks.appendChild(icon);

      setTimeout(() => {
        icon.remove();
      }, 6000);
    },
  },
};
</script>

<style lang="scss">
#feedbacks {
  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;
  left: 0;

  .icon {
    height: 50px;
    width: 50px;
    position: absolute;
    bottom: -20%;
    animation: var(--up-speed) linear 0s up,
      var(--h-speed) linear 0s var(--direction) infinite left-right;
    background-size: contain;
    background-repeat: no-repeat;

  }

  @keyframes up {
    from {
      transform: scale(0.7);
      bottom: -20%;
    }

    30% {
      transform: scale(1);
    }

    90% {
      opacity: 0.7;
    }

    to {
      bottom: 100%;
    }
  }

  @keyframes left-right {
    0% {
      right: calc(var(--start-pos) + 5%);
    }

    20% {
      right: calc(var(--start-pos) + 6%);
    }

    80% {
      right: calc(var(--start-pos) + 14%);
    }

    100% {
      right: calc(var(--start-pos) + 15%);
    }
  }
}
</style>