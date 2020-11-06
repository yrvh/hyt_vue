<template>
  <div class="income">
    <van-nav-bar left-text="返回" left-arrow border fixed z-index="50" title="服务单位" placeholder @click-left="clickLeft()"/>

    <van-cell v-for="item in serve_arr" :key="item.id" :title="item.title"
              :value="item.value" :value-class="(item.isright_css && item.value>0)? 'right-css':''"
              is-link :to="{path: '/checkhome_ulist', query: {in_title: item.title, in_status: item.status, usertype: 2, mgtype: 0}}"/>


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
      tab_mark: null,   // nav标签 标识符
      serve_arr: [   // 主界面数据
        {
          id: 0,
          title: '待提交',
          value: '',
          status: 0,
          isright_css: true
        },
        {
          id: 1,
          title: '待审核',
          value: '',
          status: 2,
          isright_css: false
        },
        {
          id: 2,
          title: '审核退回',
          value: '',
          status: 5,
          isright_css: false
        },
        {
          id: 3,
          title: '待单位审核',
          value: '',
          status: 6,
          isright_css: false
        },
        {
          id: 4,
          title: '单位退回',
          value: '',
          status: 7,
          isright_css: false
        },
        {
          id: 5,
          title: '待营销员审核',
          value: '',
          status: 8,
          isright_css: false
        },
        {
          id: 6,
          title: '营销员退回',
          value: '',
          status: 8,
          isright_css: false
        },
        {
          id: 7,
          title: '待主管审核',
          value: '',
          status: 8,
          isright_css: false
        },
        {
          id: 8,
          title: '主管退回',
          value: '',
          status: 8,
          isright_css: false
        },
        {
          id: 9,
          title: '审核通过',
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
    let obj = {
      pass_app: this.$store.state.login.password,
      tel_app: this.$store.state.login.tel,
      code_app: this.$store.state.login.code_app,
    }

    getUserMain({...obj,usertype: 2}).then(this.$axios.spread(res1 => {
      if(res1.result == 1) this.serve_arr.forEach( (item,index) => {
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
    }))

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
