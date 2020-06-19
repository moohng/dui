import '../styles/base.scss';
import ActionSheet from './actionsheet';
import Dialog from './dialog';
import Toast from './toast';
import Loading from './loading';

import lazyloadPlugin from '../tools/lazyload';
import pullDownPlugin from '../tools/pulldown';
import pullUpPlugin from '../tools/pullup';

function install(Vue) {
  // 注册组件
  Vue.use(ActionSheet);
  Vue.use(Dialog);
  Vue.use(Toast);
  Vue.use(Loading);

  // 其他插件
  Vue.use(lazyloadPlugin);
  Vue.use(pullDownPlugin);
  Vue.use(pullUpPlugin);
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
