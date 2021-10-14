<template>
  <div>
    <div id="header-app">
      <header id="banner">
        <div class="container layout wrap" style=""> 
          <a href="" class="py-0 px-0"> 
            <img class="logo-banner" src="/images/logo-banner.png">
            <span class="title-banner">HỆ THỐNG XÁC THỰC TÀI KHOẢN CÔNG DÂN DOANH NGHIỆP TỈNH HẬU GIANG</span>
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
    },
  }
</script>
<style lang="css">
  #header-app {
    height: 54px;
    width: 100%;
    background: url(/images/bg-banner.png) no-repeat;
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
  #header-nav #navigation li.selected a {
      /* font-weight: bold; */
  }
  #header-nav #navigation li:hover a, #header-nav #navigation li.selected a {
      color: #863E3B;
      font-weight: 700;
  }
  #header-nav #navigation li a {
      padding: 8px 15px;
      display: block;
      position: relative;
      text-transform: uppercase;
      text-decoration: none;
      color: #863E3B;
      font-size: 16px;
      
  }
  #header-nav #navigation li:hover a:before, #header-nav #navigation li.selected a:before {
      content: "";
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 4px;
      background-color: #863E3B;
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

