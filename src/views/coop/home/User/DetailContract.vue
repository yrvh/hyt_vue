<template>
  <div class="detail-contract">
    <van-nav-bar title="相关协议(3)" left-text="返回" left-arrow border
                 fixed placeholder z-index="50" @click-left="clickLeft()"></van-nav-bar>
    <template v-for="item in contract_list" >
      <van-cell v-if="item.type!=4" :value="item.type" is-link @click="onContract(item.id,item.name)"/>
    </template>
    <div class="container" v-if="type==1 && show_text">
      <van-nav-bar title="协议详情" left-text="返回" left-arrow border
                   fixed placeholder z-index="150" @click-left="show_text=false">
      </van-nav-bar>
        <!--      <div class="contract-title">{{name}}</div>-->
      <div class="contract-content" v-html="text"></div>
    </div>

  </div>
</template>

<script>
import {getUserDetailContract, getUserDetailContent} from "network/check";

export default {
  name: "DetailContract",
  data() {
    return {
      contract_list: [],   // 联系人详情信息
      userid: '',   // 请求协议列表时的用户id
      id: '',   // 具体每一个协议的id
      name: '',   // 协议的文件名字
      type: 2,   // 协议类型   1文本   2图片
      text: '',   // 文本
      show_text: false,   // 是否显示协议文本
      imgUrls: [],   // 图片类型的协议
      param: {
        pass_app: '',
        tel_app: '',
        code_app: ''
      }
    }
  },
  methods: {
    onContract(id,name) {   // 点击进入 协议详情
      getUserDetailContent({...this.param,id}).then(res => {
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
    }
  },
  computed: {
  },
  created() {
    console.log("created被执行了");
    this.param.pass_app = this.$store.state.login.password
    this.param.tel_app = this.$store.state.login.tel
    this.param.code_app = this.$store.state.login.code_app

    this.userid = this.$route.query.id
    let userid = this.userid
    getUserDetailContract({...this.param,userid}).then( res => {
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
  //   getUserDetailContract({...this.param,userid}).then( res => {
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
