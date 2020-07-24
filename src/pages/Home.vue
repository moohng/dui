<template>
  <div class="dui-page">
    <!-- <div class="status-bar bg-orange">
      <div class="status-bar--fixed"></div>
    </div> -->
    <div class="dui-nav-bar with-status-bar placeholder bg-orange">
      <div class="dui-nav-bar--fixed dui-nav-bar__content">
        <div class="dui-nav-bar__title">Hello Dui</div>
        <div class="dui-icon__back"></div>
        <div>操作</div>
      </div>
    </div>
    <div class="padding-lr padding-tb-sm text-grey">基本布局（base）</div>
    <div class="dui-list indent">
      <div class="dui-item line-red" @click="$router.push('layout')">
        <div class="flex-sub">Layout</div>
        <div class="dui-icon__arrow"></div>
      </div>
      <div class="dui-item" @click="$router.push('button')">
        <div class="flex-sub">Button</div>
        <div class="dui-icon__arrow text-gray"></div>
      </div>
      <div class="dui-item">NavBar + StatusBar</div>
      <div class="dui-item">List</div>
    </div>
    <div class="padding-lr padding-tb-sm text-grey">组件</div>
    <div class="dui-list indent">
      <div class="dui-item" @click="$router.push('dialog')">
        <div class="flex-sub">Dialog</div>
        <div class="dui-icon__arrow text-gray"></div>
      </div>
      <div class="dui-item" @click="onToastClick">Toast</div>
      <div class="dui-item" @click="onActionSheetClick">Action Sheet</div>
      <div class="dui-item" @click="onLoadingClick">Loading</div>
      <div class="dui-item" @click="$router.push('layout')">
        <div class="flex-sub">Preview</div>
        <div class="dui-icon__arrow text-gray"></div>
      </div>
    </div>
    <div class="padding-lr padding-tb-sm text-grey">插件</div>
    <div class="dui-list">
      <div class="dui-item" @click="$router.push('pulldown')">
        <div class="flex-sub">下拉刷新</div>
        <div class="dui-icon__arrow text-gray"></div>
      </div>
      <div class="dui-item" @click="$router.push('lazyload')">
        <div class="flex-sub">图片懒加载</div>
        <div class="dui-icon__arrow text-gray"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home',
  methods: {
    onToastClick() {
      this.$toast('你好啊')
    },
    onActionSheetClick() {
      this.$actionsheet([
        { name: '选项一' },
        { name: '选项二' },
        { name: '选项三' },
      ])
    },
    onDialogClick() {
      this.$dialog({
        title: '弹窗标题',
        content: '弹窗内容，告知当前状态、信息和解决方法，描述文字尽量控制在三行之内',
        buttons: [
          { text: '取消', class: '' },
          { text: '确定', class: 'text-red' },
        ],
      })
    },
    onLoadingClick() {
      this.$loading()
      setTimeout(this.$loading.hide, 2000)
    },
  },
  created() {
    console.log('created')
  },
}
</script>

<style lang="scss">
body {
  background-color: $colorDefault;
}
</style>
