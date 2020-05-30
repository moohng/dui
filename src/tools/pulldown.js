import { querySelector, pop, domReady } from './utils';

function ani(el, y, time, func) {
  el.style.transform = `translateY(${y}px) translateZ(0)`;
  if (time) {
    el.style.transition = `transform ${time}ms ease`;
    setTimeout(() => {
      el.style.transition = null;
      if (typeof func === 'function') {
        func();
      }
    }, time);
  }
}

class PullDown {
  constructor(el, {
    wrapper,
    threshold,
    stopTime = 400,
    onPullDownRefresh = pop,
    onPullDown = pop,
  } = {}) {
    this.el = el;
    this.wrapper = wrapper;
    this.threshold = threshold;
    this.stopTime = stopTime;
    this.onPullDownRefresh = onPullDownRefresh;
    this.onPullDown = onPullDown;
    this.startY = null;
    this.isFirst = true;

    this.handlerStart = this.handlerStart.bind(this);
    this.handlerMove = this.handlerMove.bind(this);
    this.handlerEnd = this.handlerEnd.bind(this);

    domReady(() => {
      this.init();
    });
  }

  init() {
    this.$el = querySelector(this.el);
    this.$wrapper = querySelector(this.wrapper, document.scrollingElement);
    this.$scroller = this.$el.parentElement;
    this.stop = this.$el.offsetHeight;
    this.threshold = this.threshold || this.stop * 1.12;

    // 设置下拉组件的样式
    const { style } = this.$el;
    style.position = 'absolute';
    style.top = '0';
    style.left = '0';
    style.width = '100%';
    style.transform = 'translateY(-100%)';

    this.$scroller.style.position = 'relative';

    // 监听事件
    this.$wrapper.addEventListener('touchstart', this.handlerStart);
    this.$wrapper.addEventListener('touchmove', this.handlerMove, { passive: false });
    this.$wrapper.addEventListener('touchend', this.handlerEnd);
    this.$wrapper.addEventListener('touchcancel', this.handlerEnd);
  }

  destroy() {
    this.$wrapper.removeEventListener('touchstart', this.handlerStart);
    this.$wrapper.removeEventListener('touchmove', this.handlerMove, { passive: false });
    this.$wrapper.removeEventListener('touchend', this.handlerEnd);
    this.$wrapper.removeEventListener('touchcancel', this.handlerEnd);
  }

  handlerEnd() {
    if (!this.canPullDown) {
      return;
    }
    this.canPullDown = false;
    this.isScrolling = true;
    if (this.moveY > this.threshold) {
      // 正在刷新
      this.isRefreshing = true;
      ani(this.$scroller, this.stop, 300);
      const res = this.onPullDownRefresh(); // 触发刷新
      if (res instanceof Promise) {
        res.finally(() => {
          this.finished();
        });
      }
    } else {
      // 回到顶部
      ani(this.$scroller, 0, 600, () => {
        this.isScrolling = false;
        this.isRefreshing = false;
      });
    }
  }

  handlerMove(e) {
    const currentY = e.touches[0].pageY;
    const moveY = currentY - this.startY;
    // 下滑
    if (moveY > 0) {
      if (!this.isRefreshing && !this.isScrolling && this.$wrapper.scrollTop <= 0) {
        // 触发下拉刷新的条件
        e.preventDefault();
        if (this.isFirst) {
          this.isFirst = false;
          this.startY = currentY;
        }
        this.canPullDown = true;
        this.moveY = moveY * 0.4;
        ani(this.$scroller, this.moveY);
        this.onPullDown(this.moveY, this.moveY > this.threshold);
      }
    } else {
      this.canPullDown = false;
      ani(this.$scroller, 0);
    }
  }

  handlerStart(e) {
    this.isFirst = true;
    this.startY = e.touches[0].pageY;
  }

  finished() {
    setTimeout(() => {
      // 结束刷新
      ani(this.$scroller, 0, 600, () => {
        this.isScrolling = false;
        this.isRefreshing = false;
      });
    }, this.stopTime);
  }
}

PullDown.install = function install(Vue) {
  Vue.directive('pulldown', {
    inserted(el, { value }) {
      el.pulldown = new PullDown(el, value);
    },
    unbind(el) {
      el.pulldown.destroy();
    },
  });
};

export default PullDown;
