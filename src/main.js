import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './router'
import store from './store'
import axios from 'axios'
import VueCookies from 'vue-cookies'
import 'toastr/build/toastr.css'

Vue.use(VueCookies)
Vue.config.productionTip = false
const baseURL = process.env.VUE_APP_PATH_API
if (typeof baseURL !== 'undefined') {
  axios.defaults.baseURL = baseURL
}
if (Vue.$cookies.get('Token')) {
  store.commit('SET_ISSIGNED', true)
} else {
  store.commit('SET_ISSIGNED', false)
  localStorage.setItem('user', null)
}
Vue.mixin({
  data: () => ({
  }),
  methods: {
  },
  computed: {
    isSigned () {
      return this.$store.getters.getIsSigned
    },
    userLogin () {
      let userInfo = ''
      try {
        userInfo = JSON.parse(localStorage.getItem('user'))
      } catch (error) {
      }
      return userInfo
    }
  }
})

new Vue({
  vuetify,
  router,
  store,
  render: h => h(App)
}).$mount('#app')
