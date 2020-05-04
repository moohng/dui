import './toast.scss';
import Toast from './toast.vue';


Toast.install = function install(Vue) {
  if (install.installed) return;
  install.installed = true;

  Vue.prototype.$toast = function toast(text = '') {
    if (!Vue.duiToast) {
      const ToastApp = Vue.extend(Toast);
      Vue.duiToast = new ToastApp();
      const sub = document.createElement('div');
      document.body.appendChild(sub);
      Vue.duiToast.$mount(sub);
    }
    setTimeout(() => {
      Vue.duiToast.show(text);
    }, 20);
  };

  Vue.component(Toast.name, Toast);
};

if (typeof window !== 'undefined' && window.Vue) {
  Toast.install(window.Vue);
}

export default Toast;
