<template>
  <div class="user">
    <van-nav-bar left-text="返回" left-arrow border fixed z-index="50" placeholder @click-left="clickLeft()"/>

    <van-tabs type="card" color="#7EB6FF" v-model="tab_mark" animated swipeable>
      <!--  <template #nav-left> <div>nihk你好</div> </template>-->
      <van-tab v-for="item in main_nav" :key="item.id" :title="item.title" :badge="item.badge">
        <template v-if="item.id==0"><company/></template>
        <template v-else-if="item.id==1"><free/></template>
        <template v-else="item.id==2"><coop/></template>
      </van-tab>
    </van-tabs>

  </div>
</template>

<script>
import Company from "views/check/cpns/Company"
import Free from "views/check/cpns/Free"
import Coop from "views/check/cpns/Coop"

import {getHomeMultidata, getUserMain} from "@/network/check";

export default {
  name: "User",
  components: {
    Company,
    Coop,
    Free,
  },
  data() {
    return {
      user_main: null,   // 保存主界面的数据
      tab_mark: null,   // nav标签 标识符
      main_nav: [
        {
          id: 0,
          title: '单位用户',
          badge: 2,
        },
        {
          id: 1,
          title: '业者用户',
          badge: 7,
        },{
          id: 2,
          title: '合作伙伴',
          badge: 4,
        },
      ],
    }
  },
  methods: {

  },
  created() {
    // 获取用户管理主界面数据
    // getUserMain(2).then( res => {
    //   console.log(res)
    //   this.user_main = res
    // })
    // getHomeMultidata().then( res => {
    //   console.log(res)
    //   this.user_main = res
    // })
  }
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
  }


}
</style>