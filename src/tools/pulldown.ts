import { Plugin } from 'vue'
import { querySelector, pop } from './utils'

export type onPullDownRefreshCallback = (finished: Function) => void | Promise<void>
export type onPullDownCallback = (y: number, flag: boolean) => void

export type PullDownOptions = {
  scroller?: Element | string | Function
  threshold?: number
  stopTime?: number
  bounceTime?: number
  onPullDownRefresh?: onPullDownRefreshCallback
  onPullDown?: onPullDownCallback
}

class PullDown {
  private el: any
  private $el: any
  private $scroller: any
  private $container: any
  private threshold: number
  private stopTime: number
  private bounceTime: number
  private onPullDownRefresh: onPullDownRefreshCallback
  private onPullDown: onPullDownCallback

  private startY = 0 // 记录手指按下时的最初位置
  private pageMoveY = 0 // 页面被拉动的距离
  private stopY = 0
  private isFirst = true
  private canPullDown = false
  private isRefreshing = false
  private isScrolling = false

  constructor(
    el: any,
    {
      scroller = document.scrollingElement || document.documentElement,
      threshold = 0,
      stopTime = 400,
      bounceTime = 200,
      onPullDownRefresh = pop,
      onPullDown = pop,
    }: PullDownOptions
  ) {
    this.el = el // 下拉刷新节点
    this.$scroller = querySelector(scroller) // 滚动容器 默认是 window
    this.threshold = threshold // 触发下拉刷新的距离
    this.stopTime = stopTime // 刷新完成停留的时间
    this.bounceTime = bounceTime // 回到指定位置动画持续时间
    this.onPullDownRefresh = onPullDownRefresh
    this.onPullDown = onPullDown

    this.handlerStart = this.handlerStart.bind(this)
    this.handlerMove = this.handlerMove.bind(this)
    this.handlerEnd = this.handlerEnd.bind(this)

    this.init()
  }

  init() {
    this.$el = querySelector(this.el)
    this.$container = this.$el.parentElement // 刷新容器是下拉刷新节点的父节点
    this.stopY = this.$el.offsetHeight // 刷新时停住的位置
    this.threshold = this.threshold || this.stopY * 1.12

    // 设置下拉组件的样式
    const { style } = this.$el
    style.position = 'absolute'
    style.top = '0'
    style.left = '0'
    style.width = '100%'
    style.transform = 'translateY(-100%) translateZ(0)'

    this.$container.style.position = 'relative'

    // 监听事件
    this.$container.addEventListener('touchstart', this.handlerStart)
    this.$container.addEventListener('touchmove', this.handlerMove, { passive: false })
    this.$container.addEventListener('touchend', this.handlerEnd)
    this.$container.addEventListener('touchcancel', this.handlerEnd)
  }

  destroy() {
    this.$container.removeEventListener('touchstart', this.handlerStart)
    this.$container.removeEventListener('touchmove', this.handlerMove, { passive: false })
    this.$container.removeEventListener('touchend', this.handlerEnd)
    this.$container.removeEventListener('touchcancel', this.handlerEnd)
  }

  handlerEnd() {
    if (!this.canPullDown) {
      return
    }
    this.canPullDown = false
    // 页面下拉的距离大于设置的阈值 触发下拉刷新
    if (this.pageMoveY > this.threshold) {
      // 正在刷新
      this.isRefreshing = true
      this.ani(this.$container, this.stopY, this.bounceTime) // 回到指定的停留位置
      const res = this.onPullDownRefresh(this.finished.bind(this)) // 执行刷新回调
      if (res instanceof Promise) {
        res.finally(() => {
          this.finished()
        })
      }
    } else {
      // 回到顶部
      this.ani(this.$container, 0, this.bounceTime)
    }
  }

  handlerMove(e: TouchEvent) {
    const currentY = e.touches[0].pageY
    let moveY = currentY - this.startY // 手指滑动的距离
    /**
     * 触发下拉的条件：
     * 1. 手指往下滑动
     * 2. 当前不是刷新状态
     * 3. 当前不是执行动画滚动状态
     * 4. 页面已滚动到最顶部
     */
    if (moveY > 0 && !this.isRefreshing && !this.isScrolling && this.$scroller.scrollTop <= 0) {
      e.preventDefault()
      // 触发下拉刷新的条件
      if (this.isFirst) {
        // 只执行一次，设置一些初始值
        this.isFirst = false
        this.startY = currentY
        moveY = 0
        this.canPullDown = true
      }
      this.pageMoveY = moveY * 0.4 // 页面滚动的距离
      this.ani(this.$container, this.pageMoveY) // 页面跟随手指滚动
      this.onPullDown(this.pageMoveY, this.pageMoveY > this.threshold) // 执行页面滚动回调
    }
  }

  handlerStart(e: TouchEvent) {
    this.startY = e.touches[0].pageY
  }

  // 滚动到指定位置
  ani(el: HTMLElement, y: number, time?: number, func?: Function) {
    el.style.transform = `translateY(${y}px) translateZ(0)`
    if (time) {
      this.isScrolling = true
      el.style.transition = `transform ${time}ms ease`
      setTimeout(() => {
        el.style.transition = ''
        this.isScrolling = false
        this.isFirst = true
        if (typeof func === 'function') {
          func()
        }
      }, time)
    }
  }

  finished() {
    setTimeout(() => {
      // 结束刷新
      this.ani(this.$container, 0, this.bounceTime, () => {
        this.isRefreshing = false
      })
    }, this.stopTime)
  }
}

const plugin: Plugin = {
  install: (app) => {
    app.directive('pulldown', {
      mounted(el, { value }) {
        el.pulldown = new PullDown(el, value)
      },
      unmounted(el) {
        el.pulldown.destroy()
      },
    })
  },
}

export default plugin
