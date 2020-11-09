<template>
  <div class="refresh">
    <div class="pd text-center" :class="myClass" v-pulldown="getPulldownOptions()">
      <icon-loading v-if="status === 'init' || status === 'will' || status === 'refreshing'" :radian="rotateValue" :rotation="status === 'refreshing'"></icon-loading>
      {{pulldownText}}
    </div>
    <slot></slot>
  </div>
</template>

<script>
import IconLoading from '../icon-loading'


const mapPullDownText = {
  init: '下拉刷新',
  will: '松开刷新',
  refreshing: '正在刷新...',
  success: '已刷新',
  error: '刷新失败',
}

export default {
  name: 'refresh',
  components: {
    IconLoading,
  },
  props: {
    scroller: {
      type: [String, HTMLElement],
    },
    myClass: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      status: 'init', // init will refreshing success error
      rotateValue: 0,
    }
  },
  computed: {
    pulldownText() {
      return mapPullDownText[this.status];
    },
  },
  methods: {
    getPulldownOptions() {
      return {
        scroller: this.scroller,
        onPullDownRefresh: () => {
          this.status = 'refreshing'
          return new Promise((resolve) => {
            this.$emit('refresh', (isSuccess) => {
              resolve()
              this.status = isSuccess ? 'success' : 'error'
            })
          })
        },
        onPullDown: (y, flag) => {
          this.rotateValue = 3 * y
          if (flag) {
            this.status = 'will'
          } else {
            this.status = 'init'
          }
        },
      }
    },
  },
}
</script>

<style lang="scss" scoped>
@import "../../styles/mixins.scss";

.refresh {
  @include ipx(padding-bottom, env(safe-area-inset-bottom));
}
</style>
