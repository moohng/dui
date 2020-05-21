import './scroller.scss';
import Scroller from './scroller.vue';

Scroller.install = function install(Vue) {
  if (install.installed) return;
  install.installed = true;

  // 注册组件
  Vue.component(Scroller.name, Scroller);
};

if (typeof window !== 'undefined' && window.Vue) {
  Scroller.install(window.Vue);
}

export default Scroller;
