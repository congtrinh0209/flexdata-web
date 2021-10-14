<template>
  <v-container
    id="congdan-page"
    class="px-0 pt-0"
    fluid
    tag="section"
  >
    CÔNG DÂN

  </v-container>
</template>

<script>
  export default {
    name: 'CongDan',

    data: () => ({
    }),
    created () {
      let vm = this
      vm.$store.commit('SET_INDEXTAB', 1)

    },
    computed: {
    }
  }
</script>

<style lang="css">

  
</style>
