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

        <div class="wrap-form">
          <div class="text-login">Đăng nhập</div>
          <div>
            <v-form ref="form" v-model="valid" lazy-validation class="mt-2">
              <v-flex xs12>
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
              </v-flex>
              
              <v-flex xs12 class="text-right" style="margin-top: 15px; margin-bottom: 15px">
                <div class="d-inline-block" style="cursor: pointer;">
                  <p class="mb-0" @click="getPassword" style="color: #940404">
                  Quên mật khẩu?
                  </p>
                </div>
              </v-flex>
              
              <v-flex xs12 class="mt-0 text-xs-center">
                <v-btn class="my-0 white--text" color="#940404"
                  :loading="loading"
                  :disabled="loading"
                  @click="submitConfirmLogin"
                >
                  Đăng nhập
                </v-btn>
              </v-flex>
            </v-form>
          </div>
        </div>
      </div> 
      
    </v-container>
    <img class="img-login-logo" src="/images/image-login.png">
  </div>
  
</template>

<script>
  export default {
    name: 'Login',

    data: () => ({
      titleLogin: process.env.VUE_APP_TITLE_LOGIN,
      loading: false,
      valid: true,
      userName: '',
      password: ''
    }),
    created () {
      let vm = this
    },
    computed: {
    },
    methods: {
      submitConfirmLogin () {
        let vm = this
        vm.$router.push({ path: '/danh-muc' })
      },
      getPassword () {
        let vm = this
      }
    }
  }
</script>

<style lang="scss">
  #app {
    background: transparent !important
  }
  .wrap-login {
    background: url(/images/bg-login.png) no-repeat;
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
    width: 420px;
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
