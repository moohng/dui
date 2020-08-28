import IconLoading from './icon-loading.vue'


IconLoading.install = function install(Vue) {
  if (install.installed) return
  install.installed = true;

  // 注册组件
  Vue.component(IconLoading.name, IconLoading)
}

if (typeof window !== 'undefined' && window.Vue) {
  IconLoading.install(window.Vue)
}

export default IconLoading
