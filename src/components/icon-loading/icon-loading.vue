<template>
  <svg :style="{transform: `rotate(${radian}deg)`}" class="icon-refresh" :class="{refreshing: rotation}" t="1598426050497" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5952">
    <path d="M885.333333 512a372.864 372.864 0 0 0-165.290666-310.037333 32 32 0 1 1 35.712-53.12A436.864 436.864 0 0 1 949.333333 512c0 241.536-195.797333 437.333333-437.333333 437.333333-28.501333 0-42.794667-34.474667-22.613333-54.613333l75.989333-76.010667a32 32 0 0 1 45.248 45.248l-11.029333 11.050667C763.52 835.584 885.333333 688 885.333333 512z m-746.666666 0a372.906667 372.906667 0 0 0 167.466666 311.509333 32 32 0 0 1-35.328 53.333334A436.885333 436.885333 0 0 1 74.666667 512C74.666667 270.464 270.464 74.666667 512 74.666667c28.501333 0 42.794667 34.474667 22.613333 54.613333l-75.989333 76.010667a32 32 0 0 1-45.248-45.248l11.029333-11.050667C260.48 188.416 138.666667 336 138.666667 512z" p-id="5953"></path>
  </svg>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'icon-loading',
  props: {
    radian: {
      type: [String, Number],
      default: 0,
    },
    rotation: {
      type: Boolean,
      default: false,
    },
  },
})
</script>

<style lang="scss" scoped>
.icon-refresh {
  margin-top: -3px;
  margin-right: 8px;
  width: 22px;
  height: 22px;
  fill: currentColor;
  vertical-align: middle;
  &.refreshing {
    animation: rotation 0.8s linear infinite;
  }
}

@keyframes rotation {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
