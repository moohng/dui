import { Plugin } from 'vue'
import Refresh from './refresh.vue'
import Pulldown from '../../tools/pulldown'

export type RefreshEventCallBack = (isSuccess: boolean) => void

const plugin: Plugin = {
  install: (app) => {
    app.use(Pulldown)
    // 注册组件
    app.component(Refresh.name, Refresh)
  },
}

export default plugin
