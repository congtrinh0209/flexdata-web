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
          component: () => import('@/views/cong-dan/DanhSachCongDan'),
          props: true
        },
        {
          path: '/chi-tiet-cong-dan/:id',
          name: 'ChiTietCongDan',
          component: () => import('@/views/cong-dan/ChiTietCongDan'),
          props: true
        },
        {
          path: '/chinh-sua-cong-dan/:id',
          name: 'ChinhSuaCongDan',
          component: () => import('@/views/cong-dan/EditCongDan'),
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
