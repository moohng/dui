<template>
  <teleport to="body">
    <div v-if="show" class="dui-actionsheet" :class="{ show: toggle }">
      <div class="mask" @click="close()"></div>
      <div class="dui-actionsheet__body" :class="{'dui-actionsheet__body--default': !$slots.default}">
        <slot>
          <div class="dui-item bg-white" v-if="title">
            <p class="flex-sub text-sm text-gray text-center">{{ title }}</p>
          </div>
          <div class="dui-list bg-white" v-if="menus.length">
            <div
              class="dui-item justify-center text-lg"
              v-for="(menu, index) in menus" :key="menu.id || menu.key || index"
              :class="[].concat(menu.class || [])"
              @click="handleClick(index, menu)"
            >
              {{ menu.name || menu }}
            </div>
          </div>
          <div class="dui-list bg-white safe-bottom" v-if="cancel">
            <div
              class="dui-item justify-center text-lg"
              :class="[].concat(cancelClass || [])"
              @click="handleClick('cancel')"
            >{{ cancel }}</div>
          </div>
        </slot>
      </div>
    </div>
  </teleport>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { Menu, HandleClickCallback } from './index'
import modalHelper from '../../tools/modalHelper'

export default defineComponent({
  name: 'dui-actionsheet',
  props: {
    title: {
      type: String,
      default: '',
    },
    menus: {
      type: [Array, String] as PropType<Menu[] | string[]>,
      default: () => [],
    },
    cancel: {
      type: [String, Boolean] as PropType<string|boolean>,
      default: '取消',
    },
    cancelClass: {
      type: [Array, String] as PropType<string|string[]>,
      default: '',
    },
    onClick: Function as PropType<HandleClickCallback>,
    onClose: Function as PropType<() => void>,
  },
  emits: ['click', 'close'],
  data () {
    return {
      show: false,
      toggle: false,
    }
  },
  methods: {
    open () {
      this.show = true
      window.setTimeout(() => {
        this.toggle = true
      }, 20)
      modalHelper.afterOpen()
    },
    close () {
      this.toggle = false
      window.setTimeout(() => {
        modalHelper.beforeClose()
        this.show = false
        this.$emit('close')
      }, 300)
    },
    async handleClick (index: number, menu: Menu) {
      if (typeof menu?.onClick === 'function') {
        await menu?.onClick()
      }
      this.onClick?.(index, menu)
      // this.$emit('click', index, menu)
      this.close()
    },
  },
})
</script>
