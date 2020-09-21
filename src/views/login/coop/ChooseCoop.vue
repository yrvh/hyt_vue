<template>
  <div class="coop">
    <van-nav-bar left-text="返回" title="选择开票方式" left-arrow border fixed z-index="50" placeholder @click-left="clickLeft()"/>
    <div class="content">
      <div class="regcom" @click="handleImg('/regcoopcom')">
        <span>注册到接受服务的单位</span>
        <span class="remark">(由接受服务的单位 录入开发票信息)</span>
      </div>
      <div class="regcustom" @click="handleImg('/regcoop')">
        <span>自行录入开发票信息</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Choosecoop",
  data(){
    return {
      img_arr: [
        {
          id: 0,
          imgurl: require('assets/img/login/free.png'),
          path: '/choose_free'
        },
        {
          id: 1,
          imgurl: require('assets/img/login/company.png'),
          path: '/choose_company'
        },
        {
          id: 2,
          imgurl: require('assets/img/login/coop.jpg'),
          path: '/choose_coop'
        }
      ]
    }
  },
  methods: {
    handleImg(path) {
      console.log("nih点击了图片")
      this.$router.push(path)
    }
  },
  created() {

  }
}
</script>

<style scoped lang="scss">
.coop{
  padding: 0 20px;
  height: 100vh;
  background-color: var(--cl-bg-tF);
  .content {
    margin-top: 80px;
    div {
      width: 100%; height: 120px; border-radius: 4px; margin-bottom: 30px;
      color: #fff; font-size: 18px;
      display: flex; flex-direction: column; justify-content: center; align-items: center;
    }
    .regcom {background-color: var(--cl-bg-theme);}
    .regcustom{background-color: var(--cl-bg-yel);}
    .remark {font-size: 12px;}
  }
}
</style>