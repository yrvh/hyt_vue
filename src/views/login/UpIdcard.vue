<template>
  <div class="upidcard">
    <van-nav-bar title="上传照片" left-text="返回" right-text="确定"
                 left-arrow border fixed placeholder z-index="50"
                 @click-right="handleNext" @click-left="clickLeft()"></van-nav-bar>

    <template v-if="income_status=='logo'">
      <div class="info-title">拍摄/上传您的公司logo</div>
      <div class="content">
        <van-uploader v-model="logo" :after-read="onRead" name="logo" preview-size="220px" max-count="1" :preview-options="{closeable: true}">
          <template #default>
            <van-image height="150px" width="220px" :src="require('assets/img/login/logo_def.png')"></van-image>
          </template>
        </van-uploader>
      </div>
    </template>

    <template v-else-if="income_status=='license'">
      <div class="info-title">拍摄/上传营业执照</div>
      <div class="content">
        <van-uploader v-model="license" :after-read="onRead" name="license" preview-size="220px" max-count="1" :preview-options="{closeable: true}">
          <template #default>
            <van-image height="150px" width="100%" :src="require('assets/img/login/license.png')"></van-image>
          </template>
        </van-uploader>
      </div>
    </template>

    <template v-else-if="income_status=='card'">
      <div class="info-title">拍摄/上传您的二代身份证</div>
      <div class="content">
        <van-uploader v-model="contactidCardzmupload" :after-read="onRead" name="contactidCardzmupload" preview-size="220px" max-count="1" :preview-options="{closeable: true}">
          <template #default>
            <van-image height="150px" width="100%" :src="require('assets/img/login/idcard.png')"></van-image>
          </template>
        </van-uploader>

        <van-uploader v-model="contactidCardbmupload" :after-read="onReadBack" name="contactidCardbmupload" preview-size="220px" max-count="1" :preview-options="{closeable: true}">
          <template #default>
            <van-image height="150px" width="100%" :src="require('assets/img/login/idcard2.png')"></van-image>
          </template>
        </van-uploader>
      </div>
    </template>

    <template v-else>
      <div class="info-title">拍摄/上传您的二代身份证</div>
      <div class="content">
        <van-uploader v-model="idCardUpUrl" :after-read="onRead" name="idCardUpUrl" preview-size="220px" max-count="1" :preview-options="{closeable: true}">
          <template #default>
            <van-image height="150px" width="100%" :src="require('assets/img/login/idcard.png')"></van-image>
          </template>
        </van-uploader>

        <van-uploader v-model="idCardDownUrl" :after-read="onReadBack" name="idCardDownUrl" preview-size="220px" max-count="1" :preview-options="{closeable: true}">
          <template #default>
            <van-image height="150px" width="100%" :src="require('assets/img/login/idcard2.png')"></van-image>
          </template>
        </van-uploader>
      </div>
    </template>

  </div>
</template>

<script>
import {SETBD, SETCB, SETCF, SETFT, SETLC, SETLG} from "@/store/mutype";

export default {
  name: "UpIdcard",
  data(){
    return {
      income_status: '',   // 进入的状态值
      logo: [],
      license: [],   // 营业执照
      idCardUpUrl: [],   // 身份证正面
      idCardDownUrl: [],   // 身份证反面
      contactidCardzmupload: [],   // 联系人证件正面照片（图片形式
      contactidCardbmupload: [],   // 联系人证件背面照片（图片形式
    }
  },
  methods: {
    handleNext() {   // 点击确定
      switch(this.income_status){
        case 'logo': 
          if(this.logo.length==0) this.$toast.fail("尚未完成")
          else this.clickLeft()
          break;
        case 'license':
          if(this.license.length==0) this.$toast.fail("尚未完成")
          else this.clickLeft()
          break;
        case 'card':
          if(this.contactidCardzmupload.length == 0 || this.contactidCardbmupload.length == 0) this.$toast.fail("尚未完成")
          else this.clickLeft()
          break;
        default: 
          if(this.idCardUpUrl.length==0 || this.idCardDownUrl.length==0) this.$toast.fail("尚未完成")
          else this.clickLeft()
      }
    },
    onRead(file) {   // 选定一张
      switch(this.income_status){
        case 'logo': 
          this.$store.commit(SETLG,file.file);
          break;
        case 'license':
          this.$store.commit(SETLC,file.file);
          break;
        case 'card':
          this.$store.commit(SETCF,file.file);
          break;
        default:
          if(true) this.$store.commit(SETFT,file.file);
      }
    },
    onReadBack(file) {   // 选定背面
      if(this.income_status=='card') this.$store.commit(SETCB,file.file)   // 联系人证件照片反面
      else this.$store.commit(SETBD,file.file)   // 证件照片反面
    }
  },
  created() {
    this.income_status = this.$route.query.status
    console.log(this.income_status)
  },
  activated() {   //  当前页面处于活跃时  执行

  },
  deactivated() {   //  当前页面处于不活跃时  执行

  },
  computed: {

  }
}
</script>

<style scoped lang="scss">
.upidcard{
  padding: 0 20px;
  height: 100vh;
  background-color: var(--cl-bg-tF);
  .info-title {
    line-height: 60px; font-size: 17px; font-weight: 700;
  }
  .content {
    //background-color: #ee3333;
    display: flex; flex-direction: column; align-items: center;
    .van-uploader {
      margin-bottom: 40px;
      width: 220px;
      height: 160px;
    }
    .van-uploader__preview-image{ height: 160px !important;}
  }
}
</style>