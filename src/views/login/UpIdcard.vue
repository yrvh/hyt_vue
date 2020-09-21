<template>
  <div class="upidcard">
    <van-nav-bar title="身份验证" left-text="返回" right-text="确定"
                 left-arrow border fixed placeholder z-index="50"
                 @click-right="handleNext" @click-left="clickLeft()"></van-nav-bar>
    <div class="info-title">拍摄/上传您的二代身份证</div>
    <div class="content">
      <van-uploader v-model="front" name="front" preview-size="220px" max-count="1" :preview-options="{closeable: true}">
        <template #default>
          <van-image height="160px" width="100%" :src="require('assets/img/login/idcard.png')"></van-image>
        </template>
      </van-uploader>

      <van-uploader v-model="behind" name="behind" preview-size="220px" max-count="1" :preview-options="{closeable: true}">
        <template #default>
          <van-image height="160px" width="100%" :src="require('assets/img/login/idcard2.png')"></van-image>
        </template>
      </van-uploader>
    </div>
  </div>
</template>

<script>
export default {
  name: "UpIdcard",
  data(){
    return {
      front: [],   // 身份证正面
      behind: [],   // 身份证反面
    }
  },
  methods: {
    handleNext() {
      // 点击完成
      // 返回到上一页
      this.$router.replace('/reg_personal')
    },
    handleImg(path) {
      this.$router.push(path)
    }
  },
  created() {
    // 网络请求协议内容
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
    display: flex; flex-direction: column; align-items: center;
    .van-uploader {
      margin-bottom: 20px;
      width: 220px;
      height: 160px;
    }
    .van-uploader__preview-image{ height: 160px !important;}
  }
}
</style>