import './loading.scss'
import Loading from './loading.vue'
import { mountComponent } from '../../tools/utils'


Loading.install = app => {
  let duiLoading = null

  app.config.globalProperties.$loading = text => {
    if (!duiLoading) {
      const { instance } = mountComponent(Loading)
      duiLoading = instance
    }
    duiLoading.open(text)
    app.config.globalProperties.$loading.hide = duiLoading.close
  }
  // 注册组件
  app.component(Loading.name, Loading)
}


export default Loading
