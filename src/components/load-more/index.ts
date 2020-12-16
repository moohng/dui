import { Plugin } from 'vue'
import LoadMore from './load-more.vue'
import Load from './load.vue'
import Pullup from '../../tools/pullup'

export type LoadMoreEventCallBack = (noMore: boolean) => void

export const plugin: Plugin = {
  install: (app) => {
    app.use(Pullup)
    // 注册组件
    app.component(LoadMore.name, LoadMore)
    app.component(Load.name, Load)
  },
}

export default plugin
