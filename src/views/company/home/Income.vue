<template>
  <div class="user">
    <van-nav-bar left-text="返回" left-arrow border fixed z-index="50" placeholder @click-left="clickLeft()"/>
    <van-tabs type="card" color="#7EB6FF" v-model="tab_mark" animated swipeable>
      <!--     已录入       -->
      <van-tab title="已录入" :badge="already_arr[0].value==0? '':already_arr[0].value">

        <van-cell v-for="item in already_arr" :key="item.id" :title="item.title"
                  :value="item.value" :value-class="(item.isright_css && item.value>0)? 'right-css':''"
                  is-link :to="{path: '/company_registerlist', query: {in_title: item.title, in_status: item.status}}"/>
      </van-tab>

      <!--     未录入    -->
      <van-tab title="未录入" :badge="wait_arr[0].value==0? '':wait_arr[0].value">

        <van-cell v-for="item in wait_arr" :key="item.id" :title="item.title"
                  :value="item.value" :value-class="(item.isright_css && item.value>0)? 'right-css':''"
                  is-link :to="{path: '/company_servelist', query: {in_title: item.title, in_status: item.status}}"/>
      </van-tab>

    </van-tabs>

  </div>
</template>

<script>
// 这个gerUserMain 是示例, 到时根据自己定义的 网络请求函数 去获取相应的数据
import { getUserMain } from "@/network/company";

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

      tab_mark: null,   // nav标签 标识符
      already_arr: [
        {
          id: 0,
          title: '待提交',
          value: '',
          status: 0,
          isright_css: true
        },
        {
          id: 6,
          title: '待业者确认',
          value: '',
          status: 0,
          isright_css: true
        },
        {
          id: 7,
          title: '业者退回',
          value: '',
          status: 0,
          isright_css: true
        },
        {
          id: 1,
          title: '待商秘公司审核',
          value: '',
          status: 2,
          isright_css: false
        },
        {
          id: 2,
          title: '秘书公司退回',
          value: '',
          status: 5,
          isright_css: false
        },
        {
          id: 3,
          title: '待发起支付',
          value: '',
          status: 6,
          isright_css: false
        },
        {
          id: 4,
          title: '待支付',
          value: '',
          status: 7,
          isright_css: false
        },
        {
          id: 5,
          title: '用户已收款',
          value: '',
          status: 8,
          isright_css: false
        }
      ],
      wait_arr: [   // 增加服务人员 主界面数据
        {
          id: 0,
          title: '未录入的人员',
          value: '',
          status: 0,
          isright_css: false
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
      getUserMain({...this.obj}),
      getUserMain({...this.obj}),
    ]).then(this.$axios.spread((res1,res2) => {
      // 1.对要操作的状态,进行数据回显
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


