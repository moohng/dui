import { createApp } from 'vue'
import { AxiosInstance } from 'axios'
import router from './router'
import Dui from './components/dui'
import Src from './tools/src'
import App from './app.vue'
import axios from '@/api/http'

if (process.env.NODE_ENV !== 'production') {
  const VConsole = require('vconsole')
  // eslint-disable-next-line no-new
  new VConsole()
}

const app = createApp(App)

app.use(Dui)
app.use(Src)
app.use(router)

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $get: AxiosInstance;
  }
}

app.config.globalProperties.$get = axios.get

app.mixin({
  data () {
    const ua = window.navigator.userAgent
    const isWeixin = /MicroMessenger/i.test(ua)

    return {
      hasNavbar: !isWeixin,
    }
  },
})

app.mount('#app')
