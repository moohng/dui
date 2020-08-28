import LoadMore from './load-more.vue'


LoadMore.install = function install(Vue) {
  if (install.installed) return
  install.installed = true;

  // 注册组件
  Vue.component(LoadMore.name, LoadMore)
}

if (typeof window !== 'undefined' && window.Vue) {
  LoadMore.install(window.Vue)
}

export default LoadMore
