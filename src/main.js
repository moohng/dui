import Vue from 'vue';
import router from './router';
import Dui from './components/dui';
import App from './app.vue';

Vue.use(Dui);

Vue.config.productionTip = false;

window.vm = new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');
