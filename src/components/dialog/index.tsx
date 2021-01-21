import { App, ref, nextTick, defineComponent } from 'vue'
import Dialog from './dialog.vue'
import { mountComponent } from '../../tools/utils'

export type ClickCallback = (...args: [number, any]) => void

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $dialog: (options: DialogOptions, clickCallback?: ClickCallback) => Promise<number>
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

const dialog = (app: App<any> | DialogOptions, clickCallback?: ClickCallback): Promise<number> => {
  if (typeof (app as App).component === 'function') {
    ;(app as App).config.globalProperties.$dialog = (
      options: DialogOptions,
      clickCallback?: ClickCallback
    ): Promise<number> => dialog(options, clickCallback)
    // 注册组件
    ;(app as App).component(Dialog.name, Dialog)
    return Promise.resolve(0)
  } else {
    const { title, content, buttons, closable } = app as DialogOptions

    const dialogRef = ref<{ open: () => void } | null>(null)

    return new Promise((resolve) => {
      const handleClick = (...args: [number, any]) => {
        if (typeof clickCallback === 'function') {
          clickCallback(...args)
        }
        resolve(args[0])
      }

      const { unmount } = mountComponent(
        defineComponent({
          render() {
            const handleClose = () => unmount()
            return (
              <Dialog
                ref={(el: any) => (dialogRef.value = el)}
                title={title}
                content={content}
                buttons={buttons}
                closable={closable}
                onClick={handleClick}
                onClose={handleClose}
              />
            )
          },
        })
      )

      nextTick(dialogRef?.value?.open)
    })
  }
}

export default dialog
