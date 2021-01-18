<template>
  <div class="dui-preview" :class="{toggle}" :style="{transformOrigin: `${point.x}px ${point.y}px`}" @click="onClose">
    <swiper @swiper="setControlledSwiper" @slide-change="onSlide">
      <swiper-slide v-for="(item, index) in options" :key="item">
        <div class="dui-preview__slide bg-img" :style="{backgroundImage: `url(${loadedList[index]})`}">
          <i class="dui-icon__loading" v-show="!loadedList[index]"></i>
        </div>
      </swiper-slide>
    </swiper>
    <slot>
      <!-- 索引 -->
      <div class="dui-preview__index">{{current + 1}}/{{options.length}}</div>
    </slot>
  </div>
</template>

<script lang="ts">
import { ref, nextTick, defineComponent, PropType } from 'vue'
import SwiperCore, { Controller, Swiper as SwiperController } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/vue'
import modalHelper from '../../tools/modalHelper'

SwiperCore.use([Controller])

function loadImage (src: string, onload: (src: string) => void) {
  const image = new Image()
  image.onload = () => onload(src)
  image.src = src
}

export default defineComponent({
  name: 'dui-preview',
  components: {
    Swiper,
    SwiperSlide,
  },
  props: {
    options: {
      type: Array as PropType<string[]>,
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
      default: () => ({}),
    },
  },
  emits: ['close'],
  setup (props, { emit }) {
    const toggle = ref(false)
    const loadedList = ref<string[]>([])

    const controlledSwiper = ref<SwiperController|null>(null)
    const setControlledSwiper = (swiper: SwiperController) => {
      controlledSwiper.value = swiper
    }

    const current = ref(props.index)

    const onSlide = ({ activeIndex }: any) => {
      console.log(activeIndex)
      current.value = activeIndex
      loadImage(props.options[activeIndex], src => {
        loadedList.value[activeIndex] = src
      })
    }

    const open = () => {
      nextTick(() => {
        controlledSwiper.value?.slideTo(+props.index, 0)
      })
      toggle.value = true
      modalHelper.afterOpen()
    }

    const close = () => {
      modalHelper.beforeClose()
      toggle.value = false
    }

    return {
      toggle,
      current,
      loadedList,
      open,
      close,
      setControlledSwiper,
      onSlide,
      onClose () {
        if (props.closable) {
          emit('close')
          close()
        }
      },
    }
  },
})
</script>
