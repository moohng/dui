const bodyCls = 'stop-scroll';
const $body = document.body;
let scrollTop;

export default {
  afterOpen() {
    scrollTop = document.scrollingElement.scrollTop; // 获取页面滚动距离
    $body.classList.add(bodyCls); // 添加样式会回到顶部（fixed布局）
    $body.style.top = `${-scrollTop}px`; // 设置对应位置
  },
  beforeClose() {
    $body.classList.remove(bodyCls); // 去掉样式，又会回到顶部
    $body.style.top = null;
    // scrollTop lost after set position:fixed, restore it back.
    document.scrollingElement.scrollTop = scrollTop; // 滚回对应位置
  },
};
