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
          icon: 'icon-caiwuchazhang',
          icolor: "#EE7744",
          title: '收入管理',
          link: '/coop_income'
        },
        {
          id: 1,
          icon: 'icon-qunzu',
          icolor: "#F7B55E",
          title: '用户管理',
          link: '/coop_user'
        },
        {
          id: 2,
          icon: 'icon-zongshouru',
          icolor: "#F7B55E",
          title: '收入查询',
          link: '/coop_incomeself'
        },
        {
          id: 3,
          icon: 'icon-jiluliebiao',
          icolor: "#17c295",
          title: '发票查询',
          link: '/coop_invoice'
        },
        {
          id: 4,
          icon: 'icon-qianshuigonggao',
          icolor: "#4DA9EB",
          title: '报税查询',
          link: '/coop_tax'
        }
      ],
      user_main: null,   // 保存请求回来的用户主界面数据
    }
  },
  created() {
    // 获取用户管理主界面数据
    // getUserMain().then( res => {
    //   console.log(res)
    //   this.user_main = res
    // })
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
