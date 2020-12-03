<template>
  <div id="slider" v-if="show" class="dui-preview" :class="{toggle}" :style="{transformOrigin: `${point.x}px ${point.y}px`}" @click="onClose">
    <div class="dui-preview__wrap">
      <div class="dui-preview__slide bg-img" v-for="(item, index) in options" :key="item" :style="{backgroundImage: `url(${loadedList[index]})`}">
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
import { onUnmounted, ref, watch, nextTick } from 'vue'
import BScroll from '@better-scroll/core'
import SlidePlugin from '@better-scroll/slide'
import modalHelper from '../../tools/modalHelper'

BScroll.use(SlidePlugin)

function loadImage(src, onload) {
  const image = new Image()
  image.onload = () => onload(src)
  image.src = src
}

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
      default: () => {},
    },
  },
  emits: ['close'],
  setup(props, { emit }) {
    const show = ref(false)
    const toggle = ref(false)
    const loadedList = ref([])

    const current = ref(props.index)
    watch(() => props.index, (val) => {
      current.value = val
    })

    let bs = null
    const onSlide = ({ pageX }) => {
      current.value = pageX
      loadImage(props.options[pageX], src => {
        loadedList.value[pageX] = src
      })
    }

    const open = () => {
      show.value = true
      nextTick(() => {
        if (!bs) {
          bs = new BScroll('#slider', {
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
          bs.on('slideWillChange', onSlide)
        }

        // 初始化
        if (current.value === 0) {
          onSlide({ pageX: 0 })
        }
        bs.goToPage(current.value, 0, 0)
        toggle.value = true
        modalHelper.afterOpen()
      })
    }

    const close = () => {
      modalHelper.beforeClose()
      toggle.value = false
      setTimeout(() => {
        show.value = false
        if (bs) {
          bs.destroy()
          bs = null
        }
      }, 300)
    }

    onUnmounted(() => {
      if (bs) {
        bs.destroy()
        bs = null
      }
    })

    return {
      show,
      toggle,
      current,
      loadedList,
      open,
      close,
      onClose() {
        if (props.closable) {
          emit('close')
          close()
        }
      },
    }
  },
}
</script>
