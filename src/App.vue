<template>
  <v-app>
    <AppBar></AppBar>
    <v-main>
      <div class="container">
        <router-view></router-view>
      </div>
    </v-main>
    <Footer></Footer>
  </v-app>
</template>

<script>
import Drawer from './containerComponents/Drawer'
import AppBar from './containerComponents/AppBar'
import Footer from './containerComponents/Footer'
export default {
  name: 'App',

  components: {
    Drawer,
    AppBar,
    Footer
  },

  data: () => ({
    //
  }),
};
</script>
