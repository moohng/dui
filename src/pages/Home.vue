<template>
  <div class="dui-page">
    <header class="padding">
      <div class="center margin-top-xl">
        <div class="avatar lg" @click="onAvatarClick">DUI</div>
      </div>
      <p class="text-center text-gray">移动端快速布局、高度可自定义Vue 2 UI组件库，以实用为主，避免重复造轮子。作者：Kevin，项目地址：<a href="https://github.com/moohng/dui">https://github.com/moohng/dui</a></p>
    </header>
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
      <div class="dui-item" @click="$router.push('icon')">
        <div class="flex-sub">Icon</div>
        <div class="dui-icon__arrow text-gray"></div>
      </div>
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
  data() {
    return {
      clickTimes: 0,
    }
  },
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
    onAvatarClick() {
      this.timer && clearTimeout(this.timer)
      this.clickTimes += 1
      if (this.clickTimes >= 5) {
        this.$router.push({ name: 'Upload' })
      }
      this.timer = setTimeout(() => {
        this.clickTimes = 0
      }, 400)
    },
  },
  created() {
    console.log('created')
  },
}
</script>
