<template>
  <div class="deal">
    <van-nav-bar left-text="返回" title="业务合同" left-arrow border fixed z-index="50" placeholder @click-left="onBack"/>
    
    <van-cell v-for="item in deal_arr" :key="item.id" :title="item.title"
              :value="item.value" :value-class="(item.isright_css && item.value>0)? 'right-css':''"
              is-link :to="{path: '/check_deallist', query: {in_title: item.title, in_status: item.status }}"/>

  </div>
</template>

<script>
import { getDeal } from "@/network/check";

export default {
  name: "Deal",
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

      deal_arr: [   // 业务合同
        {
          id: 0,
          title: '待确认',
          value: '',
          status: 6,
          isright_css: true
        },
        {
          id: 1,
          title: '已确认',
          value: '',
          status: 1,
          isright_css: false
        },
        {
          id: 2,
          title: '已退回',
          value: '',
          status: 7,
          isright_css: false
        }
      ],

    }
  },
  methods: {
    onBack() {
      this.clickLeft()
    },
  },
  created() {
    // 获取数据
    this.obj.pass_app = this.$store.state.login.password
    this.obj.tel_app = this.$store.state.login.tel
    this.obj.code_app = this.$store.state.login.code_app
    this.obj.tel_sid = this.$store.state.login.tel_sid

    getDeal(this.obj).then(res => {
      this.deal_arr.forEach( (item,index) => {   // 请求回来的 伙伴数据
        switch(index) {
          case 0:
            item.value = res.bb6
            break;
          case 1:
            item.value = res6.bb1
            break;
          case 2:
            item.value = res.bb7
            break;
        }
      })
    })

  },

}
</script>

<style scoped lang="scss">
.deal {
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
