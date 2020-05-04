import './actionsheet.scss';
import Actionsheet from './actionsheet.vue';
import { assignProps } from '../../tools/utils';


Actionsheet.install = function install(Vue) {
  if (install.installed) return;
  install.installed = true;

  Vue.prototype.$actionsheet = function actionsheet(menus = [], {
    title,
    cancel,
    cancelClass,
    onClick: callback,
  } = {}) {
    if (!Vue.duiActionsheet) {
      // 创建挂载节点
      const sub = document.createElement('div');
      document.body.appendChild(sub);
      // 创建组件实例
      const ActionsheetApp = Vue.extend(Actionsheet);
      Vue.duiActionsheet = new ActionsheetApp();
      // 挂载组件
      Vue.duiActionsheet.$mount(sub);
    }
    assignProps(Vue.duiActionsheet, {
      menus,
      title,
      cancel,
      cancelClass,
    });
    Vue.duiActionsheet.click = callback;
    setTimeout(() => {
      Vue.duiActionsheet.open();
    }, 10);
  };
  // 注册组件
  Vue.component(Actionsheet.name, Actionsheet);
};

if (typeof window.Vue !== 'undefined') {
  Actionsheet.install(window.Vue);
}

export default Actionsheet;
