<template>
  <div class="user">
    <van-nav-bar left-text="返回" left-arrow border fixed z-index="50" placeholder @click-left="clickLeft()"/>
    <van-tabs type="card" color="#7EB6FF" v-model="tab_mark" animated swipeable>
      <!--     注册用户       -->
      <van-tab title="注册用户" :badge="user_arr[0].value==0? '':user_arr[0].value">

        <van-cell v-for="item in user_arr" :key="item.id" :title="item.title"
                  :value="item.value" :value-class="(item.isright_css && item.value>0)? 'right-css':''"
                  is-link :to="{path: '/checkhome_ulist', query: {in_title: item.title, in_status: item.status, usertype: 2, mgtype: 0}}"/>
      </van-tab>

      <!--     增加服务人员    -->
      <van-tab title="增加服务人员" :badge="add_arr[0].value==0? '':add_arr[0].value">

        <van-cell v-for="item in add_arr" :key="item.id" :title="item.title"
                  :value="item.value" :value-class="(item.isright_css && item.value>0)? 'right-css':''"
                  is-link :to="{path: '/checkhome_ulist', query: {in_title: item.title, in_status: item.status, usertype: 1, mgtype: 0}}"/>
      </van-tab>

    </van-tabs>

  </div>
</template>

<script>
import { getUserMain } from "@/network/check";

export default {
  name: "User",
  components: {
  },
  data() {
    return {
      tab_mark: null,   // nav标签 标识符
      user_arr: [   // 业务人员管理 主界面数据
        {
          id: 0,
          title: '待审核',
          value: '',
          status: 1,
          isright_css: true
        },
        {
          id: 1,
          title: '已确认',
          value: '',
          status: 2,
          isright_css: false
        },
        {
          id: 2,
          title: '已拒绝',
          value: '',
          status: 22,
          isright_css: false
        },
        {
          id: 3,
          title: '服务中',
          value: '',
          status: 8,
          isright_css: false
        },
        {
          id: 4,
          title: '重签协议中',
          value: '',
          status: 11,
          isright_css: false
        }
      ],
      add_arr: [   // 增加服务人员 主界面数据
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
          title: '审核退回',
          value: '',
          status: 44,
        },
        {
          id: 3,
          title: '待业者审核',
          value: '',
          status: 8,
        },
        {
          id: 4,
          title: '业者退回',
          value: '',
          status: 77,
        },
        {
          id: 5,
          title: '待营销员审核',
          value: '',
          status: 88,
          isright_css: false
        },
        {
          id: 6,
          title: '营销员退回',
          value: '',
          status: 88,
          isright_css: false
        },
        {
          id: 7,
          title: '待主管审核',
          value: '',
          status: 88,
          isright_css: false
        },
        {
          id: 8,
          title: '主管退回',
          value: '',
          status: 88,
          isright_css: false
        }
      ],

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
    ]).then(this.$axios.spread((res1,res2,res3) => {
        if(res1.result == 1) this.user_arr.forEach( (item,index) => {   // 请求回来的 单位数据
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

        if(res2.result == 1) this.add_arr.forEach( (item,index) => {   // 请求回来的 业者数据
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

        if(res3.result == 1) this.coop_arr.forEach( (item,index) => {   // 请求回来的 伙伴数据
          switch(index) {
            case 0:
              item.value = res3.hhr_7
              break;
            case 1:
              item.value = res3.hhr_4
              break;
            case 2:
              item.value = res3.hhr_44
              break;
            case 3:
              item.value = res3.hhr_8
              break;
            case 4:
              item.value = res3.hhr_77
              break;
          }
        })
    }))

  },

}
</script>

<style scoped lang="scss">
.user {
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
