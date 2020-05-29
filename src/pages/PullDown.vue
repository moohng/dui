<template>
  <div class="dui-page relative" ref="wrapper" :style="{transform: `translate3d(0, ${moveY}px, 0)`}">
    <div class="pulldown-wrapper padding">{{ pulldownText }}</div>
    <ul class="bg-gray">
      <li v-for="n in 100" :key="n">页面内容{{ n }}</li>
    </ul>
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
    };
  },
  methods: {
    handlerEnd() {
      // e.preventDefault();
      this.startY = null;
      if (this.moveY > 60) {
        // 正在刷新
        this.isRefreshing = true;
        this.pulldownText = '正在刷新...';
        this.moveY = 52;
        this.$refs.wrapper.classList.add('loading');

        setTimeout(() => {
          this.pulldownText = '刷新完成';
          setTimeout(() => {
            this.$refs.wrapper.classList.remove('loading');
            // 结束刷新
            this.moveY = 0;
            this.$refs.wrapper.classList.add('debounce');
            setTimeout(() => {
              this.isRefreshing = false;
              this.$refs.wrapper.classList.remove('debounce');
            }, 800);
          }, 400);
        }, 2000);
      } else {
        // 结束刷新
        this.moveY = 0;
        this.$refs.wrapper.classList.add('debounce');
        setTimeout(() => {
          this.$refs.wrapper.classList.remove('debounce');
        }, 800);
      }
    },
    handlerMove(e) {
      if (this.startY === null) {
        return;
      }
      const currentY = e.touches[0].pageY;
      const moveY = currentY - this.startY;
      // 触发下拉刷新的条件
      if (moveY > 0 && document.scrollingElement.scrollTop <= 0) {
        // e.preventDefault();
        this.moveY = moveY * 0.4;
        if (this.moveY > 60) {
          this.pulldownText = '松开刷新';
        }
      }
    },
  },
  mounted() {
    window.addEventListener('touchstart', (e) => {
      // e.preventDefault();
      if (!this.isRefreshing && document.scrollingElement.scrollTop <= 0) {
        this.startY = e.touches[0].pageY;
      }
    });
    window.addEventListener('touchmove', this.handlerMove, { passive: false });
    window.addEventListener('touchend', this.handlerEnd);
    window.addEventListener('touchcancel', this.handlerEnd);
  },
};
</script>

<style lang="scss" scoped>
.loading {
  transition: transform 0.3s ease;
}
.debounce {
  transition: transform 0.6s ease;
}
</style>
<style lang="scss">
body {
  -webkit-overflow-scrolling: auto;
}
</style>
