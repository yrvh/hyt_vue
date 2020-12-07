<template>
  <div class="audit">
    <van-nav-bar title="资料审核中" border fixed placeholder z-index="50"></van-nav-bar>
    <div class="image-box">
      <van-image width="100%" :src="require('assets/img/login/audit.jpg')"></van-image>
    </div>
    <van-steps :active="active" active-icon="checked" active-color="#7EB6FF">
      <van-step>信息审核中</van-step>
      <van-step>完善资料中</van-step>
      <van-step>确认信息</van-step>
    </van-steps>

    <van-button v-if="is_show" size="small" text="前去确认资料信息" color="#7EB6FF" block
                replace :to="{path: '/cfm_personal'}"></van-button>

    <div class="content">
      <div>需要提供材料:</div>
      <span> 1.本人身份证原件</span>
      <span> 2.授权委托协议书签字</span>
      <span> 3.本人收款账户信息（开户机构、开户名、账号）</span>
      <div class="address">邮寄地址:</div>
      <span> 广西北海市海城区, 西藏路高新技术创业园 3号楼121室，</span>
      <span> 0779-3919890。</span>
    </div>
  </div>
</template>

<script>
import {getStatus, getInfo, getPass, getNopass} from "network/login";

export default {
  name: "Audit",
  data(){
    return {
      is_show: false,   // 是否隐藏 进入下一状态的按钮,
      active: 0,   // 当前步骤条
      status: null,   // 当前状态值
      obj: {
        tel_app: '',
        pass_app: '',
        code_app: '',
        tel_sid: '',   // 用户id
      },
    }
  },
  methods: {
    handleNext() {
      // 点击完成
      // 返回到上一页
      this.$router.replace('/reg_personal')
    },
    showStatus() {
      if([2,5,7].includes(this.status)){   // 正在审核中
        this.active = 0
      }
      else if([3,77,44,33].includes(this.status)) {   // 完善资料中
        this.active = 1
      }
      else if(this.status==4) {   // 待用户确认信息
        this.active = 2
        this.is_show = true
      }
    }
  },
  computed: {
    
  },
  created() {
    this.obj.pass_app = this.$store.state.login.password
    this.obj.tel_app = this.$store.state.login.tel
    this.obj.code_app = this.$store.state.login.code_app
    // if(this.obj.code_app && this.obj.tel_app && this.obj.pass_app) {}   // 首次注册,重新请求登录接口,日后完善
    getStatus(this.obj).then( res => {
      if(res.result == 0) {
        this.$toast({
          type: "fail",
          position: "middle",
          message: res.message,
          duration: 4000,
        })
      }
      else if(res.result == 1) {
        this.status = res.code
        this.showStatus()
      }
    })

    // 网络请求协议内容
  }
}
</script>

<style scoped lang="scss">
.audit{
  padding: 0 20px;
  height: 100vh;
  background-color: var(--cl-bg-tF);
  .image-box { width: 70%; margin: 40px auto 0; margin-bottom: 30px;}

  .van-button {margin-top: 10px;}

  .content {
    font-size: 14px;
    margin-top: 40px;
    display: flex; flex-direction: column;
    .address {margin-top: 20px;}
    span {text-indent: 10px;}
  }
}
</style>
