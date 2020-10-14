<template>
  <div class="detail-content">
    <van-nav-bar title="协议详情" left-text="返回" left-arrow border
                 fixed placeholder z-index="50" @click-left="clickLeft()"></van-nav-bar>

    <div class="contract-title">{{name}}</div>
    <div v-if="type==2"></div>
    <div v-else v-html="text"></div>
  </div>
</template>

<script>
import {getUserDetailContent} from "network/check";

export default {
  name: "DetailContent",
  data() {
    return {
      contract_list: [],   // 联系人详情信息
      name: '',   // 协议的文件名字
      type: 2,   // 协议类型   1文本   2图片
      text: '',   // 文本
      imgUrls: '',   // 图片类型的协议
      param: {
        pass_app: '',
        tel_app: '',
        code_app: '',
        id: '',
      }
    }
  },
  methods: {
  },
  computed: {
  },
  created() {
    this.param.pass_app = this.$store.state.login.password
    this.param.tel_app = this.$store.state.login.tel
    this.param.code_app = this.$store.state.login.code_app
    this.param.id = this.$route.query.id
    this.name = this.$route


  },
  activated() {
    getUserDetailContent(this.param).then( res => {
      this.contract_list = res
    })
  }
}
</script>

<style scoped lang="scss">
.detail-content {
  .contract-title{
    margin-top: 10px; font-size: 18px;
  }
}
</style>
