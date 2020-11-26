import { createApp } from 'vue'
import router from './router'
import Dui from './components/dui'
import LazyLoad from './tools/lazyload'
import App from './app.vue'
// import axios from './api/http'

if (process.env.NODE_ENV !== 'production') {
  const VConsole = require('vconsole')
  new VConsole()
}

const app = createApp(App)

app.use(Dui)
app.use(LazyLoad)
app.use(router)

// app.prototype.$http = axios
// app.prototype.$get = axios.get
// app.prototype.$post = axios.post

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
