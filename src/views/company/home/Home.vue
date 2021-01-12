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
          title: '业务人员管理',
          link: '/company_user'
        },
        {
          id: 1,
          icon: 'icon-jiluliebiao',
          icolor: "#EE7744",
          title: '支付管理',
          link: '/company_income'
        },
        {
          id: 2,
          icon: 'icon-jiluliebiao',
          icolor: "#EE7744",
          title: '业务合同设置',
          link: '/company_deallist'
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
