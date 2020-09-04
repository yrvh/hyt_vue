<template>
  <div id="app">
    <keep-alive>
      <router-view/>
    </keep-alive>

    <main-tabbar></main-tabbar>
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

<style lang="scss">
@import "assets/css/base.css";
</style>
