import LoadMore from './load-more.vue'
import Pullup from '../../tools/pullup'


LoadMore.install = function install(Vue) {
  if (install.installed) return
  install.installed = true;

  Vue.use(Pullup)
  // 注册组件
  Vue.component(LoadMore.name, LoadMore)
}

if (typeof window !== 'undefined' && window.Vue) {
  LoadMore.install(window.Vue)
}

export default LoadMore
