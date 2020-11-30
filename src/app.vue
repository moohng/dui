<template>
  <router-view v-slot="{ Component }">
    <transition :name="transitionName">
      <component :is="Component"></component>
    </transition>
  </router-view>
</template>

<script>
export default {
  data() {
    return {
      transitionName: '',
    }
  },
  watch: {
    $route(to, from) {
      // const scrollTop = document.scrollingElement.scrollTop
      // const $navbar = document.querySelector('.dui-nav-bar--fixed')
      // if ($navbar) {
      //   $navbar.style.top = `${scrollTop}px`
      // }
      // this.$el.style.top = `-${scrollTop}px`

      this.transitionName = this.$router.isBack ? 'slide-right' : 'slide-left'

      if (from.path  !== '/') {
        this.$router.isBack = false
      }
    }
  },
}
</script>

<style lang="scss">
@import './assets/styles/navbar.scss';
@import './assets/styles/avatar.scss';
@import './components/style.scss';
</style>

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
.slide-left-leave-active {
  position: fixed;
  top: 0;
  left: 0;
}
.slide-right-leave-active,
.slide-left-enter-active {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1;
}
</style>
