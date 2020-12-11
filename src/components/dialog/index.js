import { reactive, ref } from 'vue'
import Dialog from './dialog.vue'
import { mountComponent } from '../../tools/utils'


export const install = (app) => {
  const dialogRef = ref(null)
  const state = reactive({})

  app.config.globalProperties.$dialog = ({
    title,
    content,
    buttons,
    closable,
  } = {}, clickCallback) => {
    return new Promise((resolve) => {
      state.handleClick = (...args) => {
        if (typeof clickCallback === 'function') {
          clickCallback(...args)
        }
        resolve(...args)
      }

        const { unmount } = mountComponent({
          render() {
            return <Dialog ref={el => dialogRef.value = el} title={state.title} content={state.content} buttons={state.buttons} closable={state.closable} onClick={state.handleClick} onClose={unmount} />
          },
        })

      state.title = title
      state.content = content
      state.buttons = buttons
      state.closable = closable

      dialogRef.value.open()
    })
  }
  // 注册组件
  app.component(Dialog.name, Dialog)
}

Dialog.install = install
export default Dialog
