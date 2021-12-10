import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './router'
import store from './store'
import axios from 'axios'
import VueCookies from 'vue-cookies'
import toastr from 'toastr'
import 'toastr/build/toastr.css'
toastr.options = {
  'closeButton': true,
  'timeOut': '5000',
  "positionClass": "toast-top-center"
}

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
    Vue.$cookies.set('Token', '')
    if (Vue.$cookies.get('RefreshToken')) {
      let filter = {
        code: Vue.$cookies.get('RefreshToken'),
        redirect_uri: process.env.VUE_APP_PATH_REDIRECT_SSO
      }
      store.dispatch('getRefreshTokenKeyCloak', filter).then(rs => {
        Vue.$cookies.set('Token', rs.access_token, rs.expires_in)
        Vue.$cookies.set('RefreshToken', rs.refresh_token, rs.refresh_expires_in)
        axios.defaults.headers['Authorization'] = 'Bearer ' + rs.access_token
        toastr.remove()
        toastr.error('Thao tác thất bại. Vui lòng thử lại.')
      }).catch(function () {
        router.push({ path: '/login' })
      })
    } else {
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
} else {
  store.commit('SET_ISSIGNED', false)
  localStorage.setItem('user', null)
  // test local
  // axios.defaults.headers['Authorization'] = 'Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJkV0FtSTZHbmVHN25zcWxOeV9oejlzOWc2Y2tBZHJJSXVMMlhMcWJScmNFIn0.eyJleHAiOjE2MzkxMDc5NDMsImlhdCI6MTYzOTEwNjE0MywiYXV0aF90aW1lIjoxNjM5MTAxMTQ5LCJqdGkiOiI0MWEwOTJmZS0wMmM0LTRhYzItYjUxYS03MjY4ZjJlZDJkODEiLCJpc3MiOiJodHRwczovL2tleWNsb2FrLmZkcy52bi9hdXRoL3JlYWxtcy9mbGV4LWRhdGEtaGctcWEiLCJhdWQiOlsicmVhbG0tbWFuYWdlbWVudCIsImFjY291bnQiXSwic3ViIjoiZjM1NTExOTYtMmNlNS00M2RiLWJiMTctYjFiMWRiMWJlNTg4IiwidHlwIjoiQmVhcmVyIiwiYXpwIjoiZmxleC1zc28iLCJzZXNzaW9uX3N0YXRlIjoiYTYyYjNhZTctZDg3Yy00YTYzLThkNzMtNTlhZDE0N2IzNTQ3IiwiYWNyIjoiMCIsInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJkZWZhdWx0LXJvbGVzLWZsZXggZGF0YSBoZyBxYSIsIkFkbWluaXN0cmF0b3IiXX0sInJlc291cmNlX2FjY2VzcyI6eyJyZWFsbS1tYW5hZ2VtZW50Ijp7InJvbGVzIjpbIm1hbmFnZS11c2VycyIsInZpZXctdXNlcnMiLCJxdWVyeS1ncm91cHMiLCJxdWVyeS11c2VycyJdfSwiZmxleC1zc28iOnsicm9sZXMiOlsiY2xpZW50X3VzZXIiLCJjbGllbnRfYWRtaW4iXX0sImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJ2aWV3LWFwcGxpY2F0aW9ucyIsInZpZXctY29uc2VudCIsIm1hbmFnZS1hY2NvdW50LWxpbmtzIiwibWFuYWdlLWNvbnNlbnQiLCJkZWxldGUtYWNjb3VudCIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoicHJvZmlsZSBlbWFpbCIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwicHJlZmVycmVkX3VzZXJuYW1lIjoiYWRtaW4iLCJlbWFpbCI6ImFkbWluQGZkcy52biJ9.S0q-pvhPX_mpjCFn8P65dWxxHv5jngYVJTmDAlrADLpgHR-aVsH4u0lTRL1xaKlm-miZDmpdV4DVvpndavhQAZVlx-nvPLlr106H0zcm95Kw1-YGPDr2owJW6nol-L4h_2H8HKetyNjSPpPlsBGtMJFKLLj8AAl5TqSCA3W3C7ke3VCixJ3d7q8PKG_sYCi2vQW-G0Gyv1LmeSOHWlwZXkOwUuxeU3-ccqrduM-3CLVe7uxvE_A4geX8GdFd8IZrUzjbuJ2Rnx2dWoYmWL8DBEeH85dfD5ljBM3fvCMHHlHnyn9oEr2csih90IYfE2W0OMhkBimgAM8eVqM73JTdrw'
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
