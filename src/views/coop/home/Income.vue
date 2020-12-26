<!-- 收入管理-->

<template>
  <div class="income">
    <van-nav-bar left-text="返回" left-arrow border fixed z-index="50" title="收入管理" placeholder @click-left="clickLeft()"/>

    <van-cell v-for="item in income_arr" :key="item.id" :title="item.title"
              :value="item.value" :value-class="(item.isright_css && item.value>0)? 'right-css':''"
              is-link :to="{path: '/coop_incomelist', query: {in_title: item.title, in_status: item.status}}"/>


  </div>
</template>

<script>
import { getUserMain } from "@/network/check";

export default {
  name: "Income",
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
      income_arr: [   // 主界面数据
        {
          id: 0,
          title: '待业者确认',
          value: '',
          status: 0,
          isright_css: true
        },
        {
          id: 1,
          title: '业者退回',
          value: '',
          status: 3,
          isright_css: false
        },
        {
          id: 2,
          title: '待商秘公司确认',
          value: '',
          status: 2,
          isright_css: false
        },
        {
          id: 3,
          title: '商秘公司退回',
          value: '',
          status: 5,
          isright_css: false
        },
        {
          id: 4,
          title: '待发起支付',
          value: '',
          status: 6,
          isright_css: false
        },
        {
          id: 5,
          title: '待支付',
          value: '',
          status: 7,
          isright_css: false
        },
        {
          id: 6,
          title: '支付中',
          value: '',
          status: 11,
          isright_css: false
        },
        {
          id: 7,
          title: '支付失败',
          value: '',
          status: 12,
          isright_css: false
        },
        {
          id: 8,
          title: '用户已收款',
          value: '',
          status: 8,
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
    this.obj.tel_sid = this.$store.state.login.tel_sid

      getUserMain(this.obj).then( res => {
        if(res.result == 1) this.income_arr.forEach( (item,index) => {
          switch(index) {
            case 0:
              item.value = res.dw_1
              break;
            case 1:
              item.value = res.dw_2
              break;
            case 2:
              item.value = res.dw_22
              break;
            case 3:
              item.value = res.dw_8
              break;
            case 4:
              item.value = res.dw_11
              break;
          }
        })
    })

  },

}
</script>

<style scoped lang="scss">
.income {
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
