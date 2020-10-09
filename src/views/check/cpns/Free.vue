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
  props: {
    listinfo: {
      type: Object,
      default() {
        return [];
      }
    }
  },
  data() {
    return {
      user_type: 1,   // 用户类型
      main_arr: [   // 主界面数据
        {
          id: 0,
          title: '待审核',
          value: '',
          status: 7,
          path: '/checkhome_userlist',
          isright_css: true
        },
        {
          id: 1,
          title: '待业者确认',
          value: '',
          status: 4,
          path: '/checkhome_userlist',
        },
        {
          id: 2,
          title: '业者退回',
          value: '',
          status: 44,
          path: '/checkhome_userlist',
        },
        {
          id: 3,
          title: '审核通过',
          value: '',
          status: 8,
          path: '/checkhome_userlist',
        },
        {
          id: 4,
          title: '审核退回',
          value: '',
          status: 77,
          path: '/checkhome_userlist',
        }
      ]
    }
  },
  computed: {},

  methods: {
    getValue() {   // 给属性赋值
      this.main_arr.forEach( (item,index) => {
        switch(index) {
          case 0:
            item.value = this.listinfo.yz_7
            break;
          case 1:
            item.value = this.listinfo.yz_4
            break;
          case 2:
            item.value = this.listinfo.yz_44
            break;
          case 3:
            item.value = this.listinfo.yz_8
            break;
          case 4:
            item.value = this.listinfo.yz_77
            break;
        }
      })
    }
  },
  activated() {
    this.getValue()
    console.log("当前页面激活1");
  },
  created() {
    this.getValue()
    console.log("创建完成1");
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