<template>
    <div>
        <v-container>
            <v-layout wrap>
                <v-flex xs12 class="px-2 mb-4">
                    <h3 style="color: #863E3B">TÌM KIẾM THÔNG TIN CÔNG DÂN</h3>  
                </v-flex>
                <v-flex xs12>
                    <v-layout wrap>
                        <v-flex xs12 md3 px-2>
                            <v-text-field
                                v-model="name"
                                label="CMND/CCCD"
                                outlined
                                dense
                                clearable
                                max
                            ></v-text-field>
                        </v-flex>
                        <v-flex xs12 md3 px-2>
                            <v-text-field
                                v-model="name"
                                label="Họ tên"
                                outlined
                                dense
                                clearable
                            ></v-text-field>
                        </v-flex>
                        <v-flex xs12 md3 px-2>
                            <v-text-field
                                v-model="name"
                                label="Điện thoại"
                                outlined
                                dense
                                clearable
                            ></v-text-field>
                        </v-flex>
                        <v-flex xs12 md3 px-2>
                            <v-text-field
                                v-model="name"
                                label="Email"
                                outlined
                                dense
                                clearable
                            ></v-text-field>
                        </v-flex>
                        <v-flex xs12 md3 px-2>
                            <v-text-field
                                v-model="name"
                                label="Tình trạng"
                                outlined
                                dense
                                clearable
                            ></v-text-field>
                        </v-flex>
                        <v-flex xs12 md3 px-2>
                            <v-checkbox
                                v-model="daCapTaiKhoan"
                                label="Đã cấp tài khoản"
                            ></v-checkbox>
                        </v-flex>
                        <v-flex xs12 md3 px-2>
                            <v-checkbox
                                v-model="chuaCapTaiKhoan"
                                label="Chưa cấp tài khoản"
                            ></v-checkbox>
                        </v-flex>
                        <v-flex xs12 md3 px-2 class="text-right">
                            <v-btn color="primary" small class="mt-3 mx-3 text-white">
                                Tìm kiếm
                            </v-btn>
                        </v-flex>
                    </v-layout>
                </v-flex>
                <v-flex xs12 class="px-2">
                    <v-card
                        class="mx-auto pa-6"
                        outlined
                        flat
                    >
                        <strong>Kết quả: {{ total }} bản ghi</strong>
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
                            <template v-slot:item.status="{ item }">
                                <div>
                                    {{ getStatus(item.status) }}
                                </div>
                            </template>
                            <template v-slot:item.action="{ item }">
                                <div style="width: 130px">
                                    <router-link
                                        to="/chi-tiet-cong-dan/2"
                                        custom
                                    >
                                        <span>Xem chi tiết</span>
                                    </router-link>
                                </div>
                            </template>
                        </v-data-table>
                        <pagination v-if="pageCount" :pageInput="page" :pageCount="pageCount"></pagination>
                    </v-card>

                </v-flex>
            </v-layout>
        </v-container>
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
                    align: 'left',
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