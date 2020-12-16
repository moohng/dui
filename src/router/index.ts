import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../pages/Home.vue'
import Layout from '../pages/Layout.vue'
import Button from '../pages/Button.vue'
import Icon from '../pages/Icon.vue'

import Dialog from '../pages/Dialog.vue'
import Upload from '../pages/Upload.vue'
import PullDown from '../pages/PullDown.vue'

import Lazyload from '../pages/Lazyload.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    meta: {
      title: 'DUI 框架',
    },
    component: Home,
  },
  {
    path: '/layout',
    name: 'Layout',
    meta: {
      title: '布局',
    },
    component: Layout,
  },
  {
    path: '/icon',
    name: 'Icon',
    meta: {
      title: 'Icon',
    },
    component: Icon,
  },
  {
    path: '/dialog',
    name: 'Dialog',
    meta: {
      title: 'Dialog',
    },
    component: Dialog,
  },
  {
    path: '/lazyload',
    name: 'Lazyload',
    meta: {
      title: '懒加载',
    },
    component: Lazyload,
  },
  {
    path: '/button',
    name: 'Button',
    meta: {
      title: 'Button',
    },
    component: Button,
  },
  {
    path: '/pulldown',
    name: 'PullDown',
    meta: {
      title: '下拉刷新',
    },
    component: PullDown,
  },
  {
    path: '/upload',
    name: 'Upload',
    meta: {
      title: '图片上传',
    },
    component: Upload,
  },
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
  // },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    }
    return {
      left: 0,
      top: 0,
    }
  },
})

router.beforeEach((to, from, next) => {
  document.title = to.meta.title ?? process.env.VUE_APP_TITLE
  setTimeout(next) // 保证 popstate 事件在路由切换前执行，专场动画需要
})

let isBack = false

router.afterEach((to, from) => {
  if (from.path !== to.path) {
    to.meta.transition = isBack ? 'slide-right' : 'slide-left'
    isBack = false
  }
})

window.addEventListener('popstate', () => {
  isBack = true
})

export default router
