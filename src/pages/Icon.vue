<template>
  <div class="dui-page">
    <div v-if="hasNavbar" class="dui-nav-bar placeholder bg-red">
      <div class="dui-nav-bar--fixed dui-nav-bar__content">
        <div class="dui-nav-bar__title">{{$route.meta.title}}</div>
        <div class="iconfont icon-arrow-left" @click="$router.back()"></div>
      </div>
    </div>
    <div class="grid text-center">
      <div class="col-3 bg-white" v-for="(icon, index) in iconList" :key="index">
        <div class="square" @click="onCopy(icon)">
          <div class="pd-sm flex flex-column align-center">
            <i class="mtb-sm iconfont" :class="icon"></i>
            <span>{{ icon }}</span>
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
        'icon-arrow',
        'icon-arrow-left',
        'icon-arrow-up',
        'icon-arrow-down',
        'icon-clear',
        'icon-close',
        'icon-cross',
        'icon-search',
        'icon-plus',
        'icon-sub',
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
.grid .iconfont {
  font-size: 24px;
}
</style>
