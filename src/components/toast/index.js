import Toast from './toast.vue'
import { mountComponent } from '../../tools/utils'

export const install = app => {
  let duiToast = null

  app.config.globalProperties.$toast = (text = '') => {
    if (!duiToast) {
      const { instance } = mountComponent(Toast)
      duiToast = instance
    }
    duiToast.show(text)
  }

  app.component(Toast.name, Toast)
}

Toast.install = install
export default Toast
