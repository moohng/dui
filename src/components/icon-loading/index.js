import IconLoading from './icon-loading.vue'


export const install = app => {
  // 注册组件
  app.component(IconLoading.name, IconLoading)
}

IconLoading.install = install
export default IconLoading
