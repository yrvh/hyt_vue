<template>
  <div class="upidcard">
    <van-nav-bar title="查看图片" left-text="返回" left-arrow border fixed placeholder
                 z-index="50" @click-left="clickLeft()"></van-nav-bar>

    <template v-if="income_status=='logo'">
      <div class="info-title">公司logo</div>
      <div class="content">
        <van-image height="200px" width="220px" :src="img_logo"></van-image>
      </div>
    </template>

    <template v-else-if="income_status=='license'"> 
      <div class="info-title">营业执照</div>
      <div class="content">
        <van-image height="200px" width="100%" :src="img_license"></van-image>
      </div>
    </template>

    <template v-else>
      <div class="info-title">拍摄/上传您的二代身份证</div>
      <div class="content">
        <van-image height="200px" width="100%" :src="img_card"></van-image>
        <van-image height="200px" width="100%" :src="img_card2"></van-image>
      </div>
    </template>

  </div>
</template>

<script>

export default {
  name: "UpIdcard",
  data(){
    return {
      income_status: '',   // 进入的状态值
      img_logo: require('assets/img/login/logo_def.png'),
      img_license: require('assets/img/login/license.png'),
      img_card: require('assets/img/login/idcard.png'),
      img_card2: require('assets/img/login/idcard2.png')
    }
  },
  methods: {
  },
  created() {
    this.income_status = this.$route.query.status
    if(income_status=='logo') this.img_logo = this.$route.query.link
    if(income_status=='license') this.img_license = this.$route.query.link
    else {
      this.img_card = this.$route.query.link
      this.img_card2 = this.$route.query.link2
    }

    console.log(this.income_status)
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
    background-color: #ee3333;
    display: flex; flex-direction: column; align-items: center;
    .van-image {
      margin-bottom: 15px;
    }
  }
}
</style>
