<template>
  <div class="invoice">
    <van-nav-bar left-text="返回" left-arrow border fixed z-index="50" placeholder @click-left="clickLeft()"/>
    <van-tabs type="card" color="#7EB6FF" v-model="tab_mark" animated swipeable>
      <!--     发票记录       -->
      <van-tab title="发票记录" :badge="invoice_arr[0].value==0? '':com_arr[0].value">

        <van-cell v-for="item in invoice_arr" :key="item.id" :title="item.title"
                  :value="item.value" :value-class="(item.isright_css && item.value>0)? 'right-css':''"
                  is-link :to="{path: '/checkhome_ulist', query: {in_title: item.title, in_status: item.status, usertype: 2, mgtype: 0}}"/>
      </van-tab>

      <!--     发票抬头    -->
      <van-tab title="发票抬头" :badge="tt_arr[0].value==0? '':free_arr[0].value">

        <van-cell v-for="item in tt_arr" :key="item.id" :title="item.title"
                  :value="item.value" :value-class="(item.isright_css && item.value>0)? 'right-css':''"
                  is-link :to="{path: '/checkhome_ulist', query: {in_title: item.title, in_status: item.status, usertype: 1, mgtype: 0}}"/>
      </van-tab>

    </van-tabs>

  </div>
</template>

<script>
import { getUserMain } from "@/network/check";

export default {
  name: "Invoice",
  components: {
  },
  data() {
    return {
      tab_mark: null,   // nav标签 标识符
      invoice_arr: [
        {
          id: 0,
          title: '未计税',
          value: '',
          status: 1,
          isright_css: true
        },
        {
          id: 1,
          title: '已计税',
          value: '',
          status: 2,
          isright_css: false
        },
        {
          id: 2,
          title: '已报税',
          value: '',
          status: 22,
          isright_css: false
        },
        {
          id: 3,
          title: '已作废',
          value: '',
          status: 8,
          isright_css: false
        }
      ],
      tt_arr: [
        {
          id: 0,
          title: '待提交',
          value: '',
          status: 7,
          isright_css: true
        },
        {
          id: 1,
          title: '待审核',
          value: '',
          status: 4,
        },
        {
          id: 2,
          title: '审核通过',
          value: '',
          status: 44,
        },
        {
          id: 3,
          title: '审核退回',
          value: '',
          status: 8,
        }
      ]

    }
  },
  methods: {
  },
  created() {
    // 获取用户管理主界面数据
    let obj = {
      pass_app: this.$store.state.login.password,
      tel_app: this.$store.state.login.tel,
      code_app: this.$store.state.login.code_app,
    }
    this.$axios.all([
      getUserMain({...obj,usertype: 2}),getUserMain({...obj,usertype: 1}),getUserMain({...obj,usertype: 11})
    ]).then(this.$axios.spread((res1,res2) => {
        if(res1.result == 1) this.com_arr.forEach( (item,index) => {   // 请求回来的 单位数据
          switch(index) {
            case 0:
              item.value = res1.dw_1
              break;
            case 1:
              item.value = res1.dw_2
              break;
            case 2:
              item.value = res1.dw_22
              break;
            case 3:
              item.value = res1.dw_8
              break;
            case 4:
              item.value = res1.dw_11
              break;
          }
        })

        if(res2.result == 1) this.free_arr.forEach( (item,index) => {   // 请求回来的 业者数据
          switch(index) {
            case 0:
              item.value = res2.yz_7
              break;
            case 1:
              item.value = res2.yz_4
              break;
            case 2:
              item.value = res2.yz_44
              break;
            case 3:
              item.value = res2.yz_8
              break;
            case 4:
              item.value = res2.yz_77
              break;
          }
        })
    }))

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
