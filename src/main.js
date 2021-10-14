import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './router'
import store from './store'
import axios from 'axios'

Vue.config.productionTip = false
const baseURL = ''
if (typeof baseURL !== 'undefined') {
  axios.defaults.baseURL = baseURL
}


new Vue({
  vuetify,
  router,
  store,
  render: h => h(App)
}).$mount('#app')
