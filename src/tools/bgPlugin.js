import Lazyload from './lazyload';

// 背景图 懒加载
export default function install(Vue) {
  const lz = Lazyload.init();

  Vue.directive('src', {
    bind: (el, { value }) => {
      lz.add(el, value);
    },
    update: (el, { value, oldValue }) => {
      if (value !== oldValue) {
        lz.add(el, value);
      }
    },
    unbind: (el) => {
      lz.remove(el);
    },
  });
}
