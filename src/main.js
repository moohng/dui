import Vue from 'vue'
import VuePageStack from 'vue-page-stack'
import router from './router'
import Dui from './components/dui'
import LazyLoad from './tools/lazyload';
import App from './app.vue'


Vue.use(VuePageStack, { router })
Vue.use(Dui)
Vue.use(LazyLoad);

Vue.config.productionTip = false

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app')
