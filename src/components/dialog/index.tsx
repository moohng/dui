import { Plugin, reactive, ref, nextTick } from 'vue'
import Dialog from './dialog.vue'
import { mountComponent, pop } from '../../tools/utils'

export type ClickCallback = (...args: [number, any]) => void

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $dialog: (options: DialogOptions, clickCallback?: ClickCallback) => Promise<{ index: number }>
  }
}

export type Button = {
  text: string
  class?: string
  onClick?: (index: number, button: Button) => Promise<void> | void
}

export type DialogOptions = {
  title?: string
  content?: string
  closable?: boolean
  buttons?: Button[]
}

const plugin: Plugin = {
  install: (app) => {
    const dialogRef = ref<{ open: () => void } | null>(null)
    const state = reactive<{ handleClick?: ClickCallback } & DialogOptions>({})

    app.config.globalProperties.$dialog = (
      { title, content, buttons, closable }: DialogOptions,
      clickCallback?: ClickCallback
    ) => {
      return new Promise((resolve) => {
        state.handleClick = (...args: [number, any]) => {
          if (typeof clickCallback === 'function') {
            clickCallback(...args)
          }
          resolve(args[0])
        }

        const { unmount } = mountComponent({
          render() {
            return (
              <Dialog
                ref={(el: any) => (dialogRef.value = el)}
                title={state.title}
                content={state.content}
                buttons={state.buttons}
                closable={state.closable}
                onClick={state.handleClick}
                onClose={unmount}
              />
            )
          },
        })

        state.title = title
        state.content = content
        state.buttons = buttons
        state.closable = closable

        nextTick(dialogRef?.value?.open)
      })
    }
    // 注册组件
    app.component(Dialog.name, Dialog)
  },
}

export default plugin
