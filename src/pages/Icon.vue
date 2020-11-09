<template>
  <div class="dui-page">
    <div v-if="hasNavbar" class="dui-nav-bar placeholder bg-red">
      <div class="dui-nav-bar--fixed dui-nav-bar__content">
        <div class="dui-nav-bar__title">{{$route.meta.title}}</div>
        <div class="dui-icon__back" @click="$router.back()"></div>
      </div>
    </div>
    <div class="grid text-center">
      <div class="col-3 bg-white" v-for="(icon, index) in iconList" :key="index">
        <div class="square" @click="onCopy(icon)">
          <div class="pd-sm flex flex-column align-center">
            <div class="mtb-sm" :class="icon"></div>
            <div>{{ icon }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import copy from '@moohng/dan/lib/copy'

export default {
  data() {
    return {
      iconList: [
        'dui-icon__arrow',
        'dui-icon__arrow--left',
        'dui-icon__back',
        'dui-icon__loading',
        'dui-icon__clear',
        'dui-icon__cancel',
        'dui-icon__search',
        'dui-icon__circle',
        'dui-icon__download',
        'dui-icon__safe-success',
        'dui-icon__safe-warn',
        'dui-icon__success',
        'dui-icon__success-circle',
        'dui-icon__success-no-circle',
        'dui-icon__waiting',
        'dui-icon__waiting-circle',
        'dui-icon__warn',
        'dui-icon__info',
        'dui-icon__info-circle',
        'dui-icon__delete',
        'dui-icon__success-no-circle-thin',
        'dui-icon__arrow-bold',
        'dui-icon__back-arrow-thin',
        'dui-icon__close',
        'dui-icon__close-thin',
        'dui-icon__back-circle',
      ],
    }
  },
  methods: {
    onCopy(icon) {
      copy(icon)
      this.$toast('已复制')
    },
  },
}
</script>

<style lang="scss" scoped>
[class^="col-"]:active {
  background-color: #fcfcfc;
}
.grid [class*="dui-icon"] {
  width: 24px;
  height: 24px;
}
</style>
