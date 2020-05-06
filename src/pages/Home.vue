<template>
  <div class="home">
    <div class="dui-list indent">
      <div class="dui-item" @click="onToastClick">Toast</div>
      <div class="dui-item" @click="onActionSheetClick">Action Sheet</div>
      <div class="dui-item" @click="onDialogClick">Dialog</div>
      <div class="dui-item" @click="onLoadingClick">Loading</div>
    </div>
    <div class="dui-list">
      <div class="dui-item" v-for="n in 4" :key="n">站位{{ n }}</div>
    </div>
    <div class="padding margin-top bg-white grid">
      <div class="col-2 padding-xs">
        <button class="dui-button lg bg-red">large</button>
      </div>
      <div class="col-3 padding-xs">
        <button class="dui-button bg-red">default</button>
      </div>
      <div class="col-3 padding-xs">
        <button class="dui-button sm line-red round">small</button>
      </div>
      <div class="col-3 padding-xs">
        <button class="dui-button xs bg-df">xsmall</button>
      </div>
    </div>
    <div class="padding margin-top bg-white">
      <div class="margin-top-sm">
        <button class="dui-button block lg bg-red">large</button>
      </div>
      <div class="margin-top-sm">
        <button class="dui-button block bg-red">default</button>
      </div>
      <div class="margin-top-sm">
        <button class="dui-button block sm line-red round">small</button>
      </div>
      <div class="margin-top-sm">
        <button class="dui-button block xs line-orange">xsmall</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home',
  methods: {
    onToastClick() {
      this.$toast('你好啊');
    },
    onActionSheetClick() {
      this.$actionsheet([
        { name: '选项一' },
        { name: '选项二' },
        { name: '选项三' },
      ]);
    },
    onDialogClick() {
      this.$dialog({
        title: '弹窗标题',
        content: '弹窗内容，告知当前状态、信息和解决方法，描述文字尽量控制在三行之内',
        buttons: [
          { text: '取消', class: '' },
          { text: '确定', class: 'text-red' },
        ],
      });
    },
    onLoadingClick() {
      this.$loading();
      setTimeout(this.$loading.hide, 2000);
    },
  },
};
</script>

<style lang="scss">
body {
  background-color: $colorDefault;
}
</style>
