<template>
  <div class="wrap-login">
    <v-container
      id="login-page"
      class="px-0 pt-0"
      fluid
      tag="section"
    >
      <div class="container-wrap">
        <div class="wrap-title">
          <div class="text-1">HỆ THỐNG XÁC THỰC TÀI KHOẢN</div>
          <div class="text-1">CÔNG DÂN DOANH NGHIỆP</div>
          <div class="text-1 text-1-1">{{titleLogin}}</div>
        </div>

        <div class="wrap-form" v-if="!signed">
          <!-- <div class="text-login">Đăng nhập</div> -->
          <div>
            <v-form ref="form" v-model="valid" lazy-validation class="mt-2">
              <!-- <v-flex xs12>
                <v-text-field
                  class="input-text"
                  dense
                  solo
                  placeholder="Email đăng nhập"
                  v-model="userName"
                  :rules="[v => !!v || 'Email đăng nhập là bắt buộc']"
                  required
                  prepend-inner-icon="mdi-account"
                  @keyup.enter="submitConfirmLogin"
                  hide-details="auto"
                ></v-text-field>
              </v-flex>
              <v-flex xs12 class="my-2">
                <v-text-field
                  class="input-text"
                  dense
                  solo
                  placeholder="Mật khẩu đăng nhập"
                  v-model="password"
                  :type="'password'"
                  :rules="[v => !!v || 'Mật khẩu là bắt buộc']"
                  required
                  prepend-inner-icon="mdi-key"
                  @keyup.enter="submitConfirmLogin"
                  hide-details="auto"
                ></v-text-field>
              </v-flex> -->
              
              <v-flex xs12 class="mt-6 text-xs-center ">
                <!-- <v-btn class="my-0 white--text mr-3" color="#940404"
                  :loading="loading"
                  :disabled="loading"
                  @click="submitConfirmLogin"
                >
                  <v-icon size="20">mdi-login</v-icon>&nbsp;
                  Đăng nhập
                </v-btn> -->
                <v-btn class="my-0 white--text" color="#940404"
                  :loading="loading"
                  :disabled="loading"
                  @click="loginKeyCloak"
                >
                  <v-icon size="20">mdi-account-key-outline</v-icon>&nbsp;
                  Đăng nhập hệ thống
                </v-btn>
              </v-flex>
            </v-form>
          </div>
        </div>
        <div class="wrap-form" v-if="signed">
          <div class="text-login">TÀI KHOẢN ĐÃ ĐĂNG NHẬP HỆ THỐNG</div>
          <v-flex xs12 class="mt-6 text-xs-center ">
            <v-btn class="my-0 white--text mr-3" color="#940404"
              :loading="loading"
              :disabled="loading"
              @click="submitLogout"
            >
              <div class="v-btn__content">
                <v-icon size="18">mdi-logout-variant</v-icon>&nbsp;
                <span>Đăng xuất</span>
              </div>
            </v-btn>
            <v-btn class="my-0 white--text" color="#940404"
              :loading="loading"
              :disabled="loading"
              @click="submitConfirmLogin"
            >
                <v-icon size="20">mdi-home-circle-outline</v-icon>&nbsp;
                <span>Truy cập hệ thống</span>
            </v-btn>
          </v-flex>
        </div>
      </div> 
      
    </v-container>
    <img class="img-login-logo" :src="`${publicPath}/images/image-login.png`">
    <div class="text-center">
      <v-overlay :value="overlay">
        <v-progress-circular
          indeterminate
          size="64"
        ></v-progress-circular>
      </v-overlay>
    </div>
  </div>
  
</template>

