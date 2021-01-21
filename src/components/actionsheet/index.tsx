import { App, ref, nextTick, defineComponent } from 'vue'
import Actionsheet from './actionsheet.vue'
import { mountComponent } from '../../tools/utils'

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $actionsheet: (menus: Menus, options: ActionSheetOptions) => Promise<number | string>
  }
}

export type HandleClickCallback = (...args: [(number | string)?, any?]) => void

export type Menu = {
  id?: number | string
  key?: number | string
  name: string
  class?: string
  onClick?: HandleClickCallback
}

export type Menus = Menu[] | string[]

export type ActionSheetOptions = {
  title?: string
  cancel?: string
  cancelClass?: string
  onClick?: HandleClickCallback
}

const actionsheet = (app: App<any> | Menus, options?: ActionSheetOptions): Promise<number | string> => {
  if (typeof (app as App).component === 'function') {
    ;(app as App).config.globalProperties.$actionsheet = (menus: Menus, options: ActionSheetOptions) =>
      actionsheet(menus, options)
    // 注册组件
    ;(app as App).component(Actionsheet.name, Actionsheet)

    return Promise.resolve(0)
  } else {
    const { title, cancel, cancelClass, onClick: clickCallback } = options || {}
    const asRef = ref<{ open: () => void } | null>(null)

    return new Promise((resolve) => {
      const handleClick: HandleClickCallback = (...args) => {
        if (typeof clickCallback === 'function') {
          clickCallback(...args)
        }
        resolve(args[0]!)
      }

      const { unmount } = mountComponent(
        defineComponent({
          render() {
            const handleClose = () => unmount()
            return (
              <Actionsheet
                ref={(el: any) => (asRef.value = el)}
                menus={app as Menus}
                title={title}
                cancel={cancel}
                cancelClass={cancelClass}
                onClick={handleClick}
                onClose={handleClose}
              />
            )
          },
        })
      )

      nextTick(asRef?.value?.open)
    })
  }
}

export default actionsheet
