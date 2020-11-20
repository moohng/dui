<template>
  <div class="dui-page">
    <div v-if="hasNavbar" class="dui-nav-bar placeholder bg-red">
      <div class="dui-nav-bar--fixed dui-nav-bar__content">
        <div class="dui-nav-bar__title">{{$route.meta.title}}</div>
        <div class="dui-icon__back" @click="$router.back()"></div>
      </div>
    </div>
    <div class="plr ptb-sm">行内</div>
    <div class="pd bg-white flex flex-wrap">
      <div class="m-xxs">
        <button class="dui-button lg bg-red">lg</button>
      </div>
      <div class="m-xxs">
        <button class="dui-button md bg-red">md</button>
      </div>
      <div class="m-xxs">
        <button class="dui-button bg-red">default</button>
      </div>
      <div class="m-xxs">
        <button class="dui-button sm line-red round">sm</button>
      </div>
      <div class="m-xxs">
        <button class="dui-button xs bg-df">xs</button>
      </div>
    </div>
    <div class="plr ptb-sm">块级 + 图标</div>
    <div class="pd bg-white">
      <button class="dui-button block lg bg-red" disabled @click="onTest">
        <i class="dui-icon__search mr-xs"></i>
        <span>大按钮</span>
      </button>
      <button class="dui-button block md bg-red mt">
        <i class="dui-icon__info mr-xs"></i>
        <span>中等按钮</span>
      </button>
      <button class="dui-button block bg-red loading mt" @click="onTest">default</button>
      <button class="dui-button block sm line-red round mt">small</button>
      <button class="dui-button block xs line-orange mt">xsmall</button>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    onTest() {
      this.$toast('禁用弹不出来')
    },
  },
}
</script>

<style lang="scss" scoped>
.dui-button {
  [class*="dui-icon"] {
    width: 24px;
    height: 24px;
  }
}
</style>
