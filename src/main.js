import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import './quasar'
import axios from 'axios'

Vue.prototype.$http = axios
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
