<template>
  <v-container
    id="danhmuc-page"
    class="px-0 pt-0"
    fluid
    tag="section"
  >
    DANH MỤC

  </v-container>
</template>

<script>
  export default {
    name: 'DanhMuc',

    data: () => ({
    }),
    created () {
      let vm = this
      vm.$store.commit('SET_INDEXTAB', 0)
    },
    computed: {
    }
  }
</script>

<style lang="css">
  #login-page {
    height: 1000px;
  }
  
</style>
