<template>
  <div class="dui-page">
    <header class="pd">
      <div class="flex-center mt-xl">
        <div class="avatar lg" @click="onAvatarClick">DUI</div>
      </div>
      <p class="text-center text-gray">移动端快速布局、高度可自定义Vue 2 UI组件库，以实用为主，避免重复造轮子。作者：Kevin，项目地址：<a href="https://github.com/moohng/dui">https://github.com/moohng/dui</a></p>
    </header>
    <div class="plr ptb-sm text-grey">基本布局（base）</div>
    <div class="dui-list plr bg-white">
      <div class="dui-item" @click="$router.push('layout')">
        <div class="flex-sub">Grid</div>
        <i class="iconfont icon-arrow text-light"></i>
      </div>
      <div class="dui-item" @click="$router.push('button')">
        <div class="flex-sub">Button</div>
        <i class="iconfont icon-arrow text-light"></i>
      </div>
      <div class="dui-item" @click="$router.push('icon')">
        <div class="flex-sub">Icon</div>
        <i class="iconfont icon-arrow text-light"></i>
      </div>
    </div>
    <div class="plr ptb-sm text-grey">组件</div>
    <div class="dui-list bg-white no-bottom">
      <div class="dui-item plr" @click="$router.push('dialog')">
        <div class="flex-sub">Dialog</div>
        <i class="iconfont icon-arrow text-light"></i>
      </div>
      <div class="dui-item plr" @click="onToastClick">Toast</div>
      <div class="dui-item plr" @click="onActionSheetClick">Action Sheet</div>
      <div class="dui-item plr" @click="onActionSheetClick2">Action Sheet 2</div>
      <div class="dui-item plr" @click="onLoadingClick">Loading</div>
      <div class="dui-item plr" @click="$router.push('layout')">
        <div class="flex-sub">Preview</div>
        <i class="iconfont icon-arrow text-light"></i>
      </div>
    </div>
    <div class="plr ptb-sm text-grey">插件</div>
    <div class="dui-list bg-white">
      <div class="dui-item mlr" @click="$router.push('pulldown')">
        <div class="flex-sub">下拉刷新</div>
        <i class="iconfont icon-arrow text-light"></i>
      </div>
      <!-- <div class="dui-item" @click="$router.push('lazyload')">
        <div class="flex-sub">图片加载</div>
        <i class="iconfont icon-arrow text-light"></i>
      </div> -->
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

let timer: number

export default defineComponent({
  name: 'Home',
  data () {
    return {
      clickTimes: 0,
    }
  },
  methods: {
    onToastClick () {
      this.$toast('你好啊')
    },
    onActionSheetClick () {
      this.$actionsheet([
        { name: '选项一' },
        { name: '选项二' },
        { name: '选项三' },
      ], {
        title: '示例',
        cancel: '注销',
        cancelClass: 'text-red',
      }).then((index) => {
        console.log('您点击了：', index)
      })
    },
    onActionSheetClick2 () {
      this.$actionsheet([
        { name: '选项1' },
        { name: '选项2' },
        { name: '选项3' },
      ], {
        title: '示例2',
        cancel: '退出',
        cancelClass: 'text-orange',
      }).then((index) => {
        console.log('您点击了2：', index)
      })
    },
    onLoadingClick () {
      this.$loading()
      window.setTimeout(this.$loading.hide, 2000)
    },
    onAvatarClick () {
      timer && clearTimeout(timer)
      this.clickTimes += 1
      if (this.clickTimes >= 5) {
        this.$router.push({ name: 'Upload' })
      }
      timer = window.setTimeout(() => {
        this.clickTimes = 0
      }, 400)
    },
  },
})
</script>
