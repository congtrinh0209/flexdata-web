import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';
import '@/sass/overrides.sass'

Vue.use(Vuetify);

export default new Vuetify({
    theme: {
        themes: {
          light: {
            primary: '#863E3B',
          },
        },
      },
});
