import { App, DirectiveBinding } from 'vue'

function setImage(el: HTMLElement, src: string) {
  if (!src) {
    return
  }
  if (el instanceof Image) {
    el.src = src
  } else {
    el.style.backgroundImage = `url("${src}")` // 防止链接中有 () 字符
  }
}

function plugin(app: App) {
  // v-src 自定义指令
  app.directive('src', {
    mounted: (el: HTMLElement, { value }: DirectiveBinding) => {
      setImage(el, value)
    },
    unmounted: (el: HTMLElement, { value }: DirectiveBinding) => {
      setImage(el, value)
    },
  })
}

export default plugin
