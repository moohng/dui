function pop() {}

function querySelector(selector, defaultSelector) {
  if (selector instanceof HTMLElement) {
    return selector;
  }
  try {
    const el = document.querySelector(selector);
    if (el === null) {
      throw new Error();
    }
    return el;
  } catch (err) {
    if (defaultSelector) {
      return defaultSelector;
    }
    throw new Error('必须提供有效的下拉刷新DOM节点');
  }
}

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

    if (document.readyState === 'complete') {
      setTimeout(() => this.init(), 0);
    } else {
      const handler = () => {
        document.removeEventListener('DOMContentLoaded', handler, false);
        this.init();
      };
      document.addEventListener('DOMContentLoaded', handler, false);
    }
  }

  init() {
    this.$el = querySelector(this.el);
    this.$wrapper = querySelector(this.wrapper, document.scrollingElement);
    this.$scroller = this.$el.offsetParent;
    this.stop = this.$el.offsetHeight;
    this.threshold = this.threshold || this.stop * 1.12;

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
  let pulldown = null;
  Vue.directive('pulldown', {
    inserted: (el, { value }) => {
      pulldown = new PullDown(el, value);
    },
    unbind: () => {
      pulldown.destroy();
    },
  });
};

export default PullDown;
