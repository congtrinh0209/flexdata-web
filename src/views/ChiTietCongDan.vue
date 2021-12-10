<template>
    <div>
        <v-row>
            <v-col cols="12" md="8">
                <div class="d-flex justify-space-between mb-4">
                    <div class="title-page">THÔNG TIN CÔNG DÂN</div>
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
                        <h4 class="title-page">{{thongTinCongDan['hoVaTen']}}</h4>
                        <v-layout class="mt-4" wrap style="width: 350px;">
                            <v-flex xs5>Số CMND/ CCCD:</v-flex>
                            <v-flex xs7 class="mb-2">
                              <span class="font-weight-bold">{{thongTinCongDan['maSoCaNhan']}}</span>
                            </v-flex>
                            <v-flex xs5>Trạng thái:</v-flex>
                            <v-flex xs7>
                              <span class="font-weight-bold">
                                {{thongTinCongDan && thongTinCongDan['danhTinhDienTu'] && thongTinCongDan['danhTinhDienTu']['tinhTrangSuDungTaiKhoan']['tenMuc'] ? thongTinCongDan['danhTinhDienTu']['tinhTrangSuDungTaiKhoan']['tenMuc'] : 'Chưa tạo tài khoản'}}
                              </span>
                            </v-flex>
                        </v-layout>
                        <div class="d-flex justify-space-between w-full pa-4 pb-2" v-if="thongTinCongDan && thongTinCongDan['danhTinhDienTu']">
                            <v-btn v-if="thongTinCongDan['danhTinhDienTu']['tinhTrangSuDungTaiKhoan']['maMuc'] != 4 && thongTinCongDan['danhTinhDienTu']['tinhTrangSuDungTaiKhoan']['maMuc']" color="primary" small class="mt-3 mx-3 text-white">
                                Đổi mật khẩu
                            </v-btn>
                            <v-btn color="primary" v-if="!thongTinCongDan['danhTinhDienTu']['tinhTrangSuDungTaiKhoan']['maMuc']" small class="mt-3 mx-3 text-white" @click="showCreateAcc()">
                                Tạo tài khoản
                            </v-btn>
                            <v-btn v-if="thongTinCongDan['danhTinhDienTu']['tinhTrangSuDungTaiKhoan']['maMuc'] == 1" color="primary" small class="mt-3 mx-3 text-white" @click="activeAccount()">
                                Kích hoạt tài khoản
                            </v-btn>
                            <v-btn v-if="thongTinCongDan['danhTinhDienTu']['tinhTrangSuDungTaiKhoan']['maMuc'] == 2" color="primary" small class="mt-3 mx-3 text-white" @click="blockAccount()">
                                Khóa tài khoản
                            </v-btn>
                            <v-btn v-if="thongTinCongDan['danhTinhDienTu']['tinhTrangSuDungTaiKhoan']['maMuc'] == 3" color="primary" small class="mt-3 mx-3 text-white" @click="unBlockAccount()">
                                Mở khóa tài khoản
                            </v-btn>
                            <!-- <v-btn color="primary" small class="mt-3 mx-3 text-white">
                                In phiếu
                            </v-btn> -->
                        </div>
                        <div class="d-flex justify-space-between w-full pb-4 " v-if="thongTinCongDan && thongTinCongDan['danhTinhDienTu']">
                          <v-btn color="primary" v-if="thongTinCongDan['danhTinhDienTu']['tinhTrangSuDungTaiKhoan']['maMuc'] == 3" small class="mt-3 mx-3 text-white" @click="deleteAccount()">
                            Xóa tài khoản
                          </v-btn>
                        </div>
                    </div>
                </v-card>
            </v-col>
        </v-row>
        <v-dialog
          max-width="450"
          v-model="dialogCreateAcc"
          persistent
        >
          <v-card>
            <v-toolbar
              dark
              color="primary"
            >
              <v-toolbar-title >Tạo tài khoản</v-toolbar-title>
              <v-spacer></v-spacer>
              <v-toolbar-items>
                <v-btn
                  icon
                  dark
                  @click="dialogCreateAcc = false"
                >
                  <v-icon>mdi-close</v-icon>
                </v-btn>
              </v-toolbar-items>
            </v-toolbar>
            <v-card-text class="mt-5">
              <v-form
                ref="formCreateAcc"
                v-model="validFormAdd"
                lazy-validation
              >
                  <v-layout wrap>
                    <v-flex xs12 class="mb-2">
                      <div class="text-label mb-2">
                        <span>Mật khẩu tài khoản</span>
                        <span class="red--text"> (*)</span>
                      </div>
                      <v-text-field
                        class="input-form"
                        v-model="passwordCreate"
                        solo
                        dense
                        :rules="required"
                        required
                        hide-details="auto"
                      ></v-text-field>
                    </v-flex>
                  </v-layout>
              </v-form>
            </v-card-text>
            <v-card-actions class="justify-end">
              <v-btn color="red" class="white--text mr-2" :loading="loadingAction" :disabled="loadingAction" @click="dialogCreateAcc = false">
                <v-icon left>
                  mdi-close
                </v-icon>
                Thoát
              </v-btn>
              <v-btn class="mr-2" color="primary" :loading="loadingAction" :disabled="loadingAction" @click.native="createAccount">
                <v-icon left>
                  mdi-content-save
                </v-icon>
                <span>Tạo tài khoản</span>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
    </div>
