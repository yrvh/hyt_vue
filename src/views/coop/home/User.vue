<template>
  <div class="user">
    <van-nav-bar left-text="返回" left-arrow border fixed z-index="50" placeholder @click-left="clickLeft()"/>
    <van-tabs type="card" color="#7EB6FF" v-model="tab_mark" animated swipeable>
      <!--     单位用户       -->
      <van-tab title="单位用户" :badge="com_arr[0].value==0? '':com_arr[0].value">

        <van-cell v-for="item in com_arr" :key="item.id" :title="item.title"
                  :value="item.value" :value-class="(item.isright_css && item.value>0)? 'right-css':''"
                  is-link :to="{path: '/checkhome_ulist', query: {in_title: item.title, in_status: item.status, usertype: 2, mgtype: 0}}"/>
      </van-tab>

      <!--     业者用户    -->
      <van-tab title="业者用户" :badge="free_arr[0].value==0? '':free_arr[0].value">

        <van-cell v-for="item in free_arr" :key="item.id" :title="item.title"
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
      com_arr: [   // 单位主界面数据
        {
          id: 0,
          title: '服务中',
          value: '',
          status: 1,
          isright_css: true
        },
        {
          id: 1,
          title: '注册中',
          value: '',
          status: 2,
          isright_css: false
        }
      ],
      free_arr: [   // 业者主界面数据
        {
          id: 0,
          title: '服务中',
          value: '',
          status: 7,
          isright_css: true
        },
        {
          id: 1,
          title: '注册中',
          value: '',
          status: 4,
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
      getUserMain({...obj,usertype: 2}),getUserMain({...obj,usertype: 1})
    ]).then(this.$axios.spread((res1,res2,res3) => {
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
