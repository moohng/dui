import modalHelper from '../../tools/modalHelper'
import { App, defineComponent } from 'vue'
import { mountComponent } from '../../tools/utils'

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $loading: (text?: string) => () => void | void
  }
}

const loading = (app: App | string = '数据加载中'): (() => void) | void => {
  if (typeof (app as App).version === 'string') {
    ;(app as App).config.globalProperties.$loading = loading
  } else {
    const { unmount } = mountComponent(
      defineComponent({
        render() {
          return (
            <div class="dui-loading show">
              <div class="mask transparent"></div>
              <div class="dui-loading__body pd">
                <i class="dui-icon__loading"></i>
                <div class="mt-sm">{app}</div>
              </div>
            </div>
          )
        },
      })
    )
    modalHelper.afterOpen()
    return ((loading as any).hide = () => {
      modalHelper.beforeClose()
      unmount()
    })
  }
}

export default loading
