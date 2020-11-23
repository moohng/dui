<template>
  <div v-if="show" class="dui-preview" :class="{toggle}" ref="slider" :style="{transformOrigin: `${pageX}px ${pageY}px`, transitionDuration}" @click="onClose">
    <div class="dui-preview__wrap">
      <div class="dui-preview__slide bg-img" v-for="(item, index) in options" :key="index" :style="{backgroundImage: `url(${loadedList[index]})`}">
        <i class="dui-icon__loading" v-show="!loadedList[index]"></i>
      </div>
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
      toggle: false,
      loadedList: [],
      transitionDuration: null,
      pageX: 0,
      pageY: 0,
    }
  },
  watch: {
    point({ pageX, pageY }) {
      // 禁用过滤动画
      this.transitionDuration = '0s'
      this.pageX = pageX
      this.pageY = pageY
    },
    index(val) {
      this.current = val
    },
  },
  methods: {
    open() {
      this.show = true
      setTimeout(() => {
        this.bs && this.bs.destroy()
        this.bs = new BScroll(this.$refs.slider, {
          probeType: 2,
          scrollX: true,
          scrollY: false,
          slide: {
            autoplay: false,
            loop: false,
            threshold: 100,
          },
          useTransition: true,
          momentum: false,
          bounce: false,
          stopPropagation: true,
          click: true,
        })
        const onSlide = ({ pageX }) => {
          this.current = pageX
          this.loadImage(this.options[pageX], src => {
            this.$set(this.loadedList, pageX, src)
          })
        }
        this.bs.on('slideWillChange', onSlide)
        // 初始化
        if (this.index === 0) {
          onSlide({ pageX: 0 })
        }
        this.bs.goToPage(this.index, 0, 0)
        // 开启过渡动画
        this.transitionDuration = null
        this.toggle = true
      }, 20)
      modalHelper.afterOpen()
    },
    close() {
      modalHelper.beforeClose()
      this.toggle = false
      setTimeout(() => {
        this.show = false
        this.bs && this.bs.destroy()
        this.bs = null
      }, 300)
    },
    onClose() {
      if (this.closable) {
        this.$emit('close')
        this.close()
      }
    },
    loadImage(src, onload) {
      const image = new Image()
      image.onload = () => onload(src)
      image.src = src
    },
  },
  destroyed() {
    this.bs && this.bs.destroy()
  },
}
</script>
