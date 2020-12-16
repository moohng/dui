import { Plugin } from 'vue'
import { querySelector, pop } from './utils'

export type onLoadMoreCallback = (finished: Function) => void | Promise<void>

export type PullUpOptions = {
  threshold: number
  onLoadMore: onLoadMoreCallback
}

class PullUp {
  private $el: any
  private threshold: number
  private onLoadMore: onLoadMoreCallback
  private pullupHeight: number

  private loading = false
  private lastPosition = 0

  constructor(el: any, { threshold, onLoadMore = pop }: PullUpOptions) {
    this.threshold = threshold
    this.onLoadMore = onLoadMore

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
    const { scrollTop, scrollHeight, clientHeight } = document.scrollingElement || document.documentElement
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

const plugin: Plugin = {
  install: (app) => {
    app.directive('pullup', {
      mounted: (el, { value }) => {
        el.pullup = new PullUp(el, value)
      },
      unmounted: (el) => {
        el.pullup.destroy()
      },
    })
  },
}

export default plugin
