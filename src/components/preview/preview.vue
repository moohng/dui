<template>
  <div class="dui-preview" :class="{toggle: show}" ref="slider" @click="onClose">
    <div class="dui-preview__wrap">
      <div class="dui-preview__slide bg-img" v-for="(item, index) in options" :key="index" :style="{backgroundImage: `url(${item})`}"></div>
    </div>
    <slot>
      <!-- 索引 -->
      <div class="dui-preview__index">{{current + 1}}/{{options.length}}</div>
    </slot>
  </div>
</template>

<script>
import BScroll from '@better-scroll/core'
import SlidePlugin from '@better-scroll/slide'
import modalHelper from '../../tools/modalHelper'

BScroll.use(SlidePlugin)

export default {
  name: 'dui-preview',
  props: {
    options: {
      type: Array,
      default: () => [],
    },
    index: {
      type: [Number, String],
      default: 0,
    },
    closable: {
      type: Boolean,
      default: true,
    },
    point: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      current: this.index,
      show: false,
    }
  },
  watch: {
    point({ pageX, pageY }) {
      const style = this.$refs.slider.style
      // 禁用过滤动画
      style.transitionDuration = '0s'
      style.transformOrigin = `${pageX}px ${pageY}px`
    },
  },
  methods: {
    open() {
      this.bs && this.bs.destroy()
      this.current = this.index
      this.bs = new BScroll(this.$refs.slider, {
        probeType: 2,
        scrollX: true,
        scrollY: false,
        slide: {
          loop: false,
          threshold: 100,
        },
        useTransition: true,
        momentum: false,
        bounce: false,
        stopPropagation: true,
        click: true,
      })
      this.bs.goToPage(this.current, 0, 0)
      this.bs.on('slideWillChange', ({ pageX }) => {
        this.current = pageX
      })
      // 开启过渡动画
      this.$refs.slider.style.transitionDuration = null
      this.show = true
      modalHelper.afterOpen()
    },
    close() {
      this.bs && this.bs.destroy()
      this.bs = null
      modalHelper.beforeClose()
      this.show = false
    },
    onClose() {
      if (this.closable) {
        this.$emit('close')
        this.close()
      }
    },
  },
  destroyed() {
    this.bs && this.bs.destroy()
  },
}
</script>
