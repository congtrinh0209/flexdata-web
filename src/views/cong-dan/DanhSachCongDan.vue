<template>
    <div>
        <v-row align-content="center">
            <v-col cols="12" class="mt-0 pb-2">
                <div style="color: #863E3B;font-size: 16px;font-weight: bold;" v-if="type === 'cong-dan'">TÌM KIẾM THÔNG TIN CÔNG DÂN</div>
                <div style="color: #863E3B;font-size: 16px;font-weight: bold;" v-else>TÌM KIẾM THÔNG TIN TỔ CHỨC, DOANH NGHIỆP</div>  
            </v-col>
            <v-col cols="12" md="3" class="my-0 py-0">
                <label>CMND/CCCD</label>
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
            </v-col>
        </v-row>
        <v-row justify="center" class="mt-0">
            <v-col cols="12" md="6" class="py-4">
                <label>Tình trạng</label>
                <div class="d-flex">
                    <v-checkbox
                            inline
                            class="mr-13 mt-0"
                            v-model="daCapTaiKhoan"
                            label="Đã cấp tài khoản"
                        ></v-checkbox>
                        <v-checkbox
                            class="mt-0"
                            inline
                            v-model="chuaCapTaiKhoan"
                            label="Chưa cấp tài khoản"
                        ></v-checkbox>
                </div>
            </v-col>
            <v-col cols="12" md="6" class="d-flex align-center justify-end">
                <v-btn color="primary" flat class="mt-3 mx-0 text-white">
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
                    <strong>Số lượng: {{ total }}</strong>
                    <v-data-table
                        flat
                        :headers="headers"
                        :items="items"
                        :items-per-page="itemsPerPage"
                        hide-default-footer
                        class="elevation-1 mt-2"
                        no-data-text="Không có"
                        :loading="loadingData"
                        loading-text="Đang tải... "
                    >
                        <template v-slot:item.index="{ item, index }">
                            <div>{{ (page+1) * itemsPerPage - itemsPerPage + index + 1 }}</div>
                        </template>
                        <template v-slot:item.status="{ item }">
                            <div>
                                {{ getStatus(item.status) }}
                            </div>
                        </template>
                        <template v-slot:item.action="{ item }">
                            <div>
                                <router-link
                                    to="/thong-tin-tai-khoan/2"
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
import Pagination from '../Pagination.vue'
export default {
    components: {
        Pagination
    },
    props: ['type'],
    data() {
        return {
            selected: [],
            name: '',
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
                    text: 'CMND/CCCD',
                    align: 'left',
                    value: 'cmnd'
                },
                {
                    sortable: false,
                    text: 'Họ tên',
                    align: 'left',
                    value: 'fullname'
                },
                {
                    sortable: false,
                    text: 'Email/ Điện thoại',
                    align: 'left',
                    value: 'contact'
                },
                {
                    sortable: false,
                    text: 'Tình trạng',
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
                    cmnd: '32423942',
                    fullname: 'Đào Văn Dũng',
                    contact: 'abc@gmail.com/0233239232',
                    status: 1,
                },
                {
                    cmnd: '32423942',
                    fullname: 'Đào Văn Dũng',
                    contact: 'abc@gmail.com/0233239232',
                    status: 0,
                }
            ],
            page: 0,
            itemsPerPage: 10,
            total: 2,
            chuaCapTaiKhoan: false,
            daCapTaiKhoan: false,
            pageCount: 10
        }
    },
    created () {
      let vm = this
      vm.$store.commit('SET_INDEXTAB', vm.type === 'cong-dan' ? 1 : 2)
    },
    watch: {
        '$route': function (newRoute, oldRoute) {
            let vm = this
            vm.$store.commit('SET_INDEXTAB', vm.type === 'cong-dan' ? 1 : 2)
        },
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
        }
    }
}
</script>