import { Plugin, ComponentPublicInstance, reactive, ref, defineComponent } from 'vue'
import Preview from './preview.vue'
import { mountComponent } from '../../tools/utils'

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $preview: (options: PreviewOptions, index?: number) => void
  }
}

type Point = {
  x: number
  y: number
}

export type PreviewOptions = string[]

type State = {
  point?: Point
  options?: PreviewOptions
  index?: number
}

const plugin: Plugin = {
  install: (app) => {
    let duiPreview: ComponentPublicInstance

    const preRef = ref<{ show: boolean; open: Function } | null>(null)
    const state = reactive<State>({})

    document.body.addEventListener(
      'click',
      ({ clientX, clientY }) => {
        if (!duiPreview || !preRef?.value?.show) {
          state.point = {
            x: clientX,
            y: clientY,
          }
        }
      },
      { capture: true }
    )

    app.config.globalProperties.$preview = (options: PreviewOptions, index = 0) => {
      if (!Array.isArray(options)) {
        options = [options]
      }

      if (!duiPreview) {
        const { instance } = mountComponent(
          defineComponent({
            render() {
              return (
                <Preview
                  ref={(el: any) => (preRef.value = el)}
                  options={state.options}
                  index={state.index}
                  point={state.point}
                  closable={true}
                />
              )
            },
          })
        )
        duiPreview = instance
      }

      // 更新数据
      state.options = options
      state.index = index
      // 打开
      preRef?.value?.open()
    }
    // 注册组件
    app.component(Preview.name, Preview)
  },
}

export default plugin
