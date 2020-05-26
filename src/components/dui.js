import '../styles/base.scss';
import ActionSheet from './actionsheet';
import Dialog from './dialog';
import Toast from './toast';
import Loading from './loading';
import Scroller from './scroller';

import lazyloadPlugin from '../tools/lazyload';

function install(Vue) {
  // 注册组件
  Vue.use(ActionSheet);
  Vue.use(Dialog);
  Vue.use(Toast);
  Vue.use(Loading);
  Vue.use(Scroller);

  // 其他插件
  Vue.use(lazyloadPlugin);
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
  Scroller,
};
