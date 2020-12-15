<template>
  <div class="dui-loading" :class="{show}">
    <div class="mask transparent"></div>
    <div class="dui-loading__body pd">
      <i class="dui-icon__loading"></i>
      <div class="mt-sm">{{ loadingText }}</div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import modalHelper from '../../tools/modalHelper'

export default defineComponent({
  name: 'dui-loading',
  data () {
    return {
      show: false,
      loadingText: '数据加载中',
    }
  },
  methods: {
    open (text?: string) {
      this.loadingText = text || this.loadingText
      this.show = true
      modalHelper.afterOpen()
    },
    close () {
      modalHelper.beforeClose()
      this.show = false
      this.$emit('close')
    },
  },
})
</script>
