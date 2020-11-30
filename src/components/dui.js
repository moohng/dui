import ActionSheet from './actionsheet'
import Dialog from './dialog'
import Toast from './toast'
import Loading from './loading'
import Preview from './preview'
import Refresh from './refresh'
import LoadMore from './load-more'

function install(app) {
  // 注册组件
  app.use(ActionSheet)
  app.use(Dialog)
  app.use(Toast)
  app.use(Loading)
  app.use(Preview)
  app.use(Refresh)
  app.use(LoadMore)
}

export default {
  install,
}

export {
  install,
  ActionSheet,
  Dialog,
  Toast,
  Loading,
  Preview,
  Refresh,
  LoadMore,
}
