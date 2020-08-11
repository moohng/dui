import Vue from 'vue'
import VuePageStack from 'vue-page-stack'
import router from './router'
import Dui from './components/dui'
import LazyLoad from './tools/lazyload'
import App from './app.vue'
import axios from './api/http'

Vue.use(VuePageStack, { router })
Vue.use(Dui)
Vue.use(LazyLoad);

Vue.prototype.$http = axios
Vue.prototype.$get = axios.get
Vue.prototype.$post = axios.post

Vue.config.productionTip = false

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app')
