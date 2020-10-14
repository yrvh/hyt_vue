<template>
  <div class="detail-account">
    <van-nav-bar title="公司账户信息(2)" left-text="返回" right-text="下一页"
                 left-arrow border fixed placeholder z-index="50"
                 @click-right="handleNext" @click-left="clickLeft()"></van-nav-bar>

    <van-cell class="reg-status" title="【注册状态】" :value="regState"></van-cell>
    <van-cell-group title="账户信息" v-for="(item,index) in yhcards" :key="index">
      <van-cell title="开户行" :value="item[0]" />
      <van-cell title="开户名" :value="item[2]" />
      <van-cell title="帐号" :value="item[1]" />
    </van-cell-group>

  </div>
</template>

<script>
import {getUserDetailCom} from "network/check";

export default {
  name: "DetailAccount",
  data() {
    return {
      yhcards: [],   // 联系人详情信息
      regState: '',
      param: {
        pass_app: '',
        tel_app: '',
        code_app: '',
        id: '',
      }
    }
  },
  methods: {
    handleNext() {
      this.$router.push({
        path: '/checkhome_ud_contract',
        query: {
          id: this.param.id
        }
      })
    },
    onPhoto(link) {
      this.$imagePreview({
        images: link,
        closeable: true
      })
    }
  },
  created() {
    this.param.pass_app = this.$store.state.login.password
    this.param.tel_app = this.$store.state.login.tel
    this.param.code_app = this.$store.state.login.code_app
  },
  activated() {
    this.param.id = this.$route.query.id
    getUserDetailCom(this.param).then( res => {
      this.regState = res.regState
      this.yhcards = []
      res.yhcards.split(";").forEach((item,index) => {
        this.yhcards.push( item.split("|") )
      })
    })
  }
}
</script>

<style scoped lang="scss">
.detail-account {
  .reg-status{
    margin-top: 10px; font-size: 18px;
  }
}
</style>
