import LoadMore from './load-more.vue'
import Load from './load.vue'
import Pullup from '../../tools/pullup'


export const install = app => {
  app.use(Pullup)
  // 注册组件
  app.component(LoadMore.name, LoadMore)
  app.component(Load.name, Load)
}

LoadMore.install = install
export default LoadMore
