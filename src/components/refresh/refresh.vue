<template>
  <div class="refresh safe-bottom">
    <div class="pd text-center" :class="myClass" v-pulldown="getPulldownOptions()">
      <icon-loading v-if="status === 'init' || status === 'will' || status === 'refreshing'" :radian="rotateValue" :rotation="status === 'refreshing'"></icon-loading>
      {{pulldownText}}
    </div>
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import IconLoading from '../icon-loading/icon-loading.vue'

const mapPullDownText: {
  [key: string]: string;
} = {
  init: '下拉刷新',
  will: '松开刷新',
  refreshing: '正在刷新...',
  success: '已刷新',
  error: '刷新失败',
}

export default defineComponent({
  name: 'dui-refresh',
  components: {
    [IconLoading.name]: IconLoading,
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
  emits: ['refresh'],
  data () {
    return {
      status: 'init', // init will refreshing success error
      rotateValue: 0,
    }
  },
  computed: {
    pulldownText (): string {
      return mapPullDownText[this.status]
    },
  },
  methods: {
    getPulldownOptions () {
      return {
        scroller: this.scroller,
        onPullDownRefresh: () => {
          this.status = 'refreshing'
          return new Promise((resolve) => {
            this.$emit('refresh', (isSuccess: boolean) => {
              resolve(undefined)
              this.status = isSuccess ? 'success' : 'error'
            })
          })
        },
        onPullDown: (y: number, flag: boolean) => {
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
})
</script>
