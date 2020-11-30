import Refresh from './refresh.vue'
import Pulldown from '../../tools/pulldown'


export const install = app => {
  app.use(Pulldown)
  // 注册组件
  app.component(Refresh.name, Refresh)
}

Refresh.install = install
export default Refresh
