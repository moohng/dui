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
    inserted: (el, { value }) => {
      setImage(el, value)
    },
    updated: (el, { value }) => {
      setImage(el, value)
    },
  })
}

if (typeof window.Vue !== 'undefined') {
  plugin(window.Vue)
}

export default plugin
