import { Plugin } from 'vue'
import IconLoading from './icon-loading.vue'

export const plugin: Plugin = {
  install: (app) => {
    // 注册组件
    app.component(IconLoading.name, IconLoading)
  },
}

export default plugin
