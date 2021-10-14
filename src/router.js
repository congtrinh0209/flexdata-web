import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      component: () => import('@/views/Home'),
      children: [
        {
          path: '/danh-muc',
          name: 'DanhMuc',
          component: () => import('@/views/DanhMuc'),
          props: true
        },
        {
          path: '/cong-dan',
          name: 'CongDan',
          component: () => import('@/views/CongDan'),
          props: true
        },
        {
          path: '/doanh-nghiep',
          name: 'DoanhNghiep',
          component: () => import('@/views/DoanhNghiep'),
          props: true
        },
      ],
    },
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
