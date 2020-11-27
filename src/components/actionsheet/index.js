import { reactive, ref } from 'vue'
import Actionsheet from './actionsheet.vue'
import { mountComponent } from '../../tools/utils'


Actionsheet.install = app => {
  let duiActionsheet = null;
  const asRef = ref(null)
  const state = reactive({})

  app.config.globalProperties.$actionsheet = (menus = [], {
    title,
    cancel,
    cancelClass,
    onClick: clickCallback,
  } = {}) => {
    return new Promise((resolve) => {
      state.handleClick = (...args) => {
        if (typeof clickCallback === 'function') {
          clickCallback(...args)
        }
        resolve(...args)
      }
      if (!duiActionsheet) {
        const { instance } = mountComponent({
          render() {
            return <Actionsheet ref={el => asRef.value = el} menus={state.menus} title={state.title} cancel={state.cancel} cancelClass={state.cancelClass} onClick={state.handleClick} />
          },
        })
        duiActionsheet = instance
      }

      state.title = title
      state.cancel = cancel
      state.cancelClass = cancelClass
      state.menus = menus

      asRef.value.open()
    })
  }
  // 注册组件
  app.component(Actionsheet.name, Actionsheet)
}

if (typeof window.Vue !== 'undefined') {
  Actionsheet.install(window.Vue)
}

export default Actionsheet
