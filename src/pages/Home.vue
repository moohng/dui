<template>
  <div class="home">
    <!-- <div class="status-bar bg-orange">
      <div class="status-bar--fixed"></div>
    </div> -->
    <div class="dui-nav-bar with-status-bar bg-orange">
      <div class="dui-nav-bar--fixed dui-nav-bar__content">
        <div class="dui-nav-bar__title">Hello Dui</div>
        <div>返回</div>
        <div>操作</div>
      </div>
    </div>
    <div class="padding-lr padding-tb-sm text-grey">基本布局（base）</div>
    <div class="dui-list indent">
      <div class="dui-item" @click="$router.push('dialog')">Dialog</div>
      <div class="dui-item line-red" @click="onActionSheetClick">Action Sheet</div>
      <div class="dui-item" @click="onDialogClick">Dialog</div>
      <div class="dui-item" @click="onLoadingClick">Loading</div>
    </div>
    <div class="padding-lr padding-tb-sm text-grey">组件列表</div>
    <div class="dui-list indent">
      <div class="dui-item" @click="$router.push('dialog')">Dialog</div>
      <div class="dui-item" @click="onToastClick">Toast</div>
      <div class="dui-item" @click="onActionSheetClick">Action Sheet</div>
      <div class="dui-item" @click="onDialogClick">Dialog</div>
      <div class="dui-item" @click="onLoadingClick">Loading</div>
    </div>
    <div class="padding-lr padding-tb-sm text-grey">其他工具</div>
    <div class="dui-list">
      <div class="dui-item" @click="$router.push('lazyload')">图片懒加载</div>
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
      <button class="dui-button block lg bg-red">large</button>
      <button class="dui-button block bg-red">default</button>
      <button class="dui-button block sm line-red round">small</button>
      <button class="dui-button block xs line-orange">xsmall</button>
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
