<template>
  <div class="dui-scroller" ref="bsWrapper">
    <div class="dui-scroller__wrapper">
      <!-- 下拉刷新 -->
      <slot name="pulldown" scope="pullingdown">
        <div class="pulldown-wrapper" v-if="pulldown" ref="pulldown">
          <div v-show="pullingdown === 'before'">
            <span>下拉刷新</span>
          </div>
          <div v-show="pullingdown === 'loading'">
            <span>正在刷新...</span>
          </div>
          <div v-show="pullingdown === 'after'"><span>刷新完成</span></div>
        </div>
      </slot>
      <!-- 列表 -->
      <slot></slot>
      <!-- 上拉加载更多 -->
      <slot name="pullup" scope="hasNext">
        <div class="pullup-wrapper" v-if="pullup">
          <div v-show="hasNext === 'more'">
            <span class="pullup-txt">上拉加载更多</span>
          </div>
          <div v-show="hasNext === 'loading'">
            <span class="pullup-txt">正在加载...</span>
          </div>
          <div v-show="hasNext === 'noMore'">
            <span class="pullup-txt">没有更多了</span>
          </div>
        </div>
      </slot>
    </div>
  </div>
</template>

<script>
import BScroll from '@better-scroll/core';
import PullDown from '@better-scroll/pull-down';
import Pullup from '@better-scroll/pull-up';

BScroll.use(PullDown);
BScroll.use(Pullup);

export default {
  name: 'dui-scroller',
  props: {
    pulldown: {
      type: [Boolean, Object], // { threshold: 触发下拉刷新距离, stop: 停住的距离 }
      default: false,
    },
    stopTime: {
      type: Number,
      default: 600,
    },
    pullup: {
      type: [Boolean, Object], // { threshold：触发下拉刷新距离 }
      default: false,
    },
  },
  data() {
    return {
      pullingdown: 'before',

      hasNext: 'more',
    };
  },
  methods: {
    finishPullup(hasNext) {
      this.scroller.finishPullUp();
      this.scroller.refresh();
      if (!hasNext) {
        this.scroller.closePullUp();
        this.hasNext = 'noMore';
      } else {
        this.hasNext = 'more';
      }
    },
    finishPulldown() {
      this.pullingdown = 'after';
      setTimeout(() => {
        this.scroller.finishPullDown();
      }, this.stopTime);
      setTimeout(() => {
        this.scroller.refresh();
        this.pullingdown = 'before';
        // 开启上拉加载更多
        if (this.pullup) {
          this.hasNext = 'more';
          this.scroller.openPullUp();
        }
      }, 800);
    },
  },
  mounted() {
    const pulldownHeight = this.$refs.pulldown ? this.$refs.pulldown.getBoundingClientRect().height : 64;
    this.scroller = new BScroll(this.$refs.bsWrapper, {
      bounceTime: 600,
      pullDownRefresh: typeof this.pulldown === 'boolean' ? {
        threshold: pulldownHeight + 10,
        stop: pulldownHeight,
      } : this.pulldown,
      pullUpLoad: this.pullup,
    });
    if (this.pulldown) {
      this.scroller.on('pullingDown', () => {
        this.pullingdown = 'loading';
        this.$emit('pulldown');
      });
    }
    if (this.pullup) {
      this.scroller.on('pullingUp', () => {
        this.$emit('pullup');
        this.hasNext = 'loading';
      });
    }
  },
  destroyed() {
    this.scroller.destroy();
  },
};
</script>
