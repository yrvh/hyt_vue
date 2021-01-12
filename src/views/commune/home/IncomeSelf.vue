<template>
  <div class="income">
    <van-nav-bar left-text="返回" title="收入管理" left-arrow border fixed z-index="50" placeholder @click-left="onBack"/>

    <van-cell v-for="item in income_arr" :key="item.id" :title="item.title"
                  :value="item.value" :value-class="(item.isright_css && item.value>0)? 'right-css':''"
                  is-link :to="{path: '/check_incomethirdlist', query: {in_title: item.title, in_status: item.status }}"/>

  </div>
</template>

<script>
import { Test } from "@/network/commune";
import {SETMK} from '@/store/mutype'

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
      tab_mark: 0,   // nav标签 标识符
      income_arr: [   // 收入查询(自己)
        {
          id: 0,
          title: '待确认',
          value: '',
          status: 1,
          isright_css: false
        },
        {
          id: 1,
          title: '退回',
          value: '',
          status: 3,
          isright_css: false
        },
        {
          id: 2,
          title: '待秘书公司确认',
          value: '',
          status: 2,
          isright_css: false
        },
        {
          id: 3,
          title: '秘书公司退回',
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
          isright_css: true
        },
        {
          id: 6,
          title: '用户已收款',
          value: '',
          status: 8,
          isright_css: false
        }
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
  computed: {
  },
  created() {
    this.tab_mark = this.$store.state.main.nav_mark   // 进入时默认的 nav

    // 获取用户管理主界面数据
    this.obj.pass_app = this.$store.state.login.password
    this.obj.tel_app = this.$store.state.login.tel
    this.obj.code_app = this.$store.state.login.code_app
    this.obj.tel_sid = this.$store.state.login.sid

    Test.then( res => {
      // 网络请求回来的数据
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
