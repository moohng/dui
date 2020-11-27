import Refresh from './refresh.vue'
import Pulldown from '../../tools/pulldown'


Refresh.install = app => {
  app.use(Pulldown)
  // 注册组件
  app.component(Refresh.name, Refresh)
}

export default Refresh
