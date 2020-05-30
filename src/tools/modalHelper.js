const $body = document.body;
let scrollTop;

export default {
  afterOpen() {
    scrollTop = document.scrollingElement.scrollTop; // 获取页面滚动距离
    const { style } = $body;
    style.position = 'fixed'; // 添加样式会回到顶部（fixed布局）
    style.width = '100%';
    style.top = `${-scrollTop}px`; // 设置对应位置
  },
  beforeClose() {
    const { style } = $body;
    style.position = null; // 去掉样式，又会回到顶部
    style.width = null;
    style.top = null;
    // scrollTop lost after set position:fixed, restore it back.
    document.scrollingElement.scrollTop = scrollTop; // 滚回对应位置
  },
};
