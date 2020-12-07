<template>
  <div class="detail-company">
    <van-nav-bar title="公司信息(1)" left-text="返回" right-text="下一页"
                 left-arrow border fixed placeholder z-index="50"
                 @click-right="handleNext" @click-left="clickLeft()"></van-nav-bar>

    <van-cell class="reg-status" title="【注册状态】" :value="detail.regState"></van-cell>
    <van-cell-group title="公司基本信息">
      <van-cell title="公司商标" is-link border center @click="onPhoto([detail.icon])" >
        <template #default>
          <van-image height="30px" width="30px" :src="detail.icon"></van-image>
        </template>
      </van-cell>
      <van-cell title="统一社会信用代码" :value="detail.xycode" />
      <van-cell title="单位名称" :value="detail.name" />
      <van-cell title="单位名称缩写" :value="detail.namePY" />
      <van-cell title="注册资本(万)" :value="detail.capital" />
      <van-cell title="单位类型" :value="detail.dwtypename" />
      <van-cell title="住所" :value="detail.area" />
      <van-cell title="详细地址" :value="detail.address" />
      <van-cell title="固定电话" :value="detail.tel" />
      <van-cell title="成立日期" :value="detail.createtime" />
      <van-cell title="经营期限" :value="detail.endtime" />
      <van-cell title="业务范围" :value="detail.businessRange" />
      <van-cell title="主营业务" :value="detail.zybusiness" />
      <van-cell title="登记机关" :value="detail.registerCompany" />
      <van-cell title="发证日期" :value="detail.getCarTime" />
      <van-cell title="营业执照" is-link border center @click="onPhoto([detail.yyzzurl])" :value="upCerti"/>

    </van-cell-group>
    <van-cell-group title="法定代表人信息">
      <van-cell title="法定代表人姓名" :value="detail.fr_realname" />
      <van-cell title="证件类型" value="身份证" />
      <van-cell title="证件号码" :value="detail.fr_idcard" />
      <van-cell title="证件照片" is-link border center @click="onPhoto([detail.fr_cardupurl,detail.fr_carddownurl])" :value="upPhotoFr" />
      <van-cell title="手机号码" :value="detail.fr_tel" />
      <van-cell title="电子邮箱" :value="detail.fr_email" />
    </van-cell-group>
    <van-cell-group v-if="detail.ishave_lxr" title="联系人信息">
      <van-cell title="联系人姓名" :value="detail.lxr_realname" />
      <van-cell title="证件类型" value="身份证" />
      <van-cell title="证件号码" :value="detail.lxr_idcard" />
      <van-cell title="证件照片" is-link border center @click="onPhoto([detail.lxr_cardupurl,detail.lxr_carddownurl])"  :value="upPhotoLxr"/>
      <van-cell title="手机号码" :value="detail.lxr_tel" />
      <van-cell title="电子邮箱" :value="detail.lxr_email" />
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
        path: '/check_ud_account',
        query: {
          id: this.param.id,
          in_status: this.$route.query.in_status
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
  computed: {
    upPhotoFr() {   // 是否上传了照片
      if(this.detail.fr_cardupurl && this.detail.fr_carddownurl) return '已上传'
      else return '未上传'
    },
    upPhotoLxr() {   // 是否上传了照片
      if(this.detail.lxr_cardupurl && this.detail.lxr_carddownurl) return '已上传'
      else return '未上传'
    },
    upCerti() {   // 是否上传了营业执照
      if(this.detail.yyzzurl) return '已上传'
      else return '未上传'
    },
  },
  created() {
    this.param.pass_app = this.$store.state.login.password
    this.param.tel_app = this.$store.state.login.tel
    this.param.code_app = this.$store.state.login.code_app
    this.obj.tel_sid = this.$store.state.login.tel_sid

    this.param.id = this.$route.query.id
    getUserDetailCom(this.param).then( res => {  // 单位详细信息
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
.detail-company {
  padding-bottom: 35px;
  .reg-status{
    margin-top: 10px; font-size: 18px;
  }

}
</style>