</template>

<script>
import Vue from 'vue'
import Pagination from './Pagination.vue'
import toastr from 'toastr'
toastr.options = {
  'closeButton': true,
  'timeOut': '5000',
  "positionClass": "toast-top-center"
}
import VueConfirmDialog from 'vue-confirm-dialog'
Vue.use(VueConfirmDialog)
Vue.component('vue-confirm-dialog', VueConfirmDialog.default)
export default {
    props: ["id"],
    components: {
      Pagination
    },
    data() {
      return {
        publicPath: process.env.VUE_APP_PULIC_PATH,
        selected: [],
        passwordCreate: '',
        loadingAction: false,
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
                lable: 'Họ tên',
                value: 'hoVaTen'
            },
            {
                lable: 'Ngày sinh',
                value: 'ngaySinh',
                type: 'date'
            },
            {
                lable: 'Giới tính',
                value: 'gioiTinh',
                type: 'danhmuc'
            },
            {
                lable: 'Dân tộc',
                value: 'danToc',
                type: 'danhmuc'
            },
            {
                lable: 'Quốc gia',
                value: 'quocTich',
                type: 'danhmuc'
            },
            {
                lable: 'CMND/CCCD',
                value: 'maSoCaNhan'
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
                lable: 'Địa chỉ thường trú',
                value: 'diaChiThuongTru',
                type: 'address'
            },
            {
                lable: 'Nơi ở hiện tại',
                value: 'noiOHienTai',
                type: 'address'
            },
            // {
            //     lable: 'Giấy tờ tùy thân',
            //     value: 'action'
            // }
        
        ],
        thongTinCongDan: '',
        validFormAdd: true,
        dialogCreateAcc: false,
        required: [
          v => (v !== '' && v !== null && v !== undefined) || 'Thông tin bắt buộc'
        ],
      }
    },
    created () {
      let vm = this
      vm.$store.commit('SET_INDEXTAB', 1)
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
        this.$router.push({ path: '/cong-dan/' + id })
      },
      getThongTinCongDan () {
        let vm = this
        let filter = {
          collectionName: 'canhan',
          id: vm.id
        }
        vm.$store.dispatch('collectionDetail', filter).then(function (response) {
          // console.log('responseThongTinCongDan', response.resp)
          vm.thongTinCongDan = response.resp
        }).catch(function () {
          vm.loadingData = false
        })
      },
      showCreateAcc () {
        let vm = this
        vm.passwordCreate = ''
        vm.dialogCreateAcc = true
      },
      createAccount () {
        let vm = this
        if (vm.$refs.formCreateAcc.validate()) {
          let filter = {
            data: {
              "maSoDinhDanh": vm.thongTinCongDan.maDinhDanh,
              "password": vm.passwordCreate,
              "provider": "keycloak",
              "type": "canhan"
            }
          }
          vm.loadingAction = true
          vm.$store.dispatch('createAccountCaNhan', filter).then(function (response) {
            vm.loadingAction = false
            vm.dialogCreateAcc = false
            toastr.remove()
            toastr.success('Tạo tài khoản thành công')
            vm.getThongTinCongDan()
          }).catch(function () {
            vm.loadingAction = false
            toastr.remove()
            toastr.error('Tạo tài khoản không thành công')
          })
        }
      },
      activeAccount () {
        let vm = this
        let filter = {
          data: {
            "maSoDinhDanh": vm.thongTinCongDan.maDinhDanh,
            "provider": "keycloak",
            "type": "canhan"
          }
        }
        vm.loadingAction = true
        vm.$store.dispatch('activeCaNhan', filter).then(function (response) {
          vm.loadingAction = false
          vm.dialogCreateAcc = false
          toastr.remove()
          toastr.success('Kích hoạt tài khoản thành công')
          vm.getThongTinCongDan()
        }).catch(function () {
          vm.loadingAction = false
          toastr.remove()
          toastr.error('Kích hoạt tài khoản không thành công')
        })
      },
      blockAccount () {
        let vm = this
        let filter = {
          data: {
            "maSoDinhDanh": vm.thongTinCongDan.maDinhDanh,
            "provider": "keycloak",
            "type": "canhan"
          }
        }
        vm.loadingAction = true
        vm.$store.dispatch('blockCaNhan', filter).then(function (response) {
          vm.loadingAction = false
          vm.dialogCreateAcc = false
          toastr.remove()
          toastr.success('Khóa tài khoản thành công')
          vm.getThongTinCongDan()
        }).catch(function () {
          vm.loadingAction = false
          toastr.remove()
          toastr.error('Khóa tài khoản không thành công')
        })
      },
      unBlockAccount () {
        let vm = this
        let filter = {
          data: {
            "maSoDinhDanh": vm.thongTinCongDan.maDinhDanh,
            "provider": "keycloak",
            "type": "canhan"
          }
        }
        vm.loadingAction = true
        vm.$store.dispatch('unBlockCaNhan', filter).then(function (response) {
          vm.loadingAction = false
          toastr.remove()
          toastr.success('Mở khóa tài khoản thành công')
          vm.getThongTinCongDan()
        }).catch(function () {
          vm.loadingAction = false
          toastr.remove()
          toastr.error('Mở khóa tài khoản không thành công')
        })
      },
      deleteAccount () {
        let vm = this
        vm.$confirm({
          title: 'Xác nhận xóa dữ liệu',
          message: 'Bạn có chắc chắn xóa tài khoản này?',
          button: {
            yes: 'Có',
            no: 'Không'
          },
          callback: confirm => {
            if (confirm == true) {
              let filter = {
                data: {
                  "maSoDinhDanh": vm.thongTinCongDan.maDinhDanh,
                  "provider": "keycloak",
                  "type": "canhan"
                }
              }
              vm.loadingAction = true
              vm.$store.dispatch('deleteCaNhan', filter).then(function (response) {
                vm.loadingAction = false
                vm.dialogCreateAcc = false
                toastr.remove()
                toastr.success('Xóa tài khoản thành công')
                vm.getThongTinCongDan()
              }).catch(function () {
                vm.loadingAction = false
                toastr.remove()
                toastr.error('Xóa tài khoản không thành công')
              })
            }
          }
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