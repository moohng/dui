import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../pages/Home.vue';
import Layout from '../pages/Layout.vue';
import Button from '../pages/Button.vue';

import Dialog from '../pages/Dialog.vue';
import PullDown from '../pages/PullDown.vue';

import Lazyload from '../pages/Lazyload.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/layout',
    name: 'Layout',
    component: Layout,
  },
  {
    path: '/dialog',
    name: 'Dialog',
    component: Dialog,
  },
  {
    path: '/lazyload',
    name: 'Lazyload',
    component: Lazyload,
  },
  {
    path: '/button',
    name: 'Button',
    component: Button,
  },
  {
    path: '/pulldown',
    name: 'PullDown',
    component: PullDown,
  },
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
  // },
];

const router = new VueRouter({
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    }
    return {
      x: 0,
      y: 0,
    };
  },
});

router.beforeEach((to, from, next) => {
  document.title = to.meta.title ?? process.env.VUE_APP_TITLE
  next()
})

export default router;
