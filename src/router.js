import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes: [
    {
      name: 'Login',
      path: '/login',
      component: () => import('@/views/Login')
    },
    {
      name: 'CongDan',
      path: '/cong-dan',
      component: () => import('@/views/cong-dan/DanhSachCongDan')
    },
  ]
})
