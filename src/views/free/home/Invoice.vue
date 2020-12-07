<template>
  <div class="invoice">
    <van-nav-bar left-text="返回" left-arrow border fixed z-index="50" title="发票记录" placeholder @click-left="clickLeft()"/>

    <van-cell v-for="item in invoice_arr" :key="item.id" :title="item.title"
              :value="item.value" :value-class="(item.isright_css && item.value>0)? 'right-css':''"
              is-link :to="{path: '/free_invoicelist', query: {in_title: item.title, in_status: item.status}}"/>

  </div>
</template>

<script>
import { getInvoice } from "@/network/free";

export default {
  name: "Invoice",
  components: {
  },
  data() {
    return {
      obj: {
        pass_app: '',
        tel_app: '',
        code_app: '',
        tel_sid: '',   // 用户id
      },
      tab_mark: null,   // nav标签 标识符
      invoice_arr: [
        {
          id: 0,
          title: '未计税',
          value: '',
          status: 0,
          isright_css: true
        },
        {
          id: 1,
          title: '已算税',
          value: '',
          status: 2,
          isright_css: false
        },
        {
          id: 2,
          title: '已报税',
          value: '',
          status: 1,
          isright_css: false
        }
      ]

    }
  },
  methods: {
  },
  created() {
    // 获取用户管理主界面数据
    this.obj.pass_app = this.$store.state.login.password
    this.obj.tel_app = this.$store.state.login.tel
    this.obj.code_app = this.$store.state.login.code_app
    
    getInvoice({...obj,usertype: 2}).then(res1 => {
      this.invoice_arr.forEach((item, index) => {   // 请求回来的 单位数据
        switch (index) {
          case 0:
            item.value = res1.nosend
            break;
          case 1:
            item.value = res1.waisend
            break;
          case 2:
            item.value = res1.send
            break;
        }
      })
    })

  },

}
</script>

<style scoped lang="scss">
.invoice {
  .van-nav-bar{
    //background-color: rgba(0,0,100,0.2) !important;
  }
  .van-tabs {
    //background-color: #cfc;
    margin-top: 5px;
    .van-cell:first-child { margin-top: 20px;}
    .right-css {color: #e33; font-size: 16px; font-weight: 700;}
  }


}
</style>
