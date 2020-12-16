import { ComponentPublicInstance, Plugin, reactive, ref } from 'vue'
import Actionsheet from './actionsheet.vue'
import { mountComponent } from '../../tools/utils'

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $actionsheet: (menus: Menus, options: ActionSheetOptions) => Promise<{ index: number }>
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
  handleClick?: HandleClickCallback
}

const plugin: Plugin = {
  install: (app) => {
    let duiActionsheet: ComponentPublicInstance
    const asRef = ref<{ open: Function } | null>(null)
    const state = reactive<ActionSheetOptions & { menus?: Menus }>({})

    app.config.globalProperties.$actionsheet = (
      menus: Menus,
      { title, cancel, cancelClass, onClick: clickCallback }: ActionSheetOptions
    ) => {
      return new Promise((resolve) => {
        state.handleClick = (...args) => {
          if (typeof clickCallback === 'function') {
            clickCallback(...args)
          }
          resolve(args[0])
        }
        if (!duiActionsheet) {
          const { instance } = mountComponent({
            render() {
              return (
                <Actionsheet
                  ref={(el: any) => (asRef.value = el)}
                  menus={state.menus}
                  title={state.title}
                  cancel={state.cancel}
                  cancelClass={state.cancelClass}
                  onClick={state.handleClick}
                />
              )
            },
          })
          duiActionsheet = instance
        }

        state.title = title
        state.cancel = cancel
        state.cancelClass = cancelClass
        state.menus = menus

        asRef?.value?.open()
      })
    }
    // 注册组件
    app.component(Actionsheet.name, Actionsheet)
  },
}

export default plugin
