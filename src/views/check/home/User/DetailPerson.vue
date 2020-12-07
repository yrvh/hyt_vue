<template>
  <div class="detail-person">
    <van-nav-bar title="个人信息及收入(1)" left-text="返回" right-text="下一页"
                 left-arrow border fixed placeholder z-index="50"
                 @click-right="handleNext" @click-left="clickLeft()"></van-nav-bar>

    <van-cell class="reg-status" title="【注册状态】" :value="detail.regState"></van-cell>
    <van-cell-group title="公司基本信息">
      <van-cell title="姓名" :value="detail.realname" />
      <van-cell title="手机号码" :value="detail.tel" />
      <van-cell title="电子邮箱" :value="detail.email" />
      <van-cell title="身份证号码" :value="detail.idcard" />
      <van-cell title="证件照片" is-link border center @click="onPhoto([detail.cardupurl,detail.carddownurl])" :value="upPhotoFr"/>
    </van-cell-group>

    <van-cell-group title="个人账户信息">
      <van-cell title="开户行" :value="detail.khh_sr" />
      <van-cell title="开户名" :value="detail.kh_name_sr" />
      <van-cell title="账号" :value="detail.code_sr" />
    </van-cell-group>

    <van-cell-group title="收入信息">
      <van-cell title="收入范围(元)" :value="detail.monthsy" />
    </van-cell-group>
    <van-cell-group title="纳税信息">
      <van-cell title="核定定额(元)" :value="detail.zzshdde" :label="'增值税('+jntype+')'" />
      <van-cell :title="detail.nstype==1? '核定定额(元)': '核定应税所得率' " :value="detail.nstype==1? detail.gshdde: '' " label="个人所得税"/>
      <van-cell v-if="detail.nstype==2" title="行业类型" :value="detail.hyname"/>
    </van-cell-group>
  </div>
</template>

<script>
import {getUserDetailFree} from "network/check";

export default {
  name: "DetailPerson",
  data() {
    return {
      detail: {},   // 联系人详情信息
      param: {
        pass_app: '',
        tel_app: '',
        code_app: '',
        id: '',
      }
    }
  },
  methods: {
    handleNext() {   // 下一步
      this.$router.push({
        path: '/check_ud_individual',
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
      console.log(this.detail.cardupurl);
      if(this.detail.cardupurl && this.detail.carddownurl) return '已上传'
      else return '未上传'
    },
    jntype() {   // 增值税 缴纳类型
      if(this.detail.zzsjntype==1) return "按月"
      else if(this.detail.zzsjntype==2) return "按季"
      else if(this.detail.zzsjntype==3) return "按年"
    },
  },
  created() {
    this.param.pass_app = this.$store.state.login.password
    this.param.tel_app = this.$store.state.login.tel
    this.param.code_app = this.$store.state.login.code_app
    this.obj.tel_sid = this.$store.state.login.tel_sid

    this.param.id = this.$route.query.id
    getUserDetailFree(this.param).then( res => {
      this.detail = res
    })
  },
  // activated() {
  //   this.param.id = this.$route.query.id
  //   getUserDetailFree(this.param).then( res => {
  //     this.detail = res
  //   })
  // }
}
</script>

<style scoped lang="scss">
.detail-person {
  .reg-status{
    margin-top: 10px; font-size: 18px;
  }
}
</style>
