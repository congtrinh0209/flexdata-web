<template>
    <div>
        <v-row>
            <v-col cols="12" md="8">
                <div class="d-flex justify-space-between mb-4">
                    <h3 style="color: #863E3B">THÔNG TIN CÔNG DÂN</h3>
                </div>
            </v-col>
        </v-row>
        <v-form lazy-validation>
            <v-row>
                <v-col cols="12" md="6" class="py-0">
                    <label>Họ tên</label>
                    <v-text-field
                        class="input-form"
                        v-model="name"
                        solo
                        dense
                        clearable
                        max
                    ></v-text-field>
                </v-col>
                <v-col cols="12" md="6" class="py-0">
                    <label>CMND/CCCD</label>
                    <v-text-field
                        class="input-form"
                        v-model="name"
                        solo
                        dense
                        clearable
                        max
                    ></v-text-field>
                </v-col>
                <v-col cols="12" md="3" class="py-0">
                    <label>Ngày sinh</label>
                    <v-text-field
                        class="input-form"
                        v-model="name"
                        solo
                        dense
                        clearable
                        max
                    ></v-text-field>
                </v-col>
                <v-col cols="12" md="3" class="py-0">
                    <label>Giới tính</label>
                    <v-text-field
                        class="input-form"
                        v-model="name"
                        solo
                        dense
                        clearable
                        max
                    ></v-text-field>
                </v-col>
                <v-col cols="12" md="3" class="py-0">
                    <label>Dân tộc</label>
                    <v-text-field
                        class="input-form"
                        v-model="name"
                        solo
                        dense
                        clearable
                        max
                    ></v-text-field>
                </v-col>
                <v-col cols="12" md="3" class="py-0">
                    <label>Quốc tịch</label>
                    <v-text-field
                        class="input-form"
                        v-model="name"
                        solo
                        dense
                        clearable
                        max
                    ></v-text-field>
                </v-col>
                <v-col cols="12" md="6" class="py-0">
                    <label>Email</label>
                    <v-text-field
                        class="input-form"
                        v-model="name"
                        solo
                        dense
                        clearable
                        max
                    ></v-text-field>
                </v-col>
                <v-col cols="12" md="3" class="py-0">
                    <label>Điện thoại</label>
                    <v-text-field
                        class="input-form"
                        v-model="name"
                        solo
                        dense
                        clearable
                        max
                    ></v-text-field>
                </v-col>
                <v-col cols="12" md="3" class="py-0">
                    <label>Tôn giáo</label>
                    <v-text-field
                        class="input-form"
                        v-model="name"
                        solo
                        dense
                        clearable
                        max
                    ></v-text-field>
                </v-col>
                <v-col cols="12" class="py-0">
                    <label>Địa chỉ thường trú</label>
                    <v-text-field
                        class="input-form"
                        v-model="name"
                        solo
                        dense
                        clearable
                        max
                    ></v-text-field>
                </v-col>
                <v-col cols="12" md="4" class="py-0">
                    <label>CMND/CCCD</label>
                    <v-text-field
                        class="input-form"
                        v-model="name"
                        solo
                        dense
                        clearable
                        max
                    ></v-text-field>
                </v-col>
                <v-col cols="12" md="4" class="py-0">
                    <label>Quận / Huyện</label>
                    <v-text-field
                        class="input-form"
                        v-model="name"
                        solo
                        dense
                        clearable
                        max
                    ></v-text-field>
                </v-col>
                <v-col cols="12" md="4" class="py-0">
                    <label>Phường / Xã</label>
                    <v-text-field
                        class="input-form"
                        v-model="name"
                        solo
                        dense
                        clearable
                        max
                    ></v-text-field>
                </v-col>
                <v-col cols="12" class="py-0">
                    <label>Địa chỉ hiện tại</label>
                    <v-text-field
                        class="input-form"
                        v-model="name"
                        solo
                        dense
                        clearable
                        max
                    ></v-text-field>
                </v-col>
                <v-col cols="12" md="4" class="py-0">
                    <label>Tỉnh thành</label>
                    <v-text-field
                        class="input-form"
                        v-model="name"
                        solo
                        dense
                        clearable
                        max
                    ></v-text-field>
                </v-col>
                <v-col cols="12" md="4" class="py-0">
                    <label>Quận / Huyện</label>
                    <v-text-field
                        class="input-form"
                        v-model="name"
                        solo
                        dense
                        clearable
                        max
                    ></v-text-field>
                </v-col>
                <v-col cols="12" md="4" class="py-0">
                    <label>Phường / Xã</label>
                    <v-text-field
                        class="input-form"
                        v-model="name"
                        solo
                        dense
                        clearable
                        max
                    ></v-text-field>
                </v-col>
                <v-col cols="12" class="text-center">
                    <v-btn color="primary" outlined class="mt-3 mx-2  text-white">
                        <v-icon
                            left
                            dark
                        >
                            mdi-content-save
                        </v-icon>
                        Lưu
                    </v-btn>
                    <v-btn color="primary" class="mt-3 mx-2  text-white">
                        <v-icon
                            left
                            dark
                        >
                            mdi-arrow-left-top-bold
                        </v-icon>
                        Quay lại
                    </v-btn>
                </v-col>
            </v-row>
        </v-form>
    </div>
</template>

<script>
export default {
    data() {
        return {
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
    }
}
</script>