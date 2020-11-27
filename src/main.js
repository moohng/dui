import { createApp } from 'vue'
import router from './router'
import Dui from './components/dui'
import Src from './tools/src'
import App from './app.vue'

if (process.env.NODE_ENV !== 'production') {
  const VConsole = require('vconsole')
  new VConsole()
}

const app = createApp(App)

app.use(Dui)
app.use(Src)
app.use(router)

app.mixin({
  data() {
    const ua = window.navigator.userAgent
    const isWeixin = /MicroMessenger/i.test(ua)

    return {
      hasNavbar: !isWeixin
    }
  },
})

app.mount('#app')
