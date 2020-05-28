function throttle(func, time) {
  let timer = null;
  let isFirst = true;
  return (...args) => {
    if (timer) {
      return;
    }
    if (isFirst) {
      func.apply(this, args);
      isFirst = false;
    }
    timer = setTimeout(() => {
      func.apply(this, args);
      timer = null;
    }, time);
  };
}

function setImage(el, src) {
  if (el instanceof Image) {
    el.src = src;
  } else {
    el.style.backgroundImage = `url(${src})`;
  }
}

let instance = null;

class Lazyload {
  static init(...args) {
    if (!instance) {
      instance = new this(...args);
    }
    return instance;
  }

  constructor() {
    this.nodeList = [];
    this.imgList = []; // 已缓存图片
    this.eventList = ['scroll', 'touchmove'];
    this.defaultUrl = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';
    this.handlerLoad = throttle.call(this, this.myHandlerLoad, 400);

    this.initEvent();
  }

  initEvent() {
    this.eventList.forEach((event) => {
      window.addEventListener(event, this.handlerLoad, false);
    });
  }

  myHandlerLoad() {
    this.nodeList.forEach((el) => {
      this.loadImage(el);
    });
  }

  loadImage(el) {
    const {
      top, left, bottom, right,
    } = el.getBoundingClientRect();
    if ((top < window.innerHeight && bottom > 0) && (left < window.innerWidth && right > 0)) { // 屏幕中
      const { tempSrc: src } = el;
      if (this.imgList.includes(src)) { // 如果图片已被缓存
        setImage(el, src); // 设置图片
        this.remove(el); // 移除节点
      } else {
        // 开始加载
        const img = new Image();
        img.onload = () => {
          setImage(el, src); // 设置图片
          this.imgList.push(src); // 添加缓存
          this.remove(el); // 移除节点
        };
        img.onerror = () => {
          this.remove(el);
        };
        img.src = src;
      }
    }
  }

  add(el, src = el.dataset.src) {
    if (!src) {
      return;
    }
    el.tempSrc = src;
    if (!this.nodeList.includes(el)) {
      this.nodeList.push(el);
    }
    // 设置占位图
    setImage(el, this.defaultUrl);
    setTimeout(() => this.loadImage(el));
  }

  remove(el) {
    const index = this.nodeList.findIndex((item) => item === el);
    if (index >= 0) {
      this.nodeList.splice(index, 1);
    }
  }
}

Lazyload.install = function install(Vue) {
  const lz = Lazyload.init();
  // v-src 自定义指令
  Vue.directive('src', {
    inserted: (el, { value }) => {
      lz.add(el, value);
    },
    update: (el, { value, oldValue }) => {
      if (value !== oldValue) {
        lz.add(el, value);
      }
    },
    unbind: (el) => {
      lz.remove(el);
    },
  });
};

export default Lazyload;
