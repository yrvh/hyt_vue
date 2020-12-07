<template>
  <div class="setting">
    <van-nav-bar left-text="返回" left-arrow border fixed z-index="50" :title="in_title" placeholder @click-left="clickLeft()"/>

    <van-cell title="修改密码" is-link :to="{path: '/freecom_editpass'}"/>

    <van-button text="退出登录" color="#ee3344" size="large" @click="del_pop=true"></van-button>
     <!-- 退出的 dialog弹出层 -->
    <van-dialog v-model="del_pop" title="确认退出 ：" width="320px" message="您将退出该系统!" confirm-button-text="退出"
                :show-cancel-button="true" confirm-button-color="#7EB6FF" cancelButtonColor="#666666" 
                close-on-click-overlay @confirm="onLogout" @cancel="del_pop=false"></van-dialog>


  </div>
</template>

<script>
import { logout } from "@/network/freecom";

export default {
  name: "Setting",
  components: {
  },
  data() {
    return {
      del_pop: false,   // 弹出 退出窗口
      in_title: '设置',   // 设置
      obj: {
        tel_app: '',
        pass_app: '',
        code_app: '',
        tel_sid: '',   // 用户id
      },
    }
  },
  methods: {
    onLogout() {   // 提交了 退出命令
      this.del_pop = false   // 隐藏弹出框
      logout(this.obj).then( res => {        
        if(res.result==1) {
          this.$toast.success(res.message)
          setTimeout(() => {
            this.$router.push('/login')
          }, 1000)
        }
        else if(res.result==0) {
          this.$toast.fail(res.message)
        }
      })
    },
  },
  created() {
    this.obj.pass_app = this.$store.state.login.password
    this.obj.tel_app = this.$store.state.login.tel
    this.obj.code_app = this.$store.state.login.code_app
    
    this.in_title = this.$route.query.in_title
  },

}
</script>

<style scoped lang="scss">
.setting {
  .van-nav-bar{
    //background-color: rgba(0,0,100,0.2) !important;
  }
  
  .van-cell { margin-top: 20px; }
  .van-button { margin-top: 40px;}

  
}
</style>
