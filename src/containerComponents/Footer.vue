<template>
  <v-footer
    id="footer" class="py-0 pl-0"
  >
    <v-container class="pt-1">
      <v-layout wrap style="padding-top: 7px;">
        <v-flex xs12 md8>
          <v-layout wrap>
            <v-flex class="text-1">
              <span>Cơ quan chủ quản: UBND tỉnh Hậu Giang</span>
            </v-flex>
            <v-flex class="text-2">
              <span>Tổng đài giải đáp: 1900 86.68.95</span>
            </v-flex>
            <v-flex class="text-3">
              <span>Email: dichvucong@haugiang.gov.vn</span>
            </v-flex>
          </v-layout>
        </v-flex>
        <v-flex xs12 md4 class="image-footer">
            <img class="img-1" src="/images/logo-fds.png">
            <img class="img-2" src="/images/logo-flex.png">
        </v-flex>
      </v-layout>
    </v-container>
  </v-footer>
</template>

<script>
  export default {
    name: 'Footer',

    data: () => ({
    }),
    created () {
      let vm = this
    },
    computed: {
    }
  }
</script>

<style lang="css">
  #footer {
    height: 45px;
    width: 100%;
    background: url(/images/bg-footer.png) no-repeat;
    background-size: cover;
    padding: 0;
  }
  #footer .container {
    height: 45px;
    padding: 0;
    display: flex;
    text-align: center;
    flex-wrap: wrap;
    align-content: center;
  }
  .image-footer {
    text-align: right;
  }
  #footer .text-1, #footer .text-2, #footer .text-3 {
    font-family: Roboto;
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 16px;
    text-align: left;
    color: #FFFFFF;
  }
  .image-footer .img-1 {
    margin-right: 15px;
  }
</style>
