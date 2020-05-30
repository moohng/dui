<template>
  <div class="dui-page" ref="wrapper">
    <div class="padding-top bg-white">
      <div class="padding text-center" ref="pulldown" v-pulldown="getPulldownOptions()">{{ pulldownText }}</div>
      <ul>
        <li v-for="n in 100" :key="n">页面内容{{ n }}</li>
      </ul>
      <div class="padding text-center" v-pullup="getPullupOptions()">{{ pullupText }}</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      pulldownText: '下拉刷新',
      pullupText: '正在加载...',
    };
  },
  methods: {
    getPulldownOptions() {
      return {
        wrapper: () => this.$refs.wrapper,
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
      };
    },
    getPullupOptions() {
      return {
        threshold: 0,
        wrapper: () => this.$refs.wrapper,
        // onLoadMore: () => new Promise((resolve) => {
        //   this.pullupText = '正在加载...';
        //   setTimeout(() => {
        //     resolve(true);
        //     this.pullupText = '没有更多了';
        //   }, 2000);
        // }),
        onLoadMore: (finished) => {
          this.pullupText = '正在加载...';
          setTimeout(() => {
            finished(true);
            this.pullupText = '没有更多了';
          }, 2000);
        },
      };
    },
  },
};
</script>

<style lang="scss" scoped>
.dui-page {
  height: 100vh;
  overflow: auto;
}
</style>
