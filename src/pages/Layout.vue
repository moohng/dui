<template>
  <div class="dui-page">
    <div v-if="hasNavbar" class="dui-nav-bar placeholder bg-red">
      <div class="dui-nav-bar--fixed dui-nav-bar__content">
        <div class="dui-nav-bar__title">{{$route.meta.title}}</div>
        <div class="iconfont icon-arrow-left" @click="$router.back()"></div>
      </div>
    </div>
    <div class="plr ptb-sm">图片预览</div>
    <div class="grid bg-white plr">
      <div class="col-3 square xs bg-img cover radius" v-for="(img, index) in imgPaths" :key="index" v-src="img" @click="$preview(imgPaths, index)"></div>
    </div>
    <div class="plr ptb-sm">九宫格</div>
    <div class="grid bg-white text-center lines">
      <div class="col-3" :class="{'solid-right': n % 3, 'solid-bottom': Math.ceil(8 / 3) * 3 - n >= 3}" v-for="n in 8" :key="n">
        <div class="square">
          <div class="abs flex-center">{{ n }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      index: 2,
      imgPaths: [
        'http://b-ssl.duitang.com/uploads/item/201410/09/20141009224754_AswrQ.jpeg',
        'https://c-ssl.duitang.com/uploads/item/202003/08/20200308000020_ECSFH.thumb.1000_0.jpeg',
        'https://c-ssl.duitang.com/uploads/item/202007/17/20200717131129_tTkGB.thumb.1000_0.jpeg',
        'https://c-ssl.duitang.com/uploads/item/201808/13/20180813200538_vqnje.thumb.700_0.jpeg',
        'https://c-ssl.duitang.com/uploads/item/202005/26/20200526000816_sLrLa.thumb.700_0.jpeg',
        'https://c-ssl.duitang.com/uploads/item/202001/03/20200103105513_yzcxj.thumb.700_0.jpeg',
        'https://c-ssl.duitang.com/uploads/item/202004/20/20200420210204_vxdjh.thumb.700_0.png',
      ],
    }
  },
}
</script>
