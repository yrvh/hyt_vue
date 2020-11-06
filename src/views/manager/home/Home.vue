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
          link: '/managerhome_user'
        },
        {
          id: 1,
          icon: 'icon-jiluliebiao',
          icolor: "#17c295",
          title: '业务管理',
          link: '/managerhome_major'
        },
        {
          id: 2,
          icon: 'icon-xieyixiangqing',
          icolor: "#F7B55E",
          title: '协议模板',
          link: '/managerhome_contract'
        },
        {
          id: 3,
          icon: 'icon-hetong',
          icolor: "#4DA9EB",
          title: '税收政策',
          link: '/managerhome_tax'
        },
        {
          id: 4,
          icon: 'icon-gerenxinxi',
          icolor: "#4DA9EB",
          title: '公司管理',
          link: '/managerhome_group'
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
