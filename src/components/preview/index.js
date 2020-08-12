import './preview.scss'
import Preview from './preview.vue'
import { assignProps } from '../../tools/utils'


Preview.install = function install(Vue) {
  if (install.installed) return
  install.installed = true

  let point = null
  document.body.addEventListener('click', ({ clientX, clientY }) => {
    if (!Vue.duiPreview || !Vue.duiPreview.show) {
      point = {
        pageX: clientX,
        pageY: clientY,
      }
    }
  }, { capture: true })

  function preview(options, index = 0) {
    if (!Array.isArray(options)) {
      options = [options]
    }
    if (!Vue.duiPreview) {
      // 创建挂载节点
      const sub = document.createElement('div')
      document.body.appendChild(sub)
      // 创建组件实例
      const PreviewApp = Vue.extend(Preview)
      Vue.duiPreview = new PreviewApp()
      // 挂载组件
      Vue.duiPreview.$mount(sub)
    }
    assignProps(Vue.duiPreview, {
      options,
      index,
      closable: true,
      point,
    })
    Vue.nextTick(() => {
      Vue.duiPreview.open()
    })
  }
  Vue.prototype.$preview = preview
  // 注册组件
  Vue.component(Preview.name, Preview)
}

if (typeof window !== 'undefined' && window.Vue) {
  Preview.install(window.Vue)
}

export default Preview
