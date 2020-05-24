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
      clearTimeout(timer);
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
    if ((top < window.innerHeight && bottom > 0) || (left < window.innerWidth && right > 0)) { // 屏幕中
      const { src } = el.dataset;
      if (this.imgList.includes(src)) {
        setImage(el, src);
        return;
      }
      // 开始加载
      const img = new Image();
      img.onload = () => {
        this.imgList.push(src);
        setImage(el, src);
      };
      img.src = src;
    }
  }

  add(el, src) {
    el.dataset.src = el.dataset.src || src;
    if (!this.nodeList.includes(el)) {
      this.nodeList.push(el);
    }
    // 占位图
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

export default Lazyload;
