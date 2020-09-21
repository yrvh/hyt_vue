<template>
  <div id="main">
    这是登录之后的首界面
    <keep-alive>
      <router-view/>
    </keep-alive>

    <main-tabbar></main-tabbar>
  </div>
</template>

<script>
import MainTabbar from "@/components/content/MainTabbar/MainTabbar";

export default {
  name: 'Main',
  components: {
    MainTabbar
  }
}
</script>

<style>

#main {
  height: 100vh;
  background-color: var(--cl-bg-tF8);
  padding-bottom: 50px;
}
</style>
