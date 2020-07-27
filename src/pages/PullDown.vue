<template>
  <div class="dui-page" ref="wrapper">
    <div class="dui-nav-bar placeholder bg-red">
      <div class="dui-nav-bar--fixed dui-nav-bar__content">
        <div class="dui-nav-bar__title">下拉刷新</div>
        <div class="dui-icon__back" @click="$router.back()"></div>
      </div>
    </div>
    <div class="bg-white">
      <div class="padding text-center" ref="pulldown" v-pulldown="getPulldownOptions()">{{ pulldownText }}</div>
      <ul class="dui-list">
        <li class="dui-item" v-for="n in listCount" :key="n">页面内容{{ n }}</li>
      </ul>
      <div class="padding text-center" v-pullup="getPullupOptions()">{{ pullupText }}</div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import PullDown from '../tools/pulldown'
import PullUp from '../tools/pullup'

Vue.use(PullDown)
Vue.use(PullUp)

export default {
  data() {
    return {
      pulldownText: '下拉刷新',
      nextStatus: 'more',

      listCount: 20,
    }
  },
  computed: {
    pullupText() {
      const map = {
        more: '上拉加载更多',
        loading: '正在加载...',
        noMore: '没有更多数据了~',
      }
      return map[this.nextStatus]
    },
  },
  methods: {
    getPulldownOptions() {
      return {
        onPullDownRefresh: () => {
          this.pulldownText = '正在刷新...'
          return new Promise((resolve) => {
            setTimeout(() => {
              this.listCount = 20
              this.nextStatus = 'more'
              this.pulldownText = '刷新完成'
              resolve()
            }, 2000)
          })
        },
        onPullDown: (y, flag) => {
          if (flag) {
            this.pulldownText = '松开刷新'
          } else {
            this.pulldownText = '下拉刷新'
          }
        },
      }
    },
    getPullupOptions() {
      return {
        threshold: 0,
        // onLoadMore: () => new Promise((resolve) => {
        //   this.nextStatus = 'loading'
        //   setTimeout(() => {
        //     resolve(true)
        //     this.nextStatus = 'noMore'
        //   }, 2000)
        // }),
        onLoadMore: (finished) => {
          if (this.nextStatus === 'more') {
            this.nextStatus = 'loading'
            setTimeout(() => {
              this.listCount += 20
              if (this.listCount > 50) {
                finished(true)
                this.nextStatus = 'noMore'
              } else {
                finished()
                this.nextStatus = 'more'
              }
            }, 2000)
          }
        },
      }
    },
  },
}
</script>
