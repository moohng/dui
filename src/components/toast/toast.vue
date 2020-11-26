<template>
  <div class="dui-toast" :class="{ show: toastShow }">
    <slot>{{ toastText }}</slot>
  </div>
</template>

<script>
import { reactive, onUnmounted, toRefs } from 'vue'

export default {
  name: 'dui-toast',
  props: {
    text: {
      type: String,
      default: '',
    },
  },
  setup(props) {
    const state = reactive({
      toastText: props.text,
      toastShow: false,
    })

    let timer = null

    const show = text => {
      if (text) {
        state.toastText = text;
      }
      if (timer) {
        clearTimeout(timer);
      }
      state.toastShow = true;
      timer = setTimeout(() => {
        state.toastShow = false;
      }, 2000);
    }

    onUnmounted(() => {
      if (timer) {
        clearTimeout(timer);
      }
    })

    return {
      ...toRefs(state),
      show,
    }
  },
}
</script>
