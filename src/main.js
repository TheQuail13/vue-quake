import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import './quasar'
import axios from 'axios'
import * as GmapVue from 'gmap-vue'

Vue.config.productionTip = process.env.NODE_ENV === 'production'
Vue.prototype.$http = axios

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
