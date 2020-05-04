<template>
  <div class="dui-toast" :class="{ show: toastShow }">{{ toastText }}</div>
</template>

<script>
export default {
  name: 'dui-toast',
  props: {
    text: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      toastText: this.text,
      toastShow: false,
    };
  },
  methods: {
    show(text) {
      if (text) {
        this.toastText = text;
      }
      if (this.timer) {
        clearTimeout(this.timer);
      }
      this.toastShow = true;
      this.timer = setTimeout(() => {
        this.toastShow = false;
      }, 2000);
    },
  },
  destroyed() {
    if (this.timer) {
      clearTimeout(this.timer);
    }
  },
};
</script>
