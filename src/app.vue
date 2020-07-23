<template>
  <transition :name="transitionName">
    <navigation>
      <router-view></router-view>
    </navigation>
  </transition>
</template>

<script>
export default {
  data() {
    return {
      transitionName: '',
    }
  },
  watch: {
    $route() {
      this.transitionName = this.$router.isBack ? 'slide-right' : 'slide-left'
      this.$router.isBack = false
    },
  },
  created() {
    this.$navigation.on('forward', () => {
      this.transitionName = 'slide-left'
    })
    this.$navigation.on('replace', () => {
      this.transitionName = 'slide-left'
    })
    this.$navigation.on('back', () => {
      this.transitionName = 'slide-right'
    })
  },
}
</script>

<style lang="scss" scoped>
.page-enter,
.page-leave-to {
  opacity: 0;
  transform: translate3d(0, 20px, 0);
}
.page-enter-active,
.page-leave-active {
  transition: all .2s;
}

.slide-left-enter,
.slide-right-leave-to {
  transform: translate3d(100%, 0, 0);
}
.slide-left-leave-to,
.slide-right-enter {
  transform: translate3d(-30%, 0, 0);
}
.slide-left-enter-active,
.slide-left-leave-active,
.slide-right-enter-active,
.slide-right-leave-active {
  transition: transform .4s;
}
.slide-right-leave-active,
.slide-left-enter-active {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1;
}
</style>
