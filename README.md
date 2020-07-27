# dui

<p>
  <img alt="build" src="https://github.com/moohng/dui/workflows/build/badge.svg">
  <img alt="npm" src="https://github.com/moohng/dui/workflows/npm/badge.svg">
</p>


dui 是移动端轻量级 Vue 2 组件库，主要特性是可以**单个导入**常用的组件，减小包体积；尤其在简单的h5页面开发时，可以快速集成常用组件，减少重复劳动，提高生产力。

dui 以 css 样式布局为主，尽可能的让用户自由的组织dom结构。一般组件是很难做到通用性的，尤其是在样式上，而在保证功能完整性的同时又很难控制代码体积。dui 不是在重复造轮子，它的主要使用场景是**小项目、单纯的HTML页面**。

> 注意：dui 是基于 [postcss-px2vw](https://github.com/moohng/postcss-px2vw) 的移动端适配解决方案实现的，当然你也可以任意覆盖 dui 的样式。

## 导入

dui 包括一套样式布局方案和一套组件库，样式分为基础样式（dui.base）和组件样式，引入组件的时候，必须手动同时引入基础样式和对应的组件样式。

- css关系：dui.css = dui.base.css + (actionsheet.css + dialog.css + ...)
- js关系：dui.js = actionsheet.js + dialog.js + ...

### Script 导入

全部导入（不推荐）

```html
<link type="stylesheet" href="//cdn.jsdelivr.net/npm/@moohng/dui/dist/dui.min.css" />
<script src="//cdn.jsdelivr.net/npm/@moohng/dui/dist/dui.min.js"></script>
```

单个引用（`dui.base.min.css` 必须导入，它是页面的基础布局）

```html
<!-- 必须导入 -->
<link type="stylesheet" href="//cdn.jsdelivr.net/npm/@moohng/dui/dist/dui.base.min.css" />
<link type="stylesheet" href="//cdn.jsdelivr.net/npm/@moohng/dui/dist/dialog.min.css" />
<script src="//cdn.jsdelivr.net/npm/@moohng/dui/dist/dialog.min.js"></script>
```

`dui.base.min.css` 是 dui 的最基本布局，其类名没有 `dui-` 前缀（参考 `Color UI` 命名方案），你可以不使用任何 Vue 组件，使用 dui 布局方案快速进行页面布局。

### ES Module 导入

全部导入（不推荐）

```js
// main.js
import Vue from 'vue';
import Dui from '@moohng/dui';
// 样式
import '@moohng/dui/lib/dui/dui.css';

// 全局注册
Vue.use(Dui);
```

单个导入

```js
import Vue from 'vue';
// import { Dialog } from '@moohng/dui';
import Dialog from '@moohng/dui/lib/dialog';

import '@moohng/dui/lib/dui/dui.base.css';
import '@moohng/dui/lib/dialog/dialog.css';

Vue.use(Dialog);
```

## 使用

在模板中使用（可自由定义弹窗主题内容），如果是通过`script`标签导入，组件会自动注册，直接使用：

```html
<template>
  <div>
    <!-- content -->
    <dui-dialog ref="dialog">
      <!-- 自定义内容 -->
    </dui-dialog>
  </div>
</template>
```

api 快速使用（样式不能自由定义），组件注册时，自动注入 `$dialog` 方法

```html
<script>
export default {
  // ...
  methond: {
    onClick() {
      this.$dialog({
        title: '标题',
        content: '这里是内容',
        buttons: ['取消', '确定'],
      }, (index) => {
        console.log('你点击了', index)
      })
    }
  },
}
</script>
```

具体使用方法请参考该项目源码

## 样式组件

- [x] `Button`：按钮
- [x] `NacBar`：顶部导航
- [x] `List`：列表
- [x] `Icon`：常用图标

## Vue组件

- [x] `this.$dialog(...)`：弹窗
- [x] `this.$actionsheet(...)`：底部弹出
- [x] `this.$loading(...)`：全屏loading
- [x] `this.$toast(...)`：轻提示
- [x] `this.$preview(...)`：图片预览

## 其他Vue插件

Vue 插件从 DUI 中独立了出来，需要单独引入再使用

- `v-src`：懒加载
- `v-pulldown`：下拉刷新
- `v-pullup`：加载更多
