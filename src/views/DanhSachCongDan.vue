<template>
    <div>
        <v-row align-content="center">
            <v-col cols="12" class="mt-0 pb-2">
                <div class="title-page" v-if="type === 'cong-dan'">TÌM KIẾM THÔNG TIN CÔNG DÂN</div>
                <div class="title-page" v-else>TÌM KIẾM THÔNG TIN TỔ CHỨC, DOANH NGHIỆP</div>  
            </v-col>
            <v-col cols="12" md="6" class="my-0 py-0 mb-2">
                <label>Thông tin tìm kiếm</label>
                <v-text-field
                    class="input-form mt-2"
                    v-model="keywordSearch"
                    solo
                    dense
                    clearable
                    max
                    hide-details="auto"
                    placeholder="Họ tên, số cmnd/ cccd, ..."
                    @keyup.enter="getDanhMuc()"
                ></v-text-field>
            </v-col>
            <v-col cols="12" md="6" class="py-0 mb-2">
                <label>Tình trạng</label>
                <v-autocomplete
                  class="flex input-form mt-2"
                  hide-no-data
                  :items="itemsTinhTrang"
                  v-model="tinhTrangSearch"
                  item-text="tenMuc"
                  item-value="maMuc"
                  dense
                  solo
                  hide-details="auto"
                  clearable
                  @change="getDanhMuc()"
                >
                </v-autocomplete>
            </v-col>
            <!-- <v-col cols="12" md="3" class="my-0 py-0">
                <label>Họ tên</label>
                <v-text-field
                    class="input-form"
                    v-model="name"
                    solo
                    dense
                    clearable
                    max
                    hide-details="auto"
                ></v-text-field>
            </v-col>
            <v-col cols="12" md="3" class="my-0 py-0">
                <label>Điện thoại</label>
                <v-text-field
                    class="input-form"
                    v-model="name"
                    solo
                    dense
                    clearable
                    max
                    hide-details="auto"
                ></v-text-field>
            </v-col>
            <v-col cols="12" md="3" class="my-0 py-0">
                <label>Email</label>
                <v-text-field
                    class="input-form"
                    v-model="name"
                    solo
                    dense
                    clearable
                    max
                    hide-details="auto"
                ></v-text-field>
            </v-col> -->
        </v-row>
        <v-row justify="center" class="mt-0">
            <v-col cols="12" md="6" class="py-4">
              <v-btn
                class="mx-0"
                small
                color="primary"
                @click="showForm()"
                >
                <v-icon size="18">mdi-plus</v-icon>&nbsp;
                Thêm mới
              </v-btn>
            </v-col>
            <v-col cols="12" md="6" class="d-flex align-center justify-end">
                <v-btn color="primary" small class="mt-2 mx-0 text-white" @click="getDanhMuc()">
                  Tìm kiếm
                </v-btn>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="12" class="pt-0">
                <v-card
                  class="mx-auto pa-3"
                  outlined
                  flat
                >
                    <v-flex class="mb-2">
                        <strong>Số lượng: {{ total }}</strong>
                    </v-flex>
                    
                    <v-data-table
                        :headers="headers"
                        :items="itemsApplicant"
                        :items-per-page="itemsPerPage"
                        item-key="primKey"
                        hide-default-footer
                        class="elevation-1 mt-2"
                        no-data-text="Không có"
                        :loading="loadingData"
                        loading-text="Đang tải... "
                    >
                        <template v-slot:item.index="{ item, index }">
                            <div>{{ (page+1) * itemsPerPage - itemsPerPage + index + 1 }}</div>
                        </template>
                        <template v-slot:item.hoVaTen="{ item }">
                            <div class="font-weight-bold">
                                {{ item.hoVaTen }}
                            </div>
                            <div>
                                {{ dateLocale(item.ngaySinh) }}
                            </div>
                        </template>
                        <template v-slot:item.danhBaLienLac="{ item }">
                            <div>
                                <v-icon size="16">mdi-phone-in-talk-outline</v-icon>&nbsp; {{ item.danhBaLienLac['soDienThoai'] }}
                            </div>
                            <div>
                                <v-icon size="16">mdi-email-fast-outline</v-icon>&nbsp; {{ item.danhBaLienLac['thuDienTu'] }}
                            </div>
                        </template>
                        <template v-slot:item.danhTinhDienTu="{ item }">
                            <div :style="getColor(item.danhTinhDienTu)">
                              {{ getStatus(item.danhTinhDienTu) }}
                            </div>
                        </template>
                        <template v-slot:item.action="{ item }">
                            <div>
                                <router-link
                                    :to="'/thong-tin-ca-nhan/' + item.primKey"
                                    custom
                                >
                                    <span>Xem chi tiết</span>
                                </router-link>
                            </div>
                        </template>
                    </v-data-table>
                    <pagination v-if="pageCount" :pageInput="page" :pageCount="pageCount"></pagination>
                </v-card>
            </v-col>
        </v-row>
    </div>
