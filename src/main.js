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
axios.interceptors.response.use((response) => {
  // console.log('response', response)
  return response
}, error => {
  // console.warn('Error status 123', error.response)
  if (error.response.status == 401) {
    store.commit('SET_ISSIGNED', '')
    Vue.$cookies.set('Token', null)
    // return refreshToken().then(rs => {
    //         console.log('get token refreshToken>>', rs.data)
    //         const { token } = rs.data
    //         instance.setToken(token);
    //         const config = response.config
    //         config.headers['x-access-token'] = token
    //         config.baseURL = 'http://localhost:3000/'
    //         return instance(config)
    //     })
    if (error.response.config.url === '/v1/datasharing/tinhthanh/filter') {
      router.push({ path: '/login' })
    }
  }
  if (error.response) {
      return parseError(error.response.data)
  } else {
      return Promise.reject(error)
  }
})

if (Vue.$cookies.get('Token')) {
  store.commit('SET_ISSIGNED', true)
  axios.defaults.headers['Authorization'] = 'Bearer ' + Vue.$cookies.get('Token')
  router.push({ path: '/danh-muc' })
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
