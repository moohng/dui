<template>
  <div class="dui-page bg-red" id="wrapper">
    <div class="relative">
      <div class="pulldown-wrapper padding" ref="pulldown" v-pulldown="pulldownOptions">{{ pulldownText }}</div>
      <ul class="bg-gray">
        <li v-for="n in 100" :key="n">页面内容{{ n }}</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      startY: 0,
      moveY: 0,
      pulldownText: '下拉刷新',

      isRefreshing: false,

      pulldownOptions: {
        wrapper: '#wrapper',
        onPullDownRefresh: () => {
          this.pulldownText = '正在刷新...';
          return new Promise((resolve) => {
            setTimeout(() => {
              this.pulldownText = '刷新完成';
              resolve();
            }, 2000);
          });
        },
        onPullDown: (y, flag) => {
          if (flag) {
            this.pulldownText = '松开刷新';
          } else {
            this.pulldownText = '下拉刷新';
          }
        },
      },
    };
  },
};
</script>

<style lang="scss" scoped>
.dui-page {
  height: 100vh;
  overflow: scroll;
}
</style>
