<template>
  <div class="dui-page">
    <div class="dui-nav-bar bg-red">
      <div class="dui-nav-bar--fixed dui-nav-bar__content">
        <div class="dui-nav-bar__title">Layout</div>
        <div @click="$router.back()">返回</div>
      </div>
    </div>
    <div class="padding-lr padding-tb-sm">九宫格</div>
    <div class="grid bg-white text-center lines">
      <div class="col-3" :class="{'solid-right': n % 3, 'solid-bottom': Math.ceil(8 / 3) * 3 - n >= 3}" v-for="n in 8" :key="n">
        <div class="square">
          <div class="abs center">{{ n }}</div>
        </div>
      </div>
    </div>
    <div class="padding-lr padding-tb-sm">图片宫格</div>
    <div class="grid bg-white padding-lr">
      <div class="col-4 square xs bg-img cover radius" v-for="n in 7" :key="n" v-src="'http://b-ssl.duitang.com/uploads/item/201410/09/20141009224754_AswrQ.jpeg'"></div>
    </div>
  </div>
</template>
