<template>
  <v-container
    id="danhmuc-page"
    class="px-0 pt-0"
    fluid
    tag="section"
  >
    <v-layout wrap>
      <v-flex class="danh-muc-1">
        <div class="nav-content">
          <v-list dense>
            <v-list-item-group
              v-model="selectedItem"
              color="primary"
            >
              <v-list-item
                v-for="(item, i) in items"
                :key="i"
                @click="selectMenu(item, i)"
              >
                <v-list-item-icon class="mr-2">
                  <v-icon size="20" color="#863E3B" v-if="selectedItem == i">mdi-play</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title v-text="item.text"></v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </div>
      </v-flex>
      <v-flex class="danh-muc-2">
        <div class="row-header">
          <div class="background-triangle-big">
            <span>{{itemSelect['text']}}</span>
          </div>
          <div class="layout row wrap header_tools row-blue">
            <div class="flex xs12 pl-3 text-ellipsis text-bold">
              <div class="layout chart__report wrap">
                <div class="flex px-2 text-right">
                  <button type="button" class="mx-0 my-0 v-btn v-btn--flat theme--light" style="display: none;">
                    <div class="v-btn__content">
                      <i aria-hidden="true" class="v-icon material-icons theme--light">settings</i> &nbsp;
                      <span>Tùy chọn</span>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <v-layout wrap class="wrap-content-2 pb-0">
          <v-flex xs12 md4>
            <v-text-field
              class="pr-2 input-form"
              dense
              solo
              placeholder="Nhập mã mục"
              v-model="dictCode"
              @keyup.enter=""
              hide-details="auto"
              height="32px"
            ></v-text-field>
          </v-flex>
          <v-flex xs12 md4 class="pr-2">
            <v-text-field
              class="input-form"
              dense
              solo
              placeholder="Nhập tên mục"
              v-model="dictName"
              @keyup.enter=""
              hide-details="auto"
              height="32px"
            ></v-text-field>
          </v-flex>
          <v-flex xs12 md4 class="">
            <v-autocomplete
              class="input-form"
              dense
              solo
              placeholder="Trạng thái"
              v-model="statusFilter"
              :items="itemsStatus"
              item-text="text"
              item-value="value"
              @keyup.enter=""
              hide-details="auto"
              height="32px"
            ></v-autocomplete>
          </v-flex>
          <v-flex xs12 class="mt-3 text-right">
            <v-btn color="primary" small class="mx-0 text-white">
              Tìm kiếm
            </v-btn>
          </v-flex>
        </v-layout>
        <v-card
            class="mx-auto pa-3"
            flat
        >
            <v-data-table
              flat
              :headers="headers"
              :items="itemsDanhMuc"
              :items-per-page="itemsPerPage"
              hide-default-footer
              class="elevation-1"
              no-data-text="Không có"
              :loading="loadingData"
              loading-text="Đang tải... "
              id="table-danhmuc"
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
                    <div @click="dialogAddDanhMuc = true">
                      <a>Sửa</a>
                    </div>
                </template>
            </v-data-table>
            <pagination v-if="pageCount" :pageInput="page" :pageCount="pageCount"></pagination>
        </v-card>
      </v-flex>
    </v-layout>
    <v-dialog
      max-width="900"
      v-model="dialogAddDanhMuc"
    >
      <v-card>
        <v-toolbar
          dark
          color="primary"
        >
          <v-toolbar-title v-if="typeAction === 'add'">Thêm danh mục</v-toolbar-title>
          <v-toolbar-title v-else>Cập nhật danh mục</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn
              icon
              dark
              @click="dialogAddDanhMuc = false"
            >
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <v-card-text class="mt-5">
          <v-form
            ref="formAddMember"
            v-model="validFormAdd"
            lazy-validation
          >
              <v-layout wrap>
                <v-flex xs12 class="mb-2">
                  <v-layout wrap>
                    <div class="flex text-label">
                      <span>Mã mục</span>
                      <span class="red--text"> (*)</span>
                    </div>
                    <v-text-field
                      class="flex input-form"
                      v-model="maMuc"
                      solo
                      dense
                      clearable
                      :rules="required"
                      required
                      hide-details="auto"
                    ></v-text-field>
                  </v-layout>
                </v-flex>
                <v-flex xs12 class="mb-2">
                  <v-layout wrap>
                    <div class="flex text-label">
                      <span>Tên mục</span>
                      <span class="red--text"> (*)</span>
                    </div>
                    <v-text-field
                      class="flex input-form"
                      v-model="tenMuc"
                      solo
                      dense
                      clearable
                      :rules="required"
                      required
                      hide-details="auto"
                    ></v-text-field>
                  </v-layout>
                </v-flex>
                <v-flex xs12 class="mb-2">
                  <v-layout wrap>
                    <div class="flex text-label">
                      <span>Trạng thái</span>
                      <span class="red--text"> (*)</span>
                    </div>
                    <v-autocomplete
                      class="flex input-form"
                      hide-no-data
                      :items="itemsStatus"
                      v-model="statusCreate"
                      item-text="text"
                      item-value="value"
                      clearable
                      :rules="required"
                      required
                      dense
                      solo
                      hide-details="auto"
                    ></v-autocomplete>
                  </v-layout>
                </v-flex>
                <v-flex xs12>
                  <v-layout wrap>
                    <div class="flex text-label">
                      <span>Danh mục cha</span>
                    </div>
                    <v-autocomplete
                      class="flex input-form"
                      hide-no-data
                      :items="itemsDanhMucCha"
                      v-model="danhMucCha"
                      item-text="text"
                      item-value="value"
                      clearable
                      dense
                      solo
                      hide-details="auto"
                    ></v-autocomplete>
                  </v-layout>
                </v-flex>
              </v-layout>
          </v-form>
        </v-card-text>
        <v-card-actions class="justify-end">
          <v-btn color="red" class="white--text mr-2" :loading="loading" :disabled="loading" @click="dialogAddDanhMuc = false">
            <v-icon left>
              mdi-close
            </v-icon>
            Thoát
          </v-btn>
          <v-btn class="mr-2" color="primary" :loading="loading" :disabled="loading" @click="submitAddDanhMuc">
            <v-icon left>
              mdi-content-save
            </v-icon>
            <span v-if="typeAction === 'add'">Thêm mới</span>
            <span v-else>Cập nhật</span>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
  import Pagination from './Pagination.vue'
  export default {
    name: 'DanhMuc',
    components: {
      Pagination
    },
    data: () => ({
      loading: false,
      dialogAddDanhMuc: false,
      typeAction: 'add',
      validFormAdd: false,
      itemsStatus: [],
      statusFilter: '',
      statusCreate: '',
      itemsDanhMucCha: [],
      danhMucCha: '',
      dictName: '',
      dictCode: '',
      selectedItem: 0,
      itemSelect: '',
      items: [
        { text: 'Giới tính', value: '1' },
        { text: 'Dân tộc', value: '2' },
        { text: 'Tôn giáo', value: '3' },
        { text: 'Quốc gia', value: '4' },
        { text: 'Tỉnh/ thành', value: '5' },
        { text: 'Quận/ huyện', value: '6' },
        { text: 'Xã/ phường', value: '7' },
      ],
      headers: [
        {
            sortable: false,
            text: 'STT',
            align: 'center',
            value: 'index'
        },
        {
            sortable: false,
            text: 'Mã mục',
            align: 'left',
            value: 'itemCode'
        },
        {
            sortable: false,
            text: 'Tên mục',
            align: 'left',
            value: 'itemName'
        },
        {
            sortable: false,
            text: 'Tham chiếu',
            align: 'left',
            value: 'ref'
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
      itemsDanhMuc: [
          {
              itemCode: 'A-3123123123',
              itemName: 'Tên danh mục',
              ref: 'A0123123123',
              status: 1,
          },
          {
              itemCode: 'A-3123123123',
              itemName: 'Tên danh mục',
              ref: 'A0123123123',
              status: 0,
          }
      ],
      page: 0,
      itemsPerPage: 10,
      total: 2,
      pageCount: 10,
      loadingData: false,
      required: [
        v => !!v || 'Thông tin bắt buộc'
      ],
      tenMuc: '',
      maMuc: ''
    }),
    created () {
      let vm = this
      vm.$store.commit('SET_INDEXTAB', 0)
      vm.selectedItem = 0
      vm.itemSelect = vm.items[0]
    },
    computed: {
    },
    methods: {
      submitAddDanhMuc () {},
      selectMenu(item, index) {
        let vm = this
        vm.selectedItem = index
        vm.itemSelect = item
      },
      getStatus(status) {
        switch(status) {
          case 1:
              return 'Sử dụng'
          case 0:
              return 'Không sử dụng'
          default:
              return ''
        }
      }
    }
  }
</script>

<style lang="css">
  #danhmuc-page .v-list {
    background: transparent !important;
  }
  #danhmuc-page .v-list-item {
    padding: 0 8px !important
  }
  #danhmuc-page .v-list-item--dense .v-list-item__icon, .v-list--dense .v-list-item .v-list-item__icon {
    height: 20px !important;
  }
  .danh-muc-1 {
    width: 235px;
    max-width: 235px;
    padding-right: 15px;
    /* border-bottom: 1px solid #DDDDDD; */
  }
  .danh-muc-2 {
    width: calc(100% - 235px);
    border: 1px solid #DDDDDD;
    height: 500px;
  }
  .nav-content {
    border: 1px solid #DDDDDD;
    box-sizing: border-box;
    border-radius: 7px;
  }

  .row-header {
    background-color: #e1e2e1;
    overflow: hidden;
    display: flex;
    align-items: center;
    width: 100%;
    height: 36px;
  }
  .row-header .background-triangle-big {
      white-space: nowrap;
      min-width: 135px;
  }
  body .background-triangle-big, body .background-triangle-small {
      background-color: #863E3B !important;
  }
  .background-triangle-big, .background-triangle-small {
      background-color: #863E3B;
      display: inline-block;
      text-align: left;
      color: #fff;
      position: relative;
      margin-right: 20px;
      text-transform: uppercase;
      padding: 9px 15px;
      width: auto;
      cursor: pointer;
  }
  body .background-triangle-big:before, body .background-triangle-small:before {
      border-top-color: #863E3B !important;
  }

  .background-triangle-big:before {
      content: "";
      position: absolute;
      transform: rotate(
  45deg);
      right: -4px;
      top: 4px;
      border-top: 26px solid #863E3B;
      border-left: 26px solid transparent;
      border-bottom: 25px solid transparent;
  }
  .background-triangle-big:before {
      content: "";
      position: absolute;
      transform: rotate(
  45deg);
      right: -4px;
      top: 4px;
      border-top: 26px solid #863E3B;
      border-left: 26px solid transparent;
      border-bottom: 25px solid transparent;
  }
  .wrap-content-2 {
    padding: 12px
  }
  
  #table-danhmuc td{
    height: 42px !important;
  }
  .text-label {
    width: 150px;
    max-width: 150px;
  }
</style>
