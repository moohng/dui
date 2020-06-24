<template>
  <div class="dui-page">
    <div class="img" v-for="(img, index) in imgList" :key="index">
      <img v-src.lazy="img" alt="img">
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import LazyLoad from '../tools/lazyload';

Vue.use(LazyLoad);

export default {
  data() {
    return {
      imgList: [
        'https://images.quarkblockchain.cn/images/user/bj.png',
        'https://images.quarkblockchain.cn/images/zcm/tc-bg.png',
        'https://images.quarkblockchain.cn/images/user/fudong.gif',
        'https://images.quarkblockchain.cn/images/user/baotc-who.png',
        'https://images.quarkblockchain.cn/images/zcm/tc-bg.png',
        'https://images.quarkblockchain.cn/images/user/fudong.gif',
        'https://images.quarkblockchain.cn/images/duobao/jianghao-bg2.png',
        'https://images.quarkblockchain.cn/images/user/zcmqq.png',
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
.img img {
  height: 200px;
}
</style>
