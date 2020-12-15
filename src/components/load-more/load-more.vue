<template>
  <div class="load-more pd text-center" v-show="nextStatus === 'loading' || (nextStatus === 'noMore' && !invisible)" v-pullup="getPullupOptions()">
    <i class="dui-icon__loading" v-show="nextStatus === 'loading'"></i>
    {{pullupText}}
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

const mapPullUpText: {
  [key: string]: string;
} = {
  loading: '正在加载...',
  noMore: '没有更多了~',
}

export default defineComponent({
  name: 'load-more',
  data () {
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
  emits: ['load-more'],
  computed: {
    pullupText (): string {
      return mapPullUpText[this.nextStatus]
    },
  },
  methods: {
    getPullupOptions () {
      return {
        threshold: 0,
        onLoadMore: (finished: (noMore: boolean) => void) => {
          if (this.nextStatus === 'more') {
            this.nextStatus = 'loading'
            this.$emit('load-more', (noMore: boolean) => {
              finished(false)
              this.finished(noMore)
            })
          }
        },
      }
    },
    refresh () {
      this.nextStatus = 'more'
    },
    finished (noMore = false) {
      this.nextStatus = noMore ? 'noMore' : 'more'
    },
  },
})
</script>

<style lang="scss" scoped>
.dui-icon__loading {
  width: 18px;
  height: 18px;
}
</style>
