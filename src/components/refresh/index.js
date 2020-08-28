import Refresh from './refresh.vue'


Refresh.install = function install(Vue) {
  if (install.installed) return
  install.installed = true;

  // 注册组件
  Vue.component(Refresh.name, Refresh)
}

if (typeof window !== 'undefined' && window.Vue) {
  Refresh.install(window.Vue)
}

export default Refresh
