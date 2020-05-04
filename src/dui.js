import './styles/dui.scss';
import ActionSheet from './components/actionsheet/index';
import Dialog from './components/dialog/index';
import Toast from './components/toast/index';
import Loading from './components/loading/index';

function install(Vue) {
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
