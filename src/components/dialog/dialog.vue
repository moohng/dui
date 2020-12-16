<template>
  <teleport to="body">
    <div v-if="show" class="dui-dialog" :class="{ show: toggle }">
      <div class="mask" @click="onMask"></div>
      <div class="dui-dialog__body" :class="{'dui-dialog__body--default': !$slots.default}">
        <slot>
          <div class="dui-dialog__hd plr-lg pt-xl pb" v-if="title">
            <strong>{{ title }}</strong>
          </div>
          <div
            class="dui-dialog__content plr-lg mb-xl text-grey"
            v-if="content"
          >{{ content }}</div>
          <div class="dui-dialog__ft flex solid-top" v-if="buttons.length">
            <a
              class="flex-sub pd text-bold"
              v-for="(button, index) in buttons"
              :key="index"
              :class="[index > 0 ? 'solid-left' : ''].concat(button.class || [])"
              @click="handleClick(index, button)"
            >{{ button.text || button }}</a>
          </div>
        </slot>
      </div>
    </div>
  </teleport>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import modalHelper from '../../tools/modalHelper'
import { Button, ClickCallback } from './index'

export default defineComponent({
  name: 'dui-dialog',
  props: {
    title: {
      type: String,
      default: '',
    },
    content: {
      type: String,
      default: '',
    },
    buttons: {
      type: Array as PropType<Button[]>,
      default: () => [
        {
          text: '确定',
          class: '',
        },
      ],
    },
    className: {
      type: [Array, String, Object],
      default: '',
    },
    closable: {
      type: Boolean,
      default: false,
    },
    onClick: Function as PropType<ClickCallback>,
    onClose: Function as PropType<() => void>,
  },
  emits: ['click', 'close', 'mask'],
  data () {
    return {
      show: false,
      toggle: false,
    }
  },
  methods: {
    open () {
      this.show = true
      setTimeout(() => {
        this.toggle = true
      }, 20)
      modalHelper.afterOpen()
    },
    close () {
      this.toggle = false
      setTimeout(() => {
        modalHelper.beforeClose()
        this.show = false
        this.$emit('close')
      }, 300)
    },
    async handleClick (index: number, button: Button) {
      if (typeof button.onClick === 'function') {
        await button.onClick(index, button)
      }
      this.$emit('click', index, button)
      this.close()
    },
    async onMask () {
      this.$emit('mask', this.close)
      if (this.closable) {
        this.close()
      }
    },
  },
})
</script>
