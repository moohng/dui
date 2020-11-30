import { createApp } from 'vue'

// props 赋值
export function assignProps(vm, props) {
  Object.entries(props).forEach(([key, value]) => {
    if (value !== undefined) {
      vm[key] = value
    }
  })
}

export function mountComponent(Component) {
  // 创建挂载节点
  const root = document.createElement('div')
  document.body.appendChild(root)
  // 创建组件实例
  const app = createApp(Component)
  // 挂载组件
  const instance = app.mount(root)

  return {
    instance,
    unmount: () => {
      app.unmount(root)
      document.body.removeChild(root)
    }
  }
}

// 节流函数
export function throttle(func, time, isFirst) {
  let lastTime = Date.now()
  return (...args) => {
    if (isFirst) {
      lastTime = Date.now()
      func.apply(this, args)
      isFirst = false
      return
    }

    const now = Date.now()
    if (now - lastTime >= time) {
      lastTime = now
      func.apply(this, args)
    }
  }
}

// 查找节点
export function querySelector(selector, defaultSelector) {
  if (typeof selector === 'function') {
    selector = selector()
  }
  if (selector instanceof HTMLElement) {
    return selector
  }
  try {
    const el = document.querySelector(selector)
    if (el === null) {
      throw new Error()
    }
    return el
  } catch (err) {
    if (defaultSelector !== undefined) {
      return defaultSelector
    }
    throw new Error('必须提供有效的下拉刷新DOM节点')
  }
}

// 空函数
export function pop() {}

// ready
export function domReady(func) {
  if (document.readyState === 'complete') {
    setTimeout(() => func(), 0)
  } else {
    const handler = () => {
      document.removeEventListener('DOMContentLoaded', handler, false)
      func()
    }
    document.addEventListener('DOMContentLoaded', handler, false)
  }
}
