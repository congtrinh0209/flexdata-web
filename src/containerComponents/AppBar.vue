<template>
  <div>
    <div id="header-app" >
      <header id="banner">
        <div class="container layout wrap" style=""> 
          <a href="" class="py-0 px-0"> 
            <img class="logo-banner" :src="`${publicPath}/images/logo-banner.png`">
            <span class="title-banner">{{title}}</span>
          </a>
        </div>
      </header>
    </div>
    <div id="header-nav">
      <nav class="sort-pages modify-pages" id="navigation"> 
        <ul aria-label="Site Pages" role="menubar" class="container">
          <li v-for="(item, i) in items" :key="i" :class="indexTab == i ? 'selected' : ''" :id="'layout_'+i" role="presentation">
            <a @click="redirectTo(item, i)" :class="item['class']" :id="item['id']" :aria-labelledby="'layout_'+i" aria-haspopup="true"  href="javascript:;" role="menuitem">
              <span> {{item.title}}</span>
            </a>
          </li>
        </ul>
      </nav>
      <v-btn small class="btn-login my-0 white--text mr-3" color="#940404"
        @click="submitLogout"
        style="position: absolute;top:7px;right:0px"
      >
        <div class="v-btn__content">
          <v-icon size="18">mdi-logout-variant</v-icon>&nbsp;
          <span>Đăng xuất</span>
        </div>
      </v-btn>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'AppBar',
    components: {
    },

    props: {
    },

    data: () => ({
      appName: process.env.NODE_ENV,
      title: process.env.VUE_APP_BASE_TITLE,
      publicPath: process.env.VUE_APP_PULIC_PATH,
      items: [
        {
          icon: '',
          title: 'Danh mục',
          class: 'danhmuc-tab',
          id: 'danhmuc-tab-id',
          to: '/danh-muc'
        },
        {
          icon: '',
          title: 'Công dân',
          class: 'congdan-tab',
          id: 'congdan-tab-id',
          to: '/cong-dan'
        },
        {
          icon: '',
          title: 'Tổ chức doanh nghiệp',
          class: 'doanhnghiep-tab',
          id: 'doanhnghiep-tab-id',
          to: '/doanh-nghiep'
        },
      ]
    }),
    created () {
      let vm = this
    },
    mounted () {
      let vm = this
    },
    computed: {
      indexTab () {
        return this.$store.getters.getIndexTab
      }
    },
    watch: {
    },
    methods: {
      redirectTo (item, index) {
        this.$store.commit('SET_INDEXTAB', index)
        this.$router.push({ path: item.to })
      },
      submitLogout () {
        let vm = this
        vm.$store.commit('SET_ISSIGNED', false)
        localStorage.setItem('user', null)
        vm.$cookies.set('Token', '')
        vm.$cookies.set('RefreshToken', '')
        vm.$store.dispatch('logoutKeyCloak').then(function (result) {
          let redirect_uri = process.env.VUE_APP_PATH_REDIRECT_SSO
          window.location.href = result.endpoint + '?redirect_uri='+ redirect_uri
        }).catch(function () {
          window.location.href = window.location.origin + window.location.pathname + "#/login"
        })
        
      },
    },
  }
</script>
<style lang="scss">
  $image-banner: $public-path + '/images/bg-banner-default.png';
  @if $app-name == 'haugiang' {
    $image-banner: $public-path + '/images/bg-banner.png'
  }
  #header-app {
    height: 54px;
    width: 100%;
    background: url($image-banner) no-repeat;
    background-size: cover;
    padding: 0;
  }
  #banner .container {
    height: 54px;
    padding: 0
  }
  #banner .container a {
    text-decoration: none;
    display: flex;
    text-align: center;
    flex-wrap: wrap;
    align-content: center;
  }
  .logo-banner {
    width: 28px;
    height: 28px;
    margin-right: 13px;
  }
  .title-banner {
    font-family: Roboto Slab;
    font-style: normal;
    font-weight: bold;
    font-size: 18px;
    line-height: 28px;
    color: #FFFFFF;
    text-transform: uppercase;
  }
  #header-nav {
    position: relative;
  }
  #header-nav #navigation {
    height: 41px;
    background: #F9F4F1;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  }
  #header-nav #navigation ul {
      display: flex;
      list-style: none;
      margin-bottom: 0;
      overflow: hidden;
      margin: auto;
      padding: 0;
      justify-content: left;
      max-width: 1300px;
  }
  #header-nav #navigation ul {
      display: flex;
      list-style: none;
      margin-bottom: 0;
      overflow: hidden;
      margin: auto;
      padding: 0;
  }
  #header-nav #navigation li:hover a, #header-nav #navigation li.selected a {
      color: $base-color;
      font-weight: 700;
  }
  #header-nav #navigation li a {
      padding: 8px 15px;
      display: block;
      position: relative;
      text-transform: uppercase;
      text-decoration: none;
      color: $base-color;
      font-size: 16px;
      
  }
  #header-nav #navigation li:hover a:before, #header-nav #navigation li.selected a:before {
      content: "";
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 4px;
      background-color: $base-color;
  }
  #header-nav #banner .btns {
    position: absolute;
    right: 15px;
    top: 105px;
    z-index: 2;
  }

  #header-nav #banner .btns a {
    display: inline-block;
    /* background-color: white; */
    background-color: transparent;
    padding: 6px 50px 6px 20px;
    /* color: #0072bc; */
    /* border: 2px solid #0072bc; */
    text-decoration: none;
    color: white;
    border: 2px solid white;
    border-radius: 50px;
    background-repeat: no-repeat;
    background-position: right -2px top -2px;
    background-size: auto 35px;
  }
</style>

