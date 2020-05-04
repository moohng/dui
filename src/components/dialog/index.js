import Dialog from './dialog.vue';
import { assignProps } from '../../tools/utils';


Dialog.install = function install(Vue) {
  if (install.installed) return;
  install.installed = true;

  Vue.prototype.$dialog = function dialog({
    title,
    content,
    buttons,
  } = {}, callback) {
    if (!Vue.duiDialog) {
      // 创建挂载节点
      const sub = document.createElement('div');
      document.body.appendChild(sub);
      // 创建组件实例
      const DialogApp = Vue.extend(Dialog);
      Vue.duiDialog = new DialogApp();
      // 挂载组件
      Vue.duiDialog.$mount(sub);
    }
    assignProps(Vue.duiDialog, {
      title,
      content,
      buttons,
    });
    Vue.duiDialog.click = callback;
    setTimeout(() => {
      Vue.duiDialog.open();
    }, 10);
  };
  // 注册组件
  Vue.component(Dialog.name, Dialog);
};

if (typeof window !== 'undefined' && window.Vue) {
  Dialog.install(window.Vue);
}

export default Dialog;
