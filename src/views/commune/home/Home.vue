<template>
  <div class="home">
    <MainSwiper/>
    <Recommend :rarr="recommends_arr"></Recommend>
  </div>
</template>

<script>
import MainSwiper from "@/components/content/MainSwiper/MainSwiper";
import Recommend from "@/components/content/Recommend/Recommend";

export default {
  name: "Home",
  components: {
    Recommend,
    MainSwiper
  },
  data() {
    return {
      recommends_arr: [   // 导航的数据
        {
          id: 0,
          icon: 'icon-qunzu',
          icolor: "#17c295",
          title: '用户管理',
          link: '/commune_user'
        },
        {
          id: 1,
          icon: 'icon-gerenxinxi',
          icolor: "#17c295",
          title: '购货信息管理',
          link: '/commune_shop'
        },
        {
          id: 2,
          icon: 'icon-xieyixiangqing',
          icolor: "#17c295",
          title: '发票抬头管理',
          link: '/commune_cap'
        },
        {
          id: 3,
          icon: 'icon-jiluliebiao',
          icolor: "#17c295",
          title: '收入查询(自己)',
          link: '/commune_incomeself'
        },
        
      ],
    }
  },
  created() {
  }
}
</script>

<style scoped lang="scss">
.home {
  min-height: 100vh;
  //background-color: var(--cl-bg-tF);
  //background-color: var(--cl-darkbg);
}
</style>
