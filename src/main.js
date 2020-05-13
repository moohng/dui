import Vue from 'vue';
import router from './router';
import Dui from './components/dui';

Vue.use(Dui);

Vue.config.productionTip = false;

window.vm = new Vue({
  router,
  render: (h) => h('router-view'),
}).$mount('#app');
