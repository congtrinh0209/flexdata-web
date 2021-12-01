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
    // store.dispatch('getRefreshTokenKeyCloak').then(rs => {
    //   Vue.$cookies.set('Token', rs.access_token, rs.expires_in)
    //   Vue.$cookies.set('RefreshToken', rs.refresh_token, rs.refresh_expires_in)
    //   axios.defaults.headers['Authorization'] = 'Bearer ' + rs.access_token
    //   toastr.clear()
    //   toastr.error('Thực hiện thất bại. Vui lòng thử lại.')
    // }).catch(function () {
    //   router.push({ path: '/login' })
    // })

    router.push({ path: '/login' })
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
  // axios.defaults.headers['Authorization'] = 'Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJkV0FtSTZHbmVHN25zcWxOeV9oejlzOWc2Y2tBZHJJSXVMMlhMcWJScmNFIn0.eyJleHAiOjE2MzgxNzc4MzQsImlhdCI6MTYzODE3NjAzNCwiYXV0aF90aW1lIjoxNjM4MTY3NjY2LCJqdGkiOiIwNTM4MGMzOC1iNjEyLTRlMjYtOGNmMS1kZDY0NGE4ZGVmYjciLCJpc3MiOiJodHRwczovL2tleWNsb2FrLmZkcy52bi9hdXRoL3JlYWxtcy9mbGV4LWRhdGEtaGctcWEiLCJhdWQiOiJhY2NvdW50Iiwic3ViIjoiZjM1NTExOTYtMmNlNS00M2RiLWJiMTctYjFiMWRiMWJlNTg4IiwidHlwIjoiQmVhcmVyIiwiYXpwIjoiZmxleC1zc28iLCJzZXNzaW9uX3N0YXRlIjoiZTcxYTEyMjgtMTBiNC00ZWI0LThhOWMtM2JlNmVhYzZmOGU1IiwiYWNyIjoiMCIsInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJkZWZhdWx0LXJvbGVzLWZsZXggZGF0YSBoZyBxYSIsIkFkbWluaXN0cmF0b3IiXX0sInJlc291cmNlX2FjY2VzcyI6eyJmbGV4LXNzbyI6eyJyb2xlcyI6WyJjbGllbnRfdXNlciIsImNsaWVudF9hZG1pbiJdfSwiYWNjb3VudCI6eyJyb2xlcyI6WyJtYW5hZ2UtYWNjb3VudCIsIm1hbmFnZS1hY2NvdW50LWxpbmtzIiwidmlldy1wcm9maWxlIl19fSwic2NvcGUiOiJwcm9maWxlIGVtYWlsIiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJhZG1pbiIsImVtYWlsIjoiYWRtaW5AZmRzLnZuIn0.DgKMY_plV8gjruMBMGfE_xQg7JlZe95joskJrHUuc9Hqg1oU-GVgexfpWB_esaZNv-NkZUw-qYrl5PKqv_eCvhS_EzyOnRBjq_F20Q8LgNIed3DMFWY2Ucx0pIqq95KUa6_q_XZHvBxUXuQI3dU62QMIuHgjdbZsMkxVEdTTI69iZ_QBcMSuLyJj0yg4AnP6qG1Esm8hsHpgC1GmUuFueAGi_N4JiZIn8hreeZFqMW8nRJ2Mp2jhU200LNd7Z9n-cDknaot_89VykewwV4K4JXUe9g27-ivHp8I-P27HYMCecCtCnF8LDDdnvIkuTvhacWqOGCVYnSQ12DFaSBYfpQ'
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
