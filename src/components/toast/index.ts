import { ComponentPublicInstance, App } from 'vue'
import Toast from './toast.vue'
import { mountComponent } from '../../tools/utils'

type ToastFunction = (text?: string) => void

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $toast: ToastFunction
  }
}

let duiToast: ComponentPublicInstance

const toast = (app: App<any> | string = '') => {
  if (typeof app === 'string') {
    if (!duiToast) {
      const { instance } = mountComponent(Toast)
      duiToast = instance
    }
    ;(duiToast as any).show(app)
  } else {
    app.config.globalProperties.$toast = (text: string) => toast(text)
    app.component(Toast.name, Toast)
  }
}

export default toast
