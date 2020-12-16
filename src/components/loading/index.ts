import Loading from './loading.vue'
import { ComponentPublicInstance, Plugin } from 'vue'
import { mountComponent } from '../../tools/utils'

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $loading: ((text?: string) => void) & { hide: () => void }
  }
}

export const plugin: Plugin = {
  install: (app) => {
    let duiLoading: ComponentPublicInstance

    app.config.globalProperties.$loading = (text: string) => {
      if (!duiLoading) {
        const { instance } = mountComponent(Loading)
        duiLoading = instance
      }
      ;(duiLoading as any).open(text)
      app.config.globalProperties.$loading.hide = (duiLoading as any).close
    }
    // 注册组件
    app.component(Loading.name, Loading)
  },
}

export default plugin
