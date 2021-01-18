declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare module '@moohng/dan/lib/copy' {
  import copy from '@moohng/dan/lib/copy'
  const c: (text: string) => void = copy
  export default c
}

// declare module '@moohng/dan/lib/copy'

declare module 'ali-oss'

declare module 'swiper/vue'

interface Window {
  WeixinJSBridge: {
    invoke: Function
  }
}
