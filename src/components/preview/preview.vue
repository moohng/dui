<template>
  <div v-if="show" class="dui-preview" :class="{toggle}" ref="slider" :style="{transformOrigin: `${pageX}px ${pageY}px`, transitionDuration}" @click="onClose">
    <div class="dui-preview__wrap">
      <div class="dui-preview__slide bg-img" v-for="(item, index) in options" :key="index" :style="{backgroundImage: `url(${loadedList[index]})`}">
        <svg class="icon-loading" v-show="!loadedList[index]" viewBox="0 0 1024 1024"><path d="M1023.85 529.032c-1.317-71.287-16.305-142.391-43.943-207.39-27.564-65.036-67.558-123.967-116.655-172.662-49.06-48.73-107.26-87.263-170.248-112.67C630.052 10.793 562.348-1.38 495.484.082 428.62 1.47 362.012 16.496 301.144 44.206c-60.941 27.601-116.143 67.668-161.767 116.838-45.624 49.134-81.67 107.406-105.432 170.431C10.073 394.464-1.296 462.132.166 529.032c1.316 66.937 15.427 133.472 41.383 194.34 25.92 60.868 63.464 116.033 109.527 161.584 46.025 45.624 100.57 81.596 159.537 105.286 58.93 23.799 122.248 35.095 184.87 33.633 62.66-1.39 124.808-15.537 181.692-41.493 56.92-25.92 108.502-63.427 151.055-109.49 42.59-45.99 76.186-100.497 98.303-159.354 13.454-35.68 22.556-72.932 27.382-110.696 1.28.11 2.596.146 3.875.146 36.485 0 66.06-30.562 66.06-68.253 0-1.9-.11-3.802-.256-5.703h.256zM918.893 710.284c-24.201 56.738-59.296 108.137-102.325 150.544-43.028 42.48-93.916 75.93-148.862 97.901-54.946 22.044-113.803 32.463-172.222 31-58.419-1.352-116.18-14.622-169.042-38.896-52.899-24.165-100.826-59.15-140.344-102.069-39.556-42.845-70.74-93.587-91.138-148.277-20.509-54.69-30.16-113.292-28.771-171.455 1.353-58.163 13.746-115.595 36.375-168.164 22.556-52.57 55.202-100.205 95.195-139.504 39.958-39.3 87.227-70.227 138.151-90.48 50.925-20.326 105.396-29.867 159.574-28.405 54.178 1.39 107.552 13.782 156.393 36.302 48.877 22.446 93.148 54.91 129.633 94.647 36.557 39.738 65.255 86.715 84.009 137.237 18.827 50.559 27.637 104.591 26.248 158.367h.22a73.622 73.622 0 00-.22 5.703c0 35.205 25.773 64.159 58.894 67.85-6.434 37.143-17.072 73.372-31.768 107.7z"/></svg>
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
