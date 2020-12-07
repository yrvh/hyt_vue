<template>
  <div class="review-contract">
    <van-nav-bar :title="cname" left-text="返回" left-arrow border
                 fixed placeholder z-index="50" @click-left="clickLeft()"></van-nav-bar>
    <!-- <div class="contract-title">{{name}}</div> -->
    <div class="contract" v-if="cid==1" v-html="detail.xy_pt"></div>
    <div class="contract" v-else-if="cid==2" v-html="detail.text_ms"></div>
  </div>
</template>

<script>
import {getPerson} from 'network/free'

export default {
  name: "ReviewContract",
  data() {
    return {
      cname: '协议详情',   // 协议名
      obj: {
        pass_app: '',
        tel_app: '',
        code_app: '',
        tel_sid: '',   // 用户id
      },
      cid: '',   // 1平台协议  2商秘协议     
      detail: '',   // 网络请求回来的,内容
    }
  },
  methods: {
  },
  computed: {
  },
  created() {
    this.cid = this.$route.query.cid
    this.cname = this.$route.query.cname
    
    this.obj.pass_app = this.$store.state.login.password
    this.obj.tel_app = this.$store.state.login.tel
    this.obj.code_app = this.$store.state.login.code_app
    getInfo(this.obj).then( res => {
      this.detail = res
    })
  },
}
</script>

<style scoped lang="scss">
.review-contract {
  .contract-title{
    margin-top: 10px; font-size: 18px;
  }
  .contract {margin-top: 10px;}
}
</style>
