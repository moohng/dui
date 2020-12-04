<template>
  <router-view v-slot="{ Component, route }">
    <transition :name="route.meta.transition">
      <component :is="Component"></component>
    </transition>
  </router-view>
</template>

<style lang="scss">
@import './assets/styles/navbar.scss';
@import './assets/styles/avatar.scss';
@import './components/style.scss';
</style>

<style lang="scss" scoped>
.page-enter-from,
.page-leave-to {
  opacity: .4;
}
.page-enter-active,
.page-leave-active {
  transition: all .2s linear;
}

.slide-left-enter-from,
.slide-right-leave-to {
  transform: translate3d(100%, 0, 0);
}
.slide-left-leave-to,
.slide-right-enter-from {
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
