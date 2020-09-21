<template>
  <div class="secretary">
    <van-nav-bar left-text="返回" title="与商务秘书公司协议" left-arrow border fixed z-index="50" placeholder @click-left="clickLeft()"/>
    <div class="content" v-html="contract"></div>

    <div class="footer">
      <van-button color="#bbb" text="拒绝" size="large" @click="handleRefuse" :disabled="!is_sole"></van-button>
      <van-button type="info" text="同意" size="large" @click="handleAgree" :disabled="!is_sole"></van-button>
    </div>

    <!--  dialog 弹出层  -->
    <van-dialog v-model="show_dialog" title="授权委托协议书:" message="自行下载打印协议书，并必须本人签字，交给选定的商务秘书公司"
                theme="round-button" show-cancel-button confirm-button-text="下载"
                cancel-button-color="#cccccc" confirm-button-color="#7EB6FF"
                close-on-click-overlay get-container=".secretary"></van-dialog>
  </div>
</template>

<script>
import {getSecretary} from "@/network/login";

export default {
  name: "Secretary",
  data(){
    return {
      show_dialog: false,   // 是否显示弹窗
      mult_data: null,   // 请求回来的多项数据
      comid: '',   // 接受服务的id
      contract: null,   // 协议内容
      is_sole: true,   // 协议内容是否浏览完毕
    }
  },
  methods: {
    chuDI() {
      console.log("协议内容触底了")
      this.is_sole = true
    },
    handleRefuse() {   // 点击拒绝
      this.clickLeft()
    },
    handleAgree() {   // 点击同意
      this.show_dialog = true
      console.log("同意了商秘公司协议")
      console.log("下载商秘公司协议")
      console.log("点击下一步,, 进入填写个人信息的页面")
      // this.$router.push('/reg_personal')
    },
  },
  created() {
    // 网络请求协议内容
    let id = window.sessionStorage.getItem('freecom_id')
    getSecretary(id).then( res => {
      if(res.result==1){
        this.mult_data = res
        this.contract = res.xieyi_5
      }
    })
  }
}
</script>

<style scoped lang="scss">
  .secretary{
    width: 100vw;
    height: 100vh;
    padding-bottom: 60px;
    .content {
      width: 100vw;
      height: calc(100vh - 110px);
      overflow: scroll;
      padding: 10px;
    }

    .footer {
      position: fixed;
      left: 0;
      bottom: 5px;
      width: 100vw; margin-top: 20px; display: flex; justify-content: space-around;
      .van-button { width: 40%; color: #fff;}
    }
  }
</style>