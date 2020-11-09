<template>
  <div v-if="show" class="dui-dialog" :class="{ toggle }">
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
            @click="onClick(button, index)"
          >{{ button.text || button }}</a>
        </div>
      </slot>
    </div>
  </div>
</template>

<script>
import modalHelper from '../../tools/modalHelper'

export default {
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
      type: Array,
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
  },
  data() {
    return {
      show: false,
      toggle: false,
    }
  },
  methods: {
    open() {
      this.show = true
      setTimeout(() => {
        this.toggle = true
      }, 20)
      modalHelper.afterOpen()
    },
    close() {
      modalHelper.beforeClose()
      this.$emit('close')
      this.toggle = false
      setTimeout(() => {
        this.show = false
      }, 300)
    },
    async onClick(button, index, e) {
      if (typeof button.onClick === 'function') {
        await button.onClick(e)
        this.close()
      } else if (typeof this.click === 'function') {
        await this.click(index, e)
        this.close()
      } else {
        this.close()
      }
    },
    async onMask(e) {
      if (typeof this.click === 'function') {
        this.click('mask', e)
      } else {
        this.$emit('mask')
      }
    },
  },
}
</script>
