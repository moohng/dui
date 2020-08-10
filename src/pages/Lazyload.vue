<template>
  <div class="dui-page">
    <div class="dui-nav-bar placeholder bg-red">
      <div class="dui-nav-bar--fixed dui-nav-bar__content">
        <div class="dui-nav-bar__title">图片懒加载</div>
        <div class="dui-icon__back" @click="$router.back()"></div>
      </div>
    </div>
    <div class="dui-list">
      <div class="dui-item" v-for="(img, index) in imgList" :key="index">
        <div class="avatar margin-right" v-src="img"></div>
        <div>用户昵称</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      imgList: [
        'http://b-ssl.duitang.com/uploads/item/201410/09/20141009224754_AswrQ.jpeg',
        'https://c-ssl.duitang.com/uploads/item/202003/08/20200308000020_ECSFH.thumb.1000_0.jpeg',
        'https://c-ssl.duitang.com/uploads/item/202007/17/20200717131129_tTkGB.thumb.1000_0.jpeg',
        'https://c-ssl.duitang.com/uploads/item/201808/13/20180813200538_vqnje.thumb.700_0.jpeg',
        'https://c-ssl.duitang.com/uploads/item/202005/26/20200526000816_sLrLa.thumb.700_0.jpeg',
        'https://c-ssl.duitang.com/uploads/item/202001/03/20200103105513_yzcxj.thumb.700_0.jpeg',
        'https://c-ssl.duitang.com/uploads/item/202004/20/20200420210204_vxdjh.thumb.700_0.png',
        'https://c-ssl.duitang.com/uploads/item/202004/18/20200418115417_RMvKB.thumb.1000_0.jpeg',
        'https://c-ssl.duitang.com/uploads/item/202005/29/20200529094928_xxSaT.thumb.700_0.jpeg',
        'https://c-ssl.duitang.com/uploads/item/202005/19/20200519142906_Zd25V.thumb.700_0.jpeg',
        'https://c-ssl.duitang.com/uploads/item/202005/15/20200515202020_wibhu.thumb.700_0.jpg',
        'https://c-ssl.duitang.com/uploads/item/202003/20/20200320174650_xajfl.thumb.700_0.jpg',
        'https://c-ssl.duitang.com/uploads/item/202003/22/20200322164407_knaqh.thumb.700_0.jpg',
        'https://c-ssl.duitang.com/uploads/item/201905/08/20190508140933_iWAZj.thumb.700_0.jpeg',
        // 重复图片不会重新下载
        'http://b-ssl.duitang.com/uploads/item/201410/09/20141009224754_AswrQ.jpeg',
        'https://c-ssl.duitang.com/uploads/item/202003/08/20200308000020_ECSFH.thumb.1000_0.jpeg',
        'https://c-ssl.duitang.com/uploads/item/202007/17/20200717131129_tTkGB.thumb.1000_0.jpeg',
        'https://c-ssl.duitang.com/uploads/item/201808/13/20180813200538_vqnje.thumb.700_0.jpeg',
        'https://c-ssl.duitang.com/uploads/item/202005/26/20200526000816_sLrLa.thumb.700_0.jpeg',
        'https://c-ssl.duitang.com/uploads/item/202001/03/20200103105513_yzcxj.thumb.700_0.jpeg',
        'https://c-ssl.duitang.com/uploads/item/202004/20/20200420210204_vxdjh.thumb.700_0.png',
        'https://c-ssl.duitang.com/uploads/item/202004/18/20200418115417_RMvKB.thumb.1000_0.jpeg',
        'https://c-ssl.duitang.com/uploads/item/202005/29/20200529094928_xxSaT.thumb.700_0.jpeg',
        'https://c-ssl.duitang.com/uploads/item/202005/19/20200519142906_Zd25V.thumb.700_0.jpeg',
        'https://c-ssl.duitang.com/uploads/item/202005/15/20200515202020_wibhu.thumb.700_0.jpg',
        'https://c-ssl.duitang.com/uploads/item/202003/20/20200320174650_xajfl.thumb.700_0.jpg',
        'https://c-ssl.duitang.com/uploads/item/202003/22/20200322164407_knaqh.thumb.700_0.jpg',
        'https://c-ssl.duitang.com/uploads/item/201905/08/20190508140933_iWAZj.thumb.700_0.jpeg',
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
.dui-item {
  padding-top: 15px;
  padding-bottom: 15px;
}
</style>
