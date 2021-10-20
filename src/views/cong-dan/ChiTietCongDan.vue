<template>
    <div>
        <v-row>
            <v-col cols="12" md="8">
                <div class="d-flex justify-space-between mb-4">
                    <h3 style="color: #863E3B">THÔNG TIN CÔNG DÂN</h3>
                    <div>
                        <v-btn
                            class="mx-2"
                            small
                            text
                            color="gray"
                            @click="editCongDan(1)"
                        >
                            <v-icon>mdi-pencil-outline</v-icon>
                        </v-btn>
                        <v-btn
                            small
                            text
                            color="gray"
                        >
                            <v-icon>mdi-content-save</v-icon>
                        </v-btn>
                    </div>
                </div>
                <div>
                    <v-simple-table :dense="true" class="cong-dan-info"  style="border-bottom: thin solid rgba(0, 0, 0, 0.12);">
                        <template v-slot:default>
                            <tbody>
                                <tr v-for="(item, index) in thongTin" :key="index" :class="{'td-highlight': index%2 === 0}">
                                    <td class="py-2 px-6"><strong>{{item.lable}}</strong></td>
                                    <td v-if="item.value !== 'action'" class="py-2"><span>{{ congDanDetail[item.value]}}</span></td>
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
                    <div class="pa-2 mt-4">
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
                                <div style="width: 130px">
                                    <v-btn
                                        class="mx-2"
                                        small
                                        text
                                        color="gray"
                                    >
                                        <v-icon>mdi-pencil-outline</v-icon>
                                    </v-btn>
                                </div>
                            </template>
                        </v-data-table>
                        <pagination v-if="pageCount" :pageInput="page" :pageCount="pageCount"></pagination>
                    </div>
                </div>
            </v-col>
            <v-col cols="12" md="4">
                <v-card class="pt-4">
                    <div class="d-flex align-center flex-column">
                        <img class="mb-4" style="width: 226px; height: 226px;" src="/images/avt.png" alt="">
                        <h4 style="color: #863E3B">THÔNG TIN TÀI KHOẢN</h4>
                        <v-layout class="mt-4" wrap style="width: 300px;">
                            <v-flex xs6><strong>Tên đăng nhập</strong></v-flex>
                            <v-flex xs6>
                            <v-text-field
                                class="input-form"
                                v-model="name"
                                placeholder="Tên đăng nhập"
                                solo
                                dense
                                clearable
                                max
                            ></v-text-field>
                            </v-flex>
                            <v-flex xs6><strong>Trạng thái</strong></v-flex>
                            <v-flex xs6>
                                <v-text-field
                                class="input-form"
                                v-model="name"
                                placeholder="12345432"
                                solo
                                dense
                                clearable
                                max
                            ></v-text-field>
                            </v-flex>
                        </v-layout>
                        <div class="d-flex justify-space-between w-full pa-4 ">
                            <v-btn color="primary" flat small class="mt-3 mx-3 text-white">
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
import Pagination from '../Pagination.vue'
export default {
    components: {
        Pagination
    },
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
                    align: 'left',
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
                    value: 'hoTen'
                },
                {
                    lable: 'Ngày sinh',
                    value: 'ngaySinh'
                },
                {
                    lable: 'Giới tính',
                    value: 'gioiTinh'
                },
                {
                    lable: 'Dân tộc',
                    value: 'danToc'
                },
                {
                    lable: 'Quốc gia',
                    value: 'quocGia'
                },
                {
                    lable: 'CMND/CCCD',
                    value: 'cmnd'
                },
                {
                    lable: 'Email',
                    value: 'email'
                },
                {
                    lable: 'Địa chỉ thường trú',
                    value: 'diaChiThuongTru'
                },
                {
                    lable: 'Địa chỉ hiện tại',
                    value: 'diaChiHienTai'
                },
                {
                    lable: 'Giấy tờ tùy thân',
                    value: 'action'
                }
            
            ],
            congDanDetail: {
                hoTen: 'Đào Văn Dũng',
                ngaySinh: '10/02/1998',
                gioiTinh: 'Nam',
                danToc: 'Kinh',
                quocGia: 'Việt Nam',
                cmnd: '29839202023',
                email: 'abc@gmail.com',
                diaChiThuongTru: '123, Đội Cấn, phường Liễu Giai, quận Ba Đình, Hà Nội',
                diaChiHienTai: '123, Đội Cấn, phường Liễu Giai, quận Ba Đình, Hà Nội',
            }
        }
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
            this.$router.push({ path: '/cap-nhat-tai-khoan/' + id })
        }
    }
}
</script>

<style scoped>
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