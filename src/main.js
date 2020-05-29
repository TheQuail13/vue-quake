import Vue from 'vue'
import App from './App.vue'
import store from './store'
import './registerServiceWorker'
import router from './router'
import './quasar'
import axios from 'axios'
import * as GmapVue from 'gmap-vue'

Vue.prototype.$http = axios
Vue.config.productionTip = false

Vue.use(GmapVue, {
  load: {
    key: process.env.VUE_APP_GOOGLE_API_KEY,
    installComponents: true
  }
})

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
