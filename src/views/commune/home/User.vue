<template>
  <div class="user">
    <van-nav-bar left-text="返回" left-arrow border fixed z-index="50" placeholder @click-left="onBack"/>
    
    <van-cell v-for="item in user_arr" :key="item.id" :title="item.title"
                  :value="item.value" :value-class="(item.isright_css && item.value>0)? 'right-css':''"
                  is-link :to="{path: '/check_freelist', query: {in_title: item.title, in_status: item.status }}"/>

  </div>
</template>

<script>
import { getUserMain } from "@/network/check";
import {SETMK} from '@/store/mutype'

export default {
  name: "User",
  components: {
  },
  data() {
    return {
      obj: {
        pass_app: '',
        code_app: '',
        tel_app: '',
        tel_sid: '',   // 用户id
      },

      tab_mark: 0,   // nav标签 标识符
      user_arr: [   // 用户各状态数据 ( 根据自己的)
        {
          id: 0,
          title: '待主管审核',
          value: '',
          status: 7,
          isright_css: true
        },
        {
          id: 1,
          title: '主管退回',
          value: '',
          status: 3,
        },
        {
          id: 2,
          title: '待确认',
          value: '',
          status: 4,
        },
        {
          id: 3,
          title: '已退回',
          value: '',
          status: 44,
        },
        {
          id: 4,
          title: '服务中',
          value: '',
          status: 2,
        },
      ],


    }
  },
  methods: {
    onBack() {   // 左键返回时,把nav_mark重置为0
      this.$store.commit(SETMK, 0)
      this.clickLeft()
    },
    onChange() {   // 当tabs 发生改变时,切换
      this.$store.commit(SETMK, this.tab_mark)   // 切换时设置当前的nav_mark = tab_mark
    },
  },
  created() {
    this.tab_mark = this.$store.state.main.nav_mark   // 进入时默认的 nav
    
    this.obj.pass_app = this.$store.state.login.password
    this.obj.tel_app = this.$store.state.login.tel
    this.obj.code_app = this.$store.state.login.code_app
    this.obj.tel_sid = this.$store.state.login.sid

    this.$axios.all([
      getUserMain({...this.obj,usertype: 2, hhrtype: 0, yztype: '0,9'}),
      getUserMain({...this.obj,usertype: 1, hhrtype: 0, yztype: '0,1'}),
      getUserMain({...this.obj,usertype: 11, hhrtype: 1, yztype: 0}),
      getUserMain({...this.obj,usertype: 11, hhrtype: '2,3', yztype: 0}),
      getUserMain({...this.obj,usertype: 1, hhrtype: 0, yztype: 2}),
      getUserMain({...this.obj,usertype: 1, hhrtype: 0, yztype: 3}),
    ]).then(this.$axios.spread((res1,res2,res3,res4,res5,res6) => {
        if(res1.result == 1) this.com_arr[0].value = res1.dw_1
        if(res2.result == 1) this.user_arr[0].value = res2.yz_7
        if(res3.result == 1) this.coop_arr[0].value = res3.hhr_gr_7
        if(res4.result == 1) this.coopcom_arr[0].value = res4.dw_1
        if(res5.result == 1) this.frontier_arr[4].value = res5.bm_7
        if(res6.result == 1) this.third_arr[3].value = res6.bm_7
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
