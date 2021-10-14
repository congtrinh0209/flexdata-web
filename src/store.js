import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import $ from 'jquery'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    indexTab: 0,
  },
  getters: {
    getIndexTab: (state) => state.indexTab
  },
  mutations: {
    SET_INDEXTAB(state, indexTab) {
      state.indexTab = indexTab
    }
  },
  actions: {
    
  }
})
