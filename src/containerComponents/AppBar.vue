<template>
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
</template>

<script>
  export default {
    name: 'AppBar',
    components: {
    },

    props: {
    },

    data: () => ({
    }),
    created () {
      let vm = this
      
    },
    mounted () {
      let vm = this
    },
    computed: {
    },
    watch: {
    },
    methods: {
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
</style>

