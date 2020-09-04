<template>
  <tabbar>
    <tabbar-item path="/home" active_color="#7EB6FF">
      <img slot="item-icon" src="~assets/img/tabbar/home.png" alt="">
      <img slot="item-icon-active" src="~assets/img/tabbar/home1.png" alt="">
      <div slot="item-text">首页</div>
    </tabbar-item>
    <tabbar-item path="/message" active_color="#7EB6FF">
      <img slot="item-icon" src="~assets/img/tabbar/message.png" alt="">
      <img slot="item-icon-active" src="~assets/img/tabbar/message1.png" alt="">
      <div slot="item-text">消息</div>
    </tabbar-item>
    <tabbar-item path="/mine" active_color="#7EB6FF">
      <img slot="item-icon" src="~assets/img/tabbar/mine.png" alt="">
      <img slot="item-icon-active" src="~assets/img/tabbar/mine1.png" alt="">
      <div slot="item-text">我的</div>
    </tabbar-item>
  </tabbar>
</template>

<script>
import Tabbar from "@/components/common/Tabbar/Tabbar";
import TabbarItem from "@/components/common/TabbarItem/TabbarItem";

export default {
  name: "MainTabbar",
  components: {
    Tabbar,
    TabbarItem
  }
}
</script>

<style scoped>

</style>
