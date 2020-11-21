<template>
  <div id="app">
    <keep-alive include="Login,RegPersonal,RegPersonalCoop,RegCominfoCoop,CfmPersonal,
                Secretary">
      <router-view/>
    </keep-alive>
  </div>
</template>

<script>
 import MainTabbar from "@/components/content/MainTabbar/MainTabbar";

 export default {
   name: 'App',
   components: {
     MainTabbar
   }
 }
</script>

<style>
@import "assets/css/base.css";
@import "assets/icon/iconfont.css";

#app {
  min-height: 100vh;
  background-color: var(--cl-bg-tF8);
  /*width: 375px;*/
  /* padding-bottom: 50px; */
}
</style>
