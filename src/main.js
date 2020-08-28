import Vue from 'vue'
import VuePageStack from 'vue-page-stack'
import router from './router'
import Dui from './components/dui'
import LazyLoad from './tools/lazyload'
import App from './app.vue'
import axios from './api/http'

if (process.env.NODE_ENV !== 'production') {
  const VConsole = require('vconsole')
  new VConsole()
}

Vue.use(VuePageStack, { router })
Vue.use(Dui)
Vue.use(LazyLoad)

Vue.prototype.$http = axios
Vue.prototype.$get = axios.get
Vue.prototype.$post = axios.post

const ua = window.navigator.userAgent
Vue.prototype.$isWeixin = /MicroMessenger/i.test(ua)

Vue.mixin({
  data() {
    return {
      hasNavbar: !(this.$isWeixin)
    }
  },
})

Vue.config.productionTip = false

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app')
