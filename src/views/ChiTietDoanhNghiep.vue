<template>
    <div>
        <v-row>
            <v-col cols="12" md="8">
                <div class="d-flex justify-space-between mb-4">
                    <div class="title-page">THÔNG TIN TỔ CHỨC, DOANH NGHIỆP</div>
                    <div>
                        <v-btn
                            class="mx-0"
                            small
                            color="primary"
                            @click="editCongDan(thongTinCongDan['primKey'])"
                        >
                            <v-icon size="18">mdi-pencil-outline</v-icon>&nbsp;
                            <span>Cập nhật thông tin</span>
                        </v-btn>
                    </div>
                </div>
                <div>
                    <v-simple-table :dense="true" class="cong-dan-info"  style="border-bottom: thin solid rgba(0, 0, 0, 0.12);">
                        <template v-slot:default>
                            <tbody>
                                <tr v-for="(item, index) in thongTin" :key="index" :class="{'td-highlight': index%2 === 0}">
                                    <td class="py-2 px-6" style="width: 200px"><strong>{{item.lable}}</strong></td>
                                    <td v-if="item.value !== 'action'" class="py-2">
                                      <span v-if="item.type && item.type === 'date'">{{dateLocale(thongTinCongDan[item.value])}}</span>
                                      <span v-else-if="item.type === 'danhmuc'">{{thongTinCongDan[item.value] ? thongTinCongDan[item.value]['tenMuc'] : ''}}</span>
                                      <span v-else-if="item.type === 'address'">
                                        <span v-if="thongTinCongDan[item.value]">
                                          {{thongTinCongDan[item.value]['soNhaChiTiet']}}, {{thongTinCongDan[item.value]['phuongXa']['tenMuc']}} - 
                                          {{thongTinCongDan[item.value]['quanHuyen']['tenMuc']}} - {{thongTinCongDan[item.value]['tinhThanh']['tenMuc']}}
                                        </span>
                                        <span v-else></span>
                                      </span>
                                      <span v-else-if="item.value === 'nguoiDaiDienHoTen'">{{thongTinCongDan['nguoiDaiDien'] ? thongTinCongDan['nguoiDaiDien']['hoVaTen'] : ''}}</span>
                                      <span v-else-if="item.value === 'nguoiDaiDienMaSoCaNhan'">{{thongTinCongDan['nguoiDaiDien'] ? thongTinCongDan['nguoiDaiDien']['maSoCaNhan'] : ''}}</span>
                                      <span v-else-if="item.value === 'sdt'">{{thongTinCongDan['danhBaLienLac'] ? thongTinCongDan['danhBaLienLac']['soDienThoai'] : ''}}</span>
                                      <span v-else-if="item.value === 'email'">{{thongTinCongDan['danhBaLienLac'] ? thongTinCongDan['danhBaLienLac']['thuDienTu'] : ''}}</span>
                                      <span v-else>{{ thongTinCongDan[item.value]}}</span>
                                    </td>
                                    <td v-else class="py-2">    
                                      <v-btn                            
                                          dark
                                          text
                                          color="primary"
                                          >
                                          <v-icon dark>
                                              mdi-plus
                                          </v-icon>
                                      </v-btn>
                                    </td>
                                </tr>
                            </tbody>
                        </template>
                    </v-simple-table>
                </div>
                <div class="title-page mt-3">GIẤY TỜ, TÀI LIỆU</div>
                <div class="px-0 mt-4">
                    <v-data-table
                        flat
                        :headers="headers"
                        :items="items"
                        :items-per-page="itemsPerPage"
                        hide-default-footer
                        class="elevation-1"
                        no-data-text="Không có"
                        :loading="loadingData"
                        loading-text="Đang tải... "
                    >
                        <template v-slot:item.index="{ item, index }">
                            <div>{{ (page+1) * itemsPerPage - itemsPerPage + index + 1 }}</div>
                        </template>
                        <template v-slot:item.action="{ item }">
                            <div>
                                <v-btn
                                    class="mx-2"
                                    small
                                    text
                                    color="primary"
                                >
                                    <v-icon>mdi-pencil-outline</v-icon>
                                </v-btn>
                            </div>
                        </template>
                    </v-data-table>
                    <pagination v-if="pageCount" :pageInput="page" :pageCount="pageCount"></pagination>
                </div>
            </v-col>
            <v-col cols="12" md="4" class="mt-2">
                <v-card class="pt-4">
                    <div class="d-flex align-center flex-column">
                        <img class="mb-4" style="width: 226px; height: 226px;" :src="`${publicPath}/images/avt.png`">
                        <h4 class="title-page">{{thongTinCongDan['tenGoi']}}</h4>
                        <v-layout class="mt-4" wrap style="width: 350px;">
                            <v-flex xs5>Mã tổ chức, doanh nghiệp:</v-flex>
                            <v-flex xs7 class="mb-2">
                                <span class="font-weight-bold">{{thongTinCongDan['maSoDoanhNghiep']}}</span>
                            </v-flex>
                            <v-flex xs5>Trạng thái:</v-flex>
                            <v-flex xs7>
                                <span class="font-weight-bold">Đang hoạt động</span>
                            </v-flex>
                        </v-layout>
                        <div class="d-flex justify-space-between w-full pa-4 ">
                            <v-btn color="primary" small class="mt-3 mx-3 text-white">
                                Đổi mật khẩu
                            </v-btn>
                            <v-btn color="primary" small class="mt-3 mx-3 text-white">
                                Khóa tài khoản
                            </v-btn>
                            <v-btn color="primary" small class="mt-3 mx-3 text-white">
                                In phiếu
                            </v-btn>
                        </div>
                    </div>
                </v-card>
            </v-col>
        </v-row>
    </div>
