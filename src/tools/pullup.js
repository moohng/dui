import { querySelector, pop } from './utils'

class PullUp {
  constructor(el, {
    threshold,
    onLoadMore = pop,
  } = {}) {
    this.threshold = threshold
    this.onLoadMore = onLoadMore
    this.loading = false
    this.lastPosition = 0

    this.$el = querySelector(el, null)

    this.pullupHeight = this.$el ? this.$el.offsetHeight : 0
    if (typeof this.threshold === 'number') {
      this.pullupHeight = this.threshold
    }
    // 使用节流函数会掉帧，可能导致不能触发加载更多
    // this.handlerScroll = throttle.call(this, this.handlerScroll, 16.7)
    this.handlerScroll = this.handlerScroll.bind(this)
    window.addEventListener('scroll', this.handlerScroll, false)
  }

  handlerScroll() {
    const { scrollTop, scrollHeight, clientHeight } = document.scrollingElement
    const toBottom = scrollHeight - scrollTop - clientHeight
    if (!this.loading && toBottom < this.lastPosition && toBottom <= this.pullupHeight) {
      this.loading = true
      const res = this.onLoadMore(this.finished.bind(this))
      if (res instanceof Promise) {
        res.then(this.finished.bind(this))
      }
    }
    if (this.loading && toBottom > this.pullupHeight) {
      this.loading = false
    }
    this.lastPosition = toBottom
  }

  finished() {
    this.lastPosition = 0
  }

  destroy() {
    window.removeEventListener('scroll', this.handlerScroll, false)
  }
}

PullUp.install = app => {
  app.directive('pullup', {
    mounted: (el, { value }) => {
      el.pullup = new PullUp(el, value)
    },
    unmounted: (el) => {
      el.pullup.destroy()
    },
  })
}

export default PullUp
