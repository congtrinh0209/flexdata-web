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
          name: 'TaiKhoan',
          component: () => import('@/views/DanhSachCongDan'),
          props: true
        },
        {
          path: '/doanh-nghiep',
          name: 'DoanhNghiep',
          component: () => import('@/views/DanhSachDoanhNghiep'),
          props: true
        },
        {
          path: '/thong-tin-ca-nhan/:id',
          name: 'ChiTietCongDan',
          component: () => import('@/views/ChiTietCongDan'),
          props: true
        },
        {
          path: '/thong-tin-doanh-nghiep/:id',
          name: 'ChiTietCongDan',
          component: () => import('@/views/ChiTietDoanhNghiep'),
          props: true
        },
        {
          path: '/cong-dan/:id',
          name: 'ChinhSuaCongDan',
          component: () => import('@/views/EditCongDan'),
          props: true
        },
        {
          path: '/doanh-nghiep/:id',
          name: 'ChinhSuaDoanhNghiep',
          component: () => import('@/views/EditDoanhNghiep'),
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
