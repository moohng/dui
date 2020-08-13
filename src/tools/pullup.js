import { pop } from './utils'

class PullUp {
  constructor(el, onLoadMore = pop) {
    this.ob = new IntersectionObserver(entries => {
      entries.forEach(item => {
        if (item.intersectionRatio > 0) {
          onLoadMore()
        }
      })
    })
    this.ob.observe(el)
  }

  destroy() {
    this.ob.disconnect()
  }
}

PullUp.install = function install(Vue) {
  Vue.directive('pullup', {
    inserted: (el, { value }) => {
      el.pullup = new PullUp(el, value)
    },
    unbind: (el) => {
      el.pullup.destroy()
    },
  })
}

if (typeof window.Vue !== 'undefined') {
  PullUp.install(window.Vue)
}

export default PullUp
