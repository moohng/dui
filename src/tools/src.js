function setImage(el, src) {
  if (!src) {
    return
  }
  if (el instanceof Image) {
    el.src = src
  } else {
    el.style.backgroundImage = `url("${src}")` // 防止链接中有 () 字符
  }
}

function plugin(Vue) {
  // v-src 自定义指令
  Vue.directive('src', {
    mounted: (el, { value }) => {
      setImage(el, value)
    },
    unmounted: (el, { value }) => {
      setImage(el, value)
    },
  })
}


export default plugin
