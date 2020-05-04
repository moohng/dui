import Vue from 'vue';
// import Dui from '@moohng/dui';
import App from './App.vue';

Vue.config.productionTip = false;

// Vue.use(Dui);

window.vm = new Vue({
  render: (h) => h(App),
}).$mount('#app');
