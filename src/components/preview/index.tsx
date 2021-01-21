import { reactive, ref, defineComponent, App } from 'vue'
import Preview from './preview.vue'
import { mountComponent } from '../../tools/utils'

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $preview: (options: PreviewOptions, index?: number) => void
  }
}

export type PreviewOptions = string[]

type State = {
  options?: PreviewOptions
  index?: number
}

const preview = (app: App<any> | PreviewOptions, index?: number) => {
  if (Array.isArray(app)) {
    let options = app
    if (typeof options === 'string') {
      options = [options]
    }

    const preRef = ref<{ toggle: boolean; open: Function } | null>(null)
    const state = reactive<State>({
      options,
      index,
    })

    const { unmount } = mountComponent(
      defineComponent({
        render() {
          const handleClose = () => unmount()
          return (
            <Preview
              ref={(el: any) => (preRef.value = el)}
              options={state.options}
              index={state.index}
              closable={true}
              onClose={handleClose}
            />
          )
        },
      })
    )

    // 打开
    preRef?.value?.open(index)
  } else {
    app.config.globalProperties.$preview = (options: PreviewOptions, index = 0) => preview(options, index)
    // 注册组件
    app.component(Preview.name, Preview)
  }
}

export default preview
