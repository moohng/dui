import '../styles/base.scss'
import ActionSheet from './actionsheet'
import Dialog from './dialog'
import Toast from './toast'
import Loading from './loading'
import Preivew from './preview'
import Refresh from './refresh'
import LoadMore from './load-more'

function install(Vue) {
  // 注册组件
  Vue.use(ActionSheet)
  Vue.use(Dialog)
  Vue.use(Toast)
  Vue.use(Loading)
  Vue.use(Preivew)
  Vue.use(Refresh)
  Vue.use(LoadMore)
}

if (typeof window.Vue !== 'undefined') {
  install(window.Vue)
}

export default {
  install,
}

export {
  ActionSheet,
  Dialog,
  Toast,
  Loading,
  Preivew,
  Refresh,
  LoadMore,
}
