<template>
  <div class="load-more padding text-center" v-show="nextStatus === 'loading' || (nextStatus === 'noMore' && !invisible)" v-pullup="getPullupOptions()">
    <icon-loading v-show="nextStatus === 'loading'" rotation></icon-loading>
    {{pullupText}}
  </div>
</template>

<script>
import IconLoading from '../icon-loading'


const mapPullUpText = {
  loading: '正在加载...',
  noMore: '没有更多了~',
}

export default {
  name: 'load-more',
  components: {
    IconLoading,
  },
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
