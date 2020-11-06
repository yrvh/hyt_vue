<template>
  <div class="income-detail">
    <van-nav-bar title="公司信息(1)" left-text="返回" right-text="下一页"
                 left-arrow border fixed placeholder z-index="50"
                 @click-right="handleNext" @click-left="clickLeft()"></van-nav-bar>

    <van-cell class="reg-status" title="【注册状态】" :value="detail.regState"></van-cell>
    <van-cell-group title="服务项目信息">
      <van-cell title="项目名称" :value="detail.xycode" />
      <van-cell title="服务内容" :value="detail.name" />
      <van-cell title="服务周期" :value="detail.namePY" />
      <van-cell title="付款方姓名" :value="detail.capital" />
      <van-cell title="付款账号" :value="detail.dwtypename" />
      <van-cell title="收款方商户名" :value="detail.area" />
      <van-cell title="收款方账号" :value="detail.address" />
      <van-cell title="付款金额" :value="detail.tel" />
    </van-cell-group>
    <van-cell-group title="收款方信息">
      <van-cell title="收款人" :value="detail.xycode" />
      <van-cell title="收款账号" :value="detail.name" />
      <van-cell title="税后净收入" :value="detail.namePY" />
    </van-cell-group>

  </div>
</template>

<script>
import {getUserDetailCom} from "network/check";

export default {
  name: "DetailCompany",
  data() {
    return {
      detail: {
        icon: require('assets/img/login/logo_com.png'),
      },   // 联系人详情信息
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
        path: '/checkhome_ud_account',
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

    this.param.id = this.$route.query.id
    getUserDetailCom(this.param).then( res => {
      this.detail = res
    })
  },
  // activated() {
  //   this.param.id = this.$route.query.id
  //   getUserDetailCom(this.param).then( res => {
  //     this.detail = res
  //   })
  // }
}
</script>

<style scoped lang="scss">
.income-detail {
  .reg-status{
    margin-top: 10px; font-size: 18px;
  }
}
</style>
