<template>
  <div class="free">
    <van-cell v-for="item in main_arr" :key="item.id" :title="item.title"
              :value="item.value" :value-class="(item.isright_css && item.value>0)? 'right-css':''"
              is-link :to="{path: item.path, query: {in_status: item.status}}"/>

  </div>
</template>

<script>
export default {
  name: "Free",
  data() {
    return {
      user_type: 1,   // 用户类型
      main_arr: [   // 主界面数据
        {
          id: 0,
          title: '待审核',
          value: 7,
          status: 7,
          path: '/checkhome_userlist',
          isright_css: true
        },
        {
          id: 1,
          title: '待业者确认',
          value: 9,
          status: 4,
          path: '/checkhome_userlist',
        },
        {
          id: 2,
          title: '业者退回',
          value: 2,
          status: 44,
          path: '/checkhome_userlist',
        },
        {
          id: 3,
          title: '审核通过',
          value: 8,
          status: 8,
          path: '/checkhome_userlist',
        },
        {
          id: 4,
          title: '审核退回',
          value: 1,
          status: 77,
          path: '/checkhome_userlist',
        }
      ]
    }
  }
}
</script>

<style scoped lang="scss">
.free{
  margin-top: 20px;
  /*height: 50vh;*/
  /*background-color: #34AEFF;*/
  .right-css {color: #e33; font-size: 16px; font-weight: 700;}
}

</style>