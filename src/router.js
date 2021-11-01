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
          path: '/tai-khoan/:type',
          name: 'TaiKhoan',
          component: () => import('@/views/cong-dan/DanhSachCongDan'),
          props: true
        },
        {
          path: '/thong-tin-tai-khoan/:id',
          name: 'ChiTietCongDan',
          component: () => import('@/views/cong-dan/ChiTietCongDan'),
          props: true
        },
        {
          path: '/cap-nhat-tai-khoan/:id',
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
  ]
})
