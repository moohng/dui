import { domReady } from './utils'

function setImage(el, src) {
  if (!src) {
    src = el.dataset.src || el.dataset.lazy
  }
  if (el instanceof Image) {
    el.referrerPolicy = 'no-referrer'
    el.src = src
  } else {
    el.style.backgroundImage = `url(${src})`
  }
}

class Lazyload {
  static init(...args) {
    return new this(...args)
  }

  constructor() {
    this.ob = new IntersectionObserver(entries => {
      entries.forEach(item => {
        if (item.intersectionRatio > 0) {
          setImage(item.target)
        }
      })
    }, {})

    domReady(() => {
      document.querySelectorAll('[data-src], [data-lazy]').forEach(item => {
        this.ob.observe(item)
      })
    })
  }

  add(el, src) {
    if (src) {
      el.dataset.src = src
    }
    this.ob.observe(el)
  }

  remove(el) {
    this.ob.unobserve(el)
  }
}

const instance = Lazyload.init()

Lazyload.install = function install(Vue) {
  // v-src 自定义指令
  Vue.directive('src', {
    inserted: (el, { value }) => {
      instance.add(el, value)
    },
    unbind: (el) => {
      instance.remove(el)
    },
  })
}

if (typeof window.Vue !== 'undefined') {
  Lazyload.install(window.Vue)
}

export default Lazyload
