import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import $ from 'jquery'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    indexTab: 0,
    apiSso: process.env.VUE_APP_PATH_API_SSO
  },
  getters: {
    getIndexTab: (state) => state.indexTab,
    getIsSigned: (state) => {
      return state.isSigned
    },
  },
  mutations: {
    SET_INDEXTAB(state, indexTab) {
      state.indexTab = indexTab
    },
    SET_ISSIGNED (state, payload) {
      state.isSigned = payload
    },

  },
  actions: {
    collectionCreate ({commit, state}, filter) {
      return new Promise((resolve, reject) => {
        let dataPost = JSON.stringify(filter.data)
        let config = {
          method: 'post',
          url: '/v1/datasharing/' + filter.collectionName,
          headers: { 
            'Accept': 'application/json', 
            'Content-Type': 'application/json'
          },
          data : dataPost
        }
        axios(config).then(function (response) {
          let serializable = response.data
          resolve(serializable)
        }).catch(function (error) {
          reject(error.response)
        })
      })
    },
    collectionUpdate ({commit, state}, filter) {
      return new Promise((resolve, reject) => {
        let dataPost = JSON.stringify(filter.data)
        let config = {
          method: 'post',
          url: '/v1/datasharing/' + filter.collectionName + '/' + filter.id,
          headers: { 
            'Accept': 'application/json', 
            'Content-Type': 'application/json'
          },
          data : dataPost
        }
        axios(config).then(function (response) {
          let serializable = response.data
          resolve(serializable)
        }).catch(function (error) {
          reject(error)
        })
      })
    },
    collectionDelete ({commit, state}, filter) {
      return new Promise((resolve, reject) => {
        let config = {
          method: 'delete',
          url: '/v1/datasharing/' + filter.collectionName + '/' + filter.id,
          headers: { 
            'Accept': 'application/json', 
            'Content-Type': 'application/json'
          },
          data: {}
        }
        axios(config).then(function (response) {
          let serializable = response.data
          resolve(serializable)
        }).catch(function (error) {
          reject(error)
        })
      })
    },
    collectionFilter ({commit, state}, filter) {
      return new Promise((resolve, reject) => {
        let config = {
          method: 'get',
          url: '/v1/datasharing/' + filter.collectionName + '/filter',
          headers: { 
            'Accept': 'application/json', 
            'Content-Type': 'application/json'
          },
          data: {},
          params: filter.data
        }
        axios(config).then(function (response) {
          let serializable = response.data
          resolve(serializable)
        }).catch(function (error) {
          reject(error)
        })
      })
    },
    collectionDetail ({commit, state}, filter) {
      return new Promise((resolve, reject) => {
        let config = {
          method: 'get',
          url: '/v1/datasharing/' + filter.collectionName + '/' + filter.id,
          headers: { 
            'Accept': 'application/json', 
            'Content-Type': 'application/json'
          }
        }
        axios(config).then(function (response) {
          let serializable = response.data
          resolve(serializable)
        }).catch(function (error) {
          reject(error)
        })
      })
    },
    loginKeyCloak ({commit, state}, filter) {
      return new Promise((resolve, reject) => {
        let settings = {
          "url": state.apiSso + '/flex/oauth2/authorization_endpoint?redirect_uri=' + filter.uri,
          "method": "GET",
          "headers": {
            'Content-Type': 'application/json'
          },
        };
        
        $.ajax(settings).done(function (response) {
          resolve(response)
        }).fail(function (response) {
          reject(response)
        })
      })
    },
    getTokenKeyCloak ({commit, state}, filter) {
      return new Promise((resolve, reject) => {
        let settings = {
          "url": state.apiSso + '/auth/realms/flex-data-hg-qa/protocol/openid-connect/token',
          "method": "POST",
          "headers": {
            'Authorization': 'Basic ZmxleDpzc28=',
            'Accept': 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          "data": {
            "client_id": "flex-sso",
            "grant_type": "authorization_code",
            "code": filter.code,
            "redirect_uri": filter.redirect_uri
          }
        };
        
        $.ajax(settings).done(function (response) {
          let serializable = response
          resolve(serializable)
        }).fail(function (response) {
          reject(response)
        })
      })
    },
  }
})
