import Refresh from './refresh.vue'
import Pulldown from '../../tools/pulldown'


Refresh.install = function install(Vue) {
  if (install.installed) return
  install.installed = true;

  Vue.use(Pulldown)
  // 注册组件
  Vue.component(Refresh.name, Refresh)
}

if (typeof window !== 'undefined' && window.Vue) {
  Refresh.install(window.Vue)
}

export default Refresh
