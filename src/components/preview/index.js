import { reactive, ref } from 'vue'
import Preview from './preview.vue'
import { mountComponent } from '../../tools/utils'


Preview.install = app => {
  let duiPreview = null

  const preRef = ref(null)
  const state = reactive({})

  document.body.addEventListener('click', ({ clientX, clientY }) => {
    if (!duiPreview || !preRef?.value?.show) {
      state.point = {
        x: clientX,
        y: clientY,
      }
    }
  }, { capture: true })

  app.config.globalProperties.$preview = (options, index = 0) => {
    if (!Array.isArray(options)) {
      options = [options]
    }
    if (!duiPreview) {
      const { instance } = mountComponent({
        render() {
          return <Preview ref={el => preRef.value = el} options={state.options} index={state.index} point={state.point} closable={true} />
        },
      })
      duiPreview = instance
    }

    // 更新数据
    state.options = options
    state.index = index
    // 打开
    preRef.value.open()
  }
  // 注册组件
  app.component(Preview.name, Preview)
}


export default Preview
