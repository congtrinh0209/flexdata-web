<template>
  <v-container
    id="doanhnghiep-page"
    class="px-0 pt-0"
    fluid
    tag="section"
  >
    

  </v-container>
</template>

<script>
  export default {
    name: 'DoanhNghiep',

    data: () => ({
    }),
    created () {
      let vm = this
      vm.$store.commit('SET_INDEXTAB', 2)
    },
    computed: {
    }
  }
</script>

<style lang="css">

  
</style>