</template>

<script>
import Pagination from './Pagination.vue'
export default {
    props: ["id"],
    components: {
      Pagination
    },
    data() {
        return {
            publicPath: process.env.VUE_APP_PULIC_PATH,
            selected: [],
            loadingData: false,
            headers: [
                {
                    sortable: false,
                    text: 'STT',
                    align: 'center',
                    value: 'index'
                },
                {
                    sortable: false,
                    text: 'Loại giấy tờ',
                    align: 'left',
                    value: 'cmnd'
                },
                {
                    sortable: false,
                    text: 'Số giấy tờ',
                    align: 'left',
                    value: 'fullname'
                },
                {
                    sortable: false,
                    text: 'Ngày cấp',
                    align: 'left',
                    value: 'contact'
                },
                {
                    sortable: false,
                    text: 'Nơi cấp',
                    align: 'left',
                    value: 'status'
                },
                {
                    sortable: false,
                    text: 'Thao tác',
                    align: 'center',
                    value: 'action'
                },
            ],
            items: [
                {
                    cmnd: 'CMND',
                    fullname: '029922398',
                    contact: '11/12/2020',
                    status: 'Hà Nội',
                },
                {
                    cmnd: 'CMND',
                    fullname: '029922398',
                    contact: '11/12/2020',
                    status: 'Hà Nội',
                }
            ],
            page: 0,
            itemsPerPage: 10,
            total: 2,
            chuaCapTaiKhoan: false,
            daCapTaiKhoan: false,
            pageCount: 10,
            thongTin:  [
                {
                    lable: 'Tên tổ chức, doanh nghiệp',
                    value: 'tenGoi'
                },
                {
                    lable: 'Mã số tổ chức, doanh nghiệp',
                    value: 'maSoDoanhNghiep'
                },
                {
                    lable: 'Tên tiếng anh',
                    value: 'tenTiengAnh'
                },
                {
                    lable: 'Tên viết tắt',
                    value: 'tenVietTat'
                },
                {
                    lable: 'Họ tên người đại diện',
                    value: 'nguoiDaiDienHoTen'
                },
                {
                    lable: 'Số CMND/ CCCD người đại diện',
                    value: 'nguoiDaiDienMaSoCaNhan'
                },
                {
                    lable: 'Số điện thoại',
                    value: 'sdt'
                },
                {
                    lable: 'Email',
                    value: 'email'
                },
                {
                    lable: 'Địa chỉ hoạt động',
                    value: 'diaChiHoatDong',
                    type: 'address'
                }
            
            ],
            thongTinCongDan: ''
        }
    },
    created () {
      let vm = this
      vm.$store.commit('SET_INDEXTAB', 2)
      vm.getThongTinCongDan()
    },
    methods: {
      getStatus(status) {
          switch(status) {
              case 1:
                  return 'Hoạt động'
              case 0:
                  return 'Đã khóa'
              default:
                  return ''
          }
      },
      editCongDan(id) {
        this.$router.push({ path: '/doanh-nghiep/' + id })
      },
      getThongTinCongDan () {
        let vm = this
        let filter = {
          collectionName: 'donvikinhdoanh',
          id: vm.id
        }
        vm.$store.dispatch('collectionDetail', filter).then(function (response) {
          // console.log('responseThongTinCongDan', response.resp)
          vm.thongTinCongDan = response.resp
        }).catch(function () {
          vm.loadingData = false
        })
      },
      dateLocale (dateInput) {
        let date = new Date(dateInput)
        return `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()}`
      }
    }
}
</script>

<style scoped lang="scss">
.cong-dan-info td{
    border-bottom: 0px!important;
}
.cong-dan-info table{
    border-top: none!important;
}
.td-highlight{
    background-color: #F9F4F1;
}
</style>