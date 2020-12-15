import { Plugin, ComponentPublicInstance } from 'vue'
import Toast from './toast.vue'
import { mountComponent } from '../../tools/utils'

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $toast: (text?: string) => void;
  }
}

const plugin: Plugin = {
  install: app => {
    let duiToast: ComponentPublicInstance

    app.config.globalProperties.$toast = (text = '') => {
      if (!duiToast) {
        const { instance } = mountComponent(Toast)
        duiToast = instance
      }
      (duiToast as any).show(text)
    }

    app.component(Toast.name, Toast)
  },
}

export default plugin