<script>
  import Vue from 'vue'
  import axios from 'axios'
  import toastr from 'toastr'
  toastr.options = {
    'closeButton': true,
    'timeOut': '5000',
    "positionClass": "toast-top-center"
  }
  export default {
    name: 'Login',

    data: () => ({
      titleLogin: process.env.VUE_APP_TITLE_LOGIN,
      publicPath: process.env.VUE_APP_PULIC_PATH,
      apiSso: process.env.VUE_APP_PATH_API_SSO,
      overlay: false,
      loading: false,
      valid: true,
      userName: '',
      password: '',
      client_secret: '',
      code: '',
      signed: false
    }),
    created () {
      let vm = this
      let searchParams = ''
      let params = window.location.search.substring(1)
      if (params) {
        let isLogin = Vue.$cookies.get('Token')
        searchParams = JSON.parse('{"' + decodeURI(params).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g,'":"') + '"}')
        if (!isLogin && searchParams && searchParams['code']) {
          vm.overlay = true
          vm.code = searchParams['code']
          vm.getToken()
        }
      }
      if (Vue.$cookies.get('Token')) {
        vm.signed = true
      } else {
        vm.signed = false
      }
    },
    computed: {
    },
    methods: {
      submitConfirmLogin () {
        let vm = this
        vm.$router.push({ path: '/danh-muc' })
      },
      loginKeyCloak () {
        let vm = this
        if (vm.loading) {
          return
        }
        vm.loading = true
        let filter = {
          uri: process.env.VUE_APP_PATH_REDIRECT_SSO
        }
        vm.$store.dispatch('loginKeyCloak', filter).then(function (result) {
          vm.loading = false
          if (result) {
            window.location.href = result.endpoint
          }
        }).catch(function (result) {
          vm.loading = false
        })
      },
      getToken () {
        let vm = this
        vm.loading = false
        let filter = {
          code: vm.code,
          redirect_uri: process.env.VUE_APP_PATH_REDIRECT_SSO
        }
        vm.$store.dispatch('getTokenKeyCloak', filter).then(function (result) {
          vm.loading = false
          vm.overlay = false
          // console.log('tokenObj', result)
          if (result.access_token) {
            try {
              let dataUser = JSON.parse(atob(result.access_token.split('.')[1]))
              if (dataUser.scope === 'admin_site') {
                vm.$cookies.set('Token', result.access_token, result.expires_in)
                vm.$cookies.set('RefreshToken', result.refresh_token, result.refresh_expires_in)
                axios.defaults.headers['Authorization'] = 'Bearer ' + result.access_token
                let dataUser = {
                  role_name: '',
                  user_id: ''
                }
                localStorage.setItem('user', JSON.stringify(dataUser))
                vm.$store.commit('SET_ISSIGNED', true)
                window.location.href = window.location.origin + window.location.pathname + "#/danh-muc"
              } else {
                vm.loading = false
                vm.overlay = false
                toastr.error('TÀI KHOẢN KHÔNG CÓ TRÊN HỆ THỐNG')
              }
            } catch (error) {
              vm.loading = false
              vm.overlay = false
              toastr.error('TÀI KHOẢN KHÔNG CÓ TRÊN HỆ THỐNG')
            }
          }
          
        }).catch(function (result) {
          vm.loading = false
          vm.overlay = false
          toastr.error('Đăng nhập không thành công')
        })
      },
      submitLogout () {
        let vm = this
        vm.signed = false
        vm.$store.commit('SET_ISSIGNED', false)
        localStorage.setItem('user', null)
        vm.$cookies.set('Token', '')
        vm.$cookies.set('RefreshToken', '')
      },
      getPassword () {
        let vm = this
      }
    }
  }
</script>

<style lang="scss">
  $image-login: $public-path + '/images/bg-login.png';
  #app {
    background: transparent !important
  }
  .wrap-login {
    background: url($image-login) no-repeat;
    background-size: cover;
    height: 100vh;
    width: 100%;
    position: relative;
  }
  #login-page {
    position: relative;
  }
  .container-wrap {
    position: absolute;
    width: 651px;
    height: 155px;
    left: 66px;
    top: 87px;
  }
  .img-login-logo {
    width: 630px;
    height: 410px; 
    position: absolute;
    left: 50%;
    right: 3.89%;
    top: 21.88%;
    bottom: 13.64%;
  }
  .text-1 {
    font-family: Roboto Slab;
    font-style: normal;
    font-weight: 900;
    font-size: 38px;
    line-height: 50px;
    color: #940404;
  }
  .text-1-1 {
    font-family: Roboto Slab;
    font-style: normal;
    font-weight: 900;
    font-size: 42px;
    line-height: 55px;
    color: #E9372B;
    text-transform: uppercase;
  }
  .wrap-form {
    width: 465px;
    margin-top: 80px
  }
  .text-login {
    font-family: Roboto;
    font-style: normal;
    font-weight: 900;
    font-size: 18px;
    line-height: 21px;
    color: #940404;
    text-shadow: 0px 3px 3px rgba(0, 0, 0, 0.17);
    margin-bottom: 15px;
    text-transform: uppercase;
  }
  .input-text .v-icon{
    color: #B11312 !important;
    font-size: 20px !important;
  }
  .input-text  .v-input__slot {
    box-shadow: 0px 3px 1px -2px rgb(0 0 0 / 8%), 0px 2px 2px 0px rgb(0 0 0 / 0%), 0px 1px 5px 0px rgb(0 0 0 / 7%) !important;
  }
</style>
