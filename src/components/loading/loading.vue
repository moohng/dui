<template>
  <div class="dui-loading" :class="{ toggle: show }">
    <div class="mask transparent"></div>
    <div class="dui-loading__body pd">
      <i class="dui-icon__loading"></i>
      <div class="mt-sm">{{ loadingText }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'dui-loading',
  data() {
    return {
      show: false,
      loadingText: '数据加载中',
    };
  },
  methods: {
    open(text = this.loadingText) {
      this.loadingText = text;
      this.show = true;
    },
    close() {
      this.$emit('close');
      this.show = false;
    },
  },
};
</script>
