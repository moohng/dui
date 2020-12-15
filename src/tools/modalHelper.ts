const $body = document.body
const $scr = (document.scrollingElement || document.documentElement)
let scrollTop: number

const helpers = {
  afterOpen () {
    scrollTop = $scr.scrollTop // 获取页面滚动距离
    const { style } = $body
    style.position = 'fixed' // 添加样式会回到顶部（fixed布局）
    style.width = '100%'
    style.top = `${-scrollTop}px` // 设置对应位置
  },
  beforeClose () {
    const { style } = $body
    style.position = '' // 去掉样式，又会回到顶部
    style.width = ''
    style.top = ''
    // scrollTop lost after set position:fixed, restore it back.
    $scr.scrollTop = scrollTop // 滚回对应位置
  },
}

export default helpers
