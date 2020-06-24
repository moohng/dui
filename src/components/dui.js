import '../styles/base.scss';
import ActionSheet from './actionsheet';
import Dialog from './dialog';
import Toast from './toast';
import Loading from './loading';

function install(Vue) {
  // 注册组件
  Vue.use(ActionSheet);
  Vue.use(Dialog);
  Vue.use(Toast);
  Vue.use(Loading);
}

if (typeof window.Vue !== 'undefined') {
  install(window.Vue);
}

export default {
  install,
};

export {
  ActionSheet,
  Dialog,
  Toast,
  Loading,
};
