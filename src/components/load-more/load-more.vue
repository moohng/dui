<template>
  <div class="load-more pd text-center" v-show="nextStatus === 'loading' || (nextStatus === 'noMore' && !invisible)" v-pullup="getPullupOptions()">
    <i class="dui-icon__loading" v-show="nextStatus === 'loading'"></i>
    {{pullupText}}
  </div>
</template>

<script>
const mapPullUpText = {
  loading: '正在加载...',
  noMore: '没有更多了~',
}

export default {
  name: 'load-more',
  data() {
    return {
      nextStatus: 'more',
    }
  },
  props: {
    invisible: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    pullupText() {
      return mapPullUpText[this.nextStatus];
    },
  },
  methods: {
    getPullupOptions() {
      return {
        threshold: 0,
        onLoadMore: (finished) => {
          if (this.nextStatus === 'more') {
            this.nextStatus = 'loading'
            this.$emit('load-more', (noMore) => {
              finished(false)
              this.finished(noMore)
            })
          }
        },
      }
    },
    refresh() {
      this.nextStatus = 'more'
    },
    finished(noMore = false) {
      this.nextStatus = noMore ? 'noMore' : 'more'
    },
  },
}
</script>

<style lang="scss" scoped>
.dui-icon__loading {
  width: 18px;
  height: 18px;
}
</style>
