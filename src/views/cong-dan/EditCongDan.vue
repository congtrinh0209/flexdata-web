<template>
    <div>
        <v-container>
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
                        <v-text-field
                            v-model="name"
                            label="Họ tên"
                            outlined
                            dense
                            clearable
                            max
                        ></v-text-field>
                    </v-col>
                    <v-col cols="12" md="6" class="py-0">
                        <v-text-field
                            v-model="name"
                            label="CMND/CCCD"
                            outlined
                            dense
                            clearable
                            max
                        ></v-text-field>
                    </v-col>
                    <v-col cols="12" md="3" class="py-0">
                        <v-text-field
                            v-model="name"
                            label="Ngày sinh"
                            outlined
                            dense
                            clearable
                            max
                        ></v-text-field>
                    </v-col>
                    <v-col cols="12" md="3" class="py-0">
                        <v-text-field
                            v-model="name"
                            label="Giới tính"
                            outlined
                            dense
                            clearable
                            max
                        ></v-text-field>
                    </v-col>
                    <v-col cols="12" md="3" class="py-0">
                        <v-text-field
                            v-model="name"
                            label="Dân tộc"
                            outlined
                            dense
                            clearable
                            max
                        ></v-text-field>
                    </v-col>
                    <v-col cols="12" md="3" class="py-0">
                        <v-text-field
                            v-model="name"
                            label="Quốc tịch"
                            outlined
                            dense
                            clearable
                            max
                        ></v-text-field>
                    </v-col>
                    <v-col cols="12" md="6" class="py-0">
                        <v-text-field
                            v-model="name"
                            label="Email"
                            outlined
                            dense
                            clearable
                            max
                        ></v-text-field>
                    </v-col>
                    <v-col cols="12" md="3" class="py-0">
                        <v-text-field
                            v-model="name"
                            label="Điện thoại"
                            outlined
                            dense
                            clearable
                            max
                        ></v-text-field>
                    </v-col>
                    <v-col cols="12" md="3" class="py-0">
                        <v-text-field
                            v-model="name"
                            label="Tôn giáo"
                            outlined
                            dense
                            clearable
                            max
                        ></v-text-field>
                    </v-col>
                    <v-col cols="12" class="py-0">
                        <v-text-field
                            v-model="name"
                            label="Địa chỉ thường trú"
                            outlined
                            dense
                            clearable
                            max
                        ></v-text-field>
                    </v-col>
                    <v-col cols="12" md="4" class="py-0">
                        <v-text-field
                            v-model="name"
                            label="Tỉnh thành"
                            outlined
                            dense
                            clearable
                            max
                        ></v-text-field>
                    </v-col>
                    <v-col cols="12" md="4" class="py-0">
                        <v-text-field
                            v-model="name"
                            label="Quận / Huyện"
                            outlined
                            dense
                            clearable
                            max
                        ></v-text-field>
                    </v-col>
                    <v-col cols="12" md="4" class="py-0">
                        <v-text-field
                            v-model="name"
                            label="Phường / Xã"
                            outlined
                            dense
                            clearable
                            max
                        ></v-text-field>
                    </v-col>
                    <v-col cols="12" class="py-0">
                        <v-text-field
                            v-model="name"
                            label="Địa chỉ hiện tại"
                            outlined
                            dense
                            clearable
                            max
                        ></v-text-field>
                    </v-col>
                    <v-col cols="12" md="4" class="py-0">
                        <v-text-field
                            v-model="name"
                            label="Tỉnh thành"
                            outlined
                            dense
                            clearable
                            max
                        ></v-text-field>
                    </v-col>
                    <v-col cols="12" md="4" class="py-0">
                        <v-text-field
                            v-model="name"
                            label="Quận / Huyện"
                            outlined
                            dense
                            clearable
                            max
                        ></v-text-field>
                    </v-col>
                    <v-col cols="12" md="4" class="py-0">
                        <v-text-field
                            v-model="name"
                            label="Phường / Xã"
                            outlined
                            dense
                            clearable
                            max
                        ></v-text-field>
                    </v-col>
                    <v-col cols="12" class="text-center">
                        <v-btn color="primary" class="mt-3  text-white">
                            Lưu
                        </v-btn>
                    </v-col>
                </v-row>
            </v-form>
        </v-container>
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