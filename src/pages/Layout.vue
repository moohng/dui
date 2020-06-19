<template>
  <div class="dui-page">
    <div class="dui-nav-bar bg-red">
      <div class="dui-nav-bar--fixed dui-nav-bar__content">
        <div class="dui-nav-bar__title">Layout</div>
        <div @click="$router.back()">返回</div>
      </div>
    </div>
    <div class="padding-lr padding-tb-sm">九宫格</div>
    <div class="grid bg-white text-center">
      <div class="col-3 padding-tb solid-bottom solid-right">1</div>
      <div class="col-3 padding-tb solid-bottom solid-right">2</div>
      <div class="col-3 padding-tb solid-bottom">3</div>
      <div class="col-3 padding-tb solid-bottom solid-right">4</div>
      <div class="col-3 padding-tb solid-bottom solid-right">5</div>
      <div class="col-3 padding-tb solid-bottom">6</div>
      <div class="col-3 padding-tb solid-right">7</div>
      <div class="col-3 padding-tb solid-right">8</div>
    </div>
    <div class="padding-lr padding-tb-sm">图片宫格</div>
    <div class="grid bg-white padding-lr">
      <div class="col-4 square xs bg-img cover radius" v-for="n in 7" :key="n" v-src="'http://b-ssl.duitang.com/uploads/item/201410/09/20141009224754_AswrQ.jpeg'"></div>
    </div>
  </div>
</template>
