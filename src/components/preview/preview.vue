<template>
  <teleport to="body">
    <div v-if="show" class="dui-preview" :class="{toggle}" :style="{transformOrigin: `${point.x}px ${point.y}px`}" @click="onClick">
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
  </teleport>
</template>

<script lang="ts">
import { ref, defineComponent, PropType, nextTick, onMounted } from 'vue'
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
    onClose: Function as PropType<() => void>,
  },
  emits: ['close'],
  setup (props, { emit }) {
    const show = ref(false)
    const toggle = ref(false)
    const loadedList = ref<string[]>([])

    const controlledSwiper = ref<SwiperController|null>(null)
    const setControlledSwiper = (swiper: SwiperController) => {
      controlledSwiper.value = swiper
    }

    const current = ref(null)

    const onSlide = ({ activeIndex }: any) => {
      current.value = activeIndex
      loadImage(props.options[activeIndex], src => {
        loadedList.value[activeIndex] = src
      })
    }

    if (props.index === 0) {
      onSlide({ activeIndex: 0 })
    }

    const open = (index = props.index) => {
      show.value = true
      nextTick(() => {
        toggle.value = true
        controlledSwiper.value?.slideTo(+index, 0)
        modalHelper.afterOpen()
      })
    }

    const close = () => {
      modalHelper.beforeClose()
      toggle.value = false
      setTimeout(() => {
        show.value = false
        emit('close')
      }, 300)
    }

    return {
      show,
      toggle,
      current,
      loadedList,
      open,
      close,
      setControlledSwiper,
      onSlide,
      onClick () {
        if (props.closable) {
          close()
        }
      },
    }
  },
})
</script>
