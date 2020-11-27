<template>
  <div class="detail-contract">
    <van-nav-bar title="相关协议(3)" left-text="返回" left-arrow border
                 fixed placeholder z-index="50" @click-left="clickLeft()"></van-nav-bar>
      <van-cell v-for="(item,index) in contract_list" :key="index" :value="item.type" is-link @click="onContract(item.id,item.name)"/>
    <div class="container" v-if="type==1 && show_text">
      <van-nav-bar title="协议详情" left-text="返回" left-arrow border
                   fixed placeholder z-index="150" @click-left="show_text=false">
      </van-nav-bar>
        <!--      <div class="contract-title">{{name}}</div>-->
      <div class="contract-content" v-html="text"></div>
    </div>

    <div class="footer" v-show="in_status==1 || in_status==7">
      <van-button text="退回" color="#bbbbbb" :disabled="backdis"  size="large"
              loading-text="退回中..." @click="onBack"></van-button>
      <van-button text="确认" color="#7EB6FF" :loading="comfirming" size="large"
              loading-text="提交中..." @click="onComfirm"></van-button>
    </div>  

    <!-- 退回原因的弹出层 -->
    <van-popup v-model="backpop" overlay position="center" duration="0.3"
                lock-scroll close-on-popstate closeable>
      <div class="content-back">
        <van-field v-model="reason" label="退回原因" placeholder="请输入退回原因"
                  required clearable clear-trigger="always" name="reason"/>
        <van-button text="确认退回" color="#7EB6FF" :loading="cfmbacking" block
                    loading-text="退回中..." @click="onCfmBack"></van-button>
      </div>
    </van-popup>

  </div>
</template>

<script>
import {getUserDetailContract, getUserDetailContent, passUser, nopassUser} from "network/check";

export default {
  name: "DetailContract",
  data() {
    return {
      backdis: false,   // 退回按钮禁用
      comfirming: false,   // 提交中...
      backpop: false,   // 弹出编辑 退回原因的窗口
      cfmbacking: false,   // 退回中...
      reason: '',   // 填写退回原因

      id: '',   // 具体每一个协议的id
      name: '',   // 协议的文件名字
      type: 2,   // 协议类型   1文本   2图片
      text: '',   // 文本
      show_text: false,   // 是否显示协议文本
      cfm_contract: false,   // 是否查看了协议
      imgUrls: [],   // 图片类型的协议

      contract_list: [],   // 协议列表
      in_status: null,   // 进入时的状态值
      obj: {
        pass_app: '',
        tel_app: '',
        code_app: '',
        userid: '',   // 请求协议列表时的用户id
      }
    }
  },
  methods: {
    onContract(id,name) {   // 点击进入 协议详情
      this.cfm_contract = true   // 确认查看了协议
      getUserDetailContent({...this.obj,id}).then(res => {
        this.type = res.type
        this.name = name
        if(res.type==2) {
          this.imgUrls = res.imgUrls.split(",")
          this.$imagePreview({
            images: this.imgUrls,
            closeable: true
          })
        }
        else if(res.type==1) {
          this.show_text = true
          this.text = res.text
        }
      })
    },
      onBack() {   // 点击了 退回
      this.backpop = true
    },
    onCfmBack() {   // 提交了 退回原因
      if(this.reason != '') {   // 退回原因 不能为空
        this.cfmbacking = true   // 退回中...
        nopassUser({...this.obj, contents: this.reason}).then( res => {        
          if(res.result==1) {
            this.$toast.success(res.message)
            setTimeout(() => {
              this.clickLeft()
            }, 1000)
          }
          else if(res.result==0) {
            this.$toast.fail(res.message)
            this.cfmbacking = false   // 取消 提交退回中
          }
        })
      }
      else {
        this.$toast.fail('请输入退回原因!')
      }
    },
    onComfirm() {   // 点击了 确认
      if(this.cfm_deal || this.detail.imgs_size ==0) {   // 协议已经查看完毕
        this.comfirming = true   // 确认中...
        this.backdis = true   // 禁用退回按钮...
        passUser(this.obj).then( res => {        
          if(res.result==1) {
            this.$toast.success(res.message)
            setTimeout(() => {
              this.clickLeft()
            }, 1000)
          }
          else if(res.result==0) {
            this.$toast.fail(res.message)
            this.comfirming = false   // 取消 确认中
            this.backdis = false   // 取消 退回禁用
          }
        })
      }
      else {
        this.$toast.fail('请阅读协议内容!')
      }
    },
  },
  computed: {
  },
  created() {
    console.log("created被执行了");
    this.obj.pass_app = this.$store.state.login.password
    this.obj.tel_app = this.$store.state.login.tel
    this.obj.code_app = this.$store.state.login.code_app

    this.obj.userid = this.$route.query.id
    this.in_status = this.$route.query.in_status
    getUserDetailContract(this.obj).then( res => {  // 获取协议列表
      this.contract_list = res
      this.contract_list.forEach((item,i) => {
        if(item.type==1) item.type = "服务平台协议"
        else if(item.type==3) item.type = "单位与商秘公司协议"
        else if(item.type==5) item.type = "业者与商秘公司协议"
        else if(item.type==11) item.type = "合作伙伴与商秘公司协议"
      })
    })
  },
  // activated() {
  //   this.userid = this.$route.query.id
  //   let userid = this.userid
  //   getUserDetailContract({...this.obj,userid}).then( res => {
  //     this.contract_list = res
  //     this.contract_list.forEach((item,i) => {
  //       if(item.type==1) item.type = "服务平台协议"
  //       else if(item.type==3) item.type = "单位与商秘公司协议"
  //       else if(item.type==5) item.type = "业者与商秘公司协议"
  //       else if(item.type==11) item.type = "合作伙伴与商秘公司协议"
  //     })
  //   })
  // }
}
</script>

<style scoped lang="scss">
.detail-contract {
  .reg-status{
    margin-top: 10px; font-size: 18px;
  }
  .reasons { margin-top: 10px;}
  .footer { 
    position: fixed; bottom: 0; left: 0; right: 0; z-index: 50;
    display: flex; justify-content: space-between;
  }
  .content-back {
    background-color: #f7f7fe;
    width: 300px;
    padding: 50px 10px 10px 10px;
    border-radius: 10px;
    .van-button {
      margin-top: 50px;
    }
  }

  .container {
    background-color: #fff;
    overflow: scroll;
    height: 100vh;
    padding: 0 15px 50px;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 100;
    .contract-content {
      padding-top: 30px;
    }
  }
}
</style>
