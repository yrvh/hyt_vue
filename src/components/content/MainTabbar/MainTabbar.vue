<template>
  <tabbar>
    <tabbar-item :path="thePath[0]" active_color="#7EB6FF">
      <img slot="item-icon" :src="require('assets/img/tabbar/home.png')" alt="">
      <img slot="item-icon-active" :src="require('assets/img/tabbar/home1.png')" alt="">
      <div slot="item-text">首页</div>
    </tabbar-item>
    <tabbar-item :path="thePath[1]" active_color="#7EB6FF">
      <img slot="item-icon" :src="require('assets/img/tabbar/message.png')" alt="">
      <img slot="item-icon-active" :src="require('assets/img/tabbar/message1.png')" alt="">
      <div slot="item-text">消息</div>
    </tabbar-item>
    <tabbar-item :path="thePath[2]" active_color="#7EB6FF">
      <img slot="item-icon" :src="require('assets/img/tabbar/mine.png')" alt="">
      <img slot="item-icon-active" :src="require('assets/img/tabbar/mine1.png')" alt="">
      <div slot="item-text">我的</div>
    </tabbar-item>
  </tabbar>
</template>

<script>
import Tabbar from "@/components/common/Tabbar/Tabbar";
import TabbarItem from "@/components/common/Tabbar/TabbarItem";

export default {
  name: "MainTabbar",
  components: {
    Tabbar,
    TabbarItem
  },
  data() {
    return {   // tabbar的跳转路径
      userType: 1,   // 用户类型
      type: 1,   // 是否单位
      hhrtype: 1, // 合伙人类型
      poststatus: 1,   // 商秘公司员工 类型
      path: []
    }
  },
  computed: {
    thePath() {
      if(this.userType==4 && this.poststatus==1){
        this.path = ['/main/checkhome','/main/checkmessage','/main/checkmine']
        return this.path
      }
      else if(this.userType==4 && this.poststatus==4) {
        this.path = ['/main/managerhome','/main/managermessage','/main/managermine']
        return this.path
      }
      else if(this.userType==1 && this.type==0) {
        console.log("打印量");
        this.path = ['/main/freehome','/main/freemessage','/main/freemine']
        return this.path
      }
      else if(this.userType==1 && this.type==1) {
        this.path = ['/main/freecomhome','/main/freecommessage','/main/freecommine']
        return this.path
      }

      else if(this.userType==11 && this.hhrtype==1) {
        this.path = ['/main/coophome','/main/coopmessage','/main/coopmine']
        return this.path
      }
      else if(this.userType==11 && this.hhrtype==2) {
        this.path = ['/main/coopcomhome','/main/coopcommessage','/main/coopcommine']
        return this.path
      }

      else if(this.userType==2) {
        this.path = ['/main/companyhome','/main/companymessage','/main/companymine']
        return this.path
      }
      else {
        this.path = ['/login','/login','/login']
        return this.path
      }
    }
  },
  created() {
    this.userType = this.$store.state.login.userType
    this.type = this.$store.state.login.ishave_dw
    this.hhrtype = this.$store.state.login.hhrtype
    this.poststatus = this.$store.state.login.poststatus
  }
}
</script>

<style scoped>

</style>
