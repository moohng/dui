<template>
  <div class="pd flex-center">
    <div v-if="nextStatus === 'more'" v-load="onLoadMore"></div>
    <template v-else-if="nextStatus === 'loading' || (nextStatus === 'noMore' && !invisible)">
      <i class="dui-icon__loading mr-xs" v-show="nextStatus === 'loading'"></i>
      {{pullupText}}
    </template>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import 'intersection-observer'

const mapPullUpText: {
  [key: string]: string;
} = {
  loading: '正在加载...',
  noMore: '没有更多了~',
}

export default defineComponent({
  name: 'load',
  data () {
    return {
      nextStatus: '',
    }
  },
  props: {
    invisible: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['load'],
  computed: {
    pullupText (): string {
      return mapPullUpText[this.nextStatus]
    },
  },
  methods: {
    onLoadMore () {
      this.nextStatus = 'loading'
      this.$emit('load', (noMore: boolean) => {
        this.finished(noMore)
      })
    },
    refresh () {
      this.nextStatus = 'more'
    },
    finished (noMore = false) {
      this.nextStatus = noMore ? 'noMore' : 'more'
    },
  },
  directives: {
    load: {
      mounted: (el, { value }) => {
        el.ob = new IntersectionObserver(entries => {
          entries.forEach($item => {
            if ($item.target === el && $item.intersectionRatio > 0) {
              value()
            }
          })
        })
        el.ob.observe(el)
      },
      unmounted: el => {
        el.ob.unobserve(el)
      },
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