</template>

<script>
import Pagination from './Pagination.vue'
export default {
    components: {
      Pagination
    },
    props: ['type'],
    data() {
      return {
        selected: [],
        keywordSearch: '',
        loadingData: false,
        itemsTinhTrang: [],
        tinhTrangSearch: '',
        headers: [
            {
                sortable: false,
                text: 'STT',
                align: 'center',
                value: 'index'
            },
            {
                sortable: false,
                text: 'Họ tên / ngày sinh',
                align: 'left',
                value: 'hoVaTen'
            },
            {
                sortable: false,
                text: 'CMND/CCCD',
                align: 'left',
                value: 'maSoCaNhan'
            },
            {
                sortable: false,
                text: 'Điện thoại/ Email',
                align: 'left',
                value: 'danhBaLienLac'
            },
            {
                sortable: false,
                text: 'Tình trạng',
                align: 'left',
                value: 'danhTinhDienTu'
            },
            {
                sortable: false,
                text: 'Thao tác',
                align: 'center',
                value: 'action'
            },
        ],
        itemsApplicant: [],
        page: 0,
        itemsPerPage: 15,
        total: 0,
        chuaCapTaiKhoan: false,
        daCapTaiKhoan: false,
        pageCount: 0
      }
    },
    created () {
      let vm = this
      vm.$store.commit('SET_INDEXTAB', 1)
      vm.getDanhMuc('reset')
      vm.getDanhMucSearch('tinhtrangsudungtaikhoan')
    },
    watch: {
      '$route': function (newRoute, oldRoute) {
        let vm = this
        vm.$store.commit('SET_INDEXTAB', 1)
      },
    },
    methods: {
      showForm () {
        let vm = this
        vm.$router.push({ path: '/cong-dan/0' })
      },
      getDanhMuc (type) {
        let vm = this
        if (type === 'reset') {
          vm.keywordSearch = ''
          vm.total = 0
          vm.pageCount = 0
          vm.page = 0
        }
        if (vm.loadingData) {
          return
        }
        vm.loadingData = true
        let filter = {
          collectionName: 'canhan',
          data: {
            keyword: vm.keywordSearch,
            page: vm.page,
            size: vm.itemsPerPage,
            orderFields: 'hoVaTen',
            orderTypes: 'asc',
            danhTinhDienTu_tinhTrangSuDungTaiKhoan_maMuc: vm.tinhTrangSearch
          }
        }
        vm.$store.dispatch('collectionFilter', filter).then(function (response) {
          vm.itemsApplicant = response.content
          vm.total = response.totalElements
          vm.pageCount = response.totalPages
          vm.loadingData = false
        }).catch(function () {
          vm.loadingData = false
        })
      },
      getDanhMucSearch (name) {
        let vm = this
        let filter = {
          collectionName: name,
          data: {
            keyword: '',
            page: 0,
            size: 100,
            orderFields: 'maMuc',
            orderTypes: 'asc',
            tinhTrang: '1',
            thamChieu_maMuc: ''
          }
        }
        vm.$store.dispatch('collectionFilter', filter).then(function (response) {
          vm.itemsTinhTrang = response.content
        }).catch(function () {
        })
      },
      getStatus(danhTinhDienTu) {
        return danhTinhDienTu.tinhTrangSuDungTaiKhoan['tenMuc'] ? danhTinhDienTu.tinhTrangSuDungTaiKhoan['tenMuc'] : 'Chưa tạo tài khoản'
      },
      getColor (danhTinhDienTu) {
        let status = String(danhTinhDienTu.tinhTrangSuDungTaiKhoan['maMuc'])
        switch(status) {
          case '1':
              return 'color: blue'
          case '2':
              return 'color: green'
          case '3':
            return 'color: orange'
          case '4':
            return 'color: red'
          default:
            return 'color: black'
        }
      },
      dateLocale (dateInput) {
        let date = new Date(dateInput)
        return `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()}`
      }
    }
}
</script>