<template>
  <div class="padding text-center">
    <div v-if="nextStatus === 'more'" v-load="onLoadMore"></div>
    <template v-else-if="nextStatus === 'loading' || (nextStatus === 'noMore' && !invisible)">
      <icon-loading v-show="nextStatus === 'loading'" rotation></icon-loading>
      {{pullupText}}
    </template>
  </div>
</template>

<script>
import IconLoading from '../icon-loading'

const mapPullUpText = {
  loading: '正在加载...',
  noMore: '没有更多了~',
}

export default {
  name: 'load',
  components: {
    IconLoading,
  },
  data() {
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
  computed: {
    pullupText() {
      return mapPullUpText[this.nextStatus];
    },
  },
  methods: {
    onLoadMore() {
      this.nextStatus = 'loading'
      this.$emit('load', (noMore) => {
        this.finished(noMore)
      })
    },
    refresh() {
      this.nextStatus = 'more'
    },
    finished(noMore = false) {
      this.nextStatus = noMore ? 'noMore' : 'more'
    },
  },
  directives: {
    load: {
      bind: (el, { value }) => {
        el.ob = new IntersectionObserver(entries => {
          entries.forEach($item => {
            if ($item.target === el && $item.intersectionRatio > 0) {
              value()
            }
          })
        })
        el.ob.observe(el)
      },
      unbind: el => {
        el.ob.unobserve(el)
      }
    }
  }
}
</script>
