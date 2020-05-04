import Loading from './loading.vue';


Loading.install = function install(Vue) {
  if (install.installed) return;
  install.installed = true;

  function loading(text) {
    if (!Vue.duiLoading) {
      // 创建挂载节点
      const sub = document.createElement('div');
      document.body.appendChild(sub);
      // 创建组件实例
      const LoadingApp = Vue.extend(Loading);
      Vue.duiLoading = new LoadingApp();
      // 挂载组件
      Vue.duiLoading.$mount(sub);
    }
    loading.hide = Vue.duiLoading.close;
    setTimeout(() => {
      Vue.duiLoading.open(text);
    }, 10);
  }
  Vue.prototype.$loading = loading;
  // 注册组件
  Vue.component(Loading.name, Loading);
};

if (typeof window !== 'undefined' && window.Vue) {
  Loading.install(window.Vue);
}

export default Loading;
