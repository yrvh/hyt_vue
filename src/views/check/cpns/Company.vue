<template>
  <div class="company">
    <van-cell v-for="item in main_arr" :key="item.id" :title="item.title"
              :value="item.value" :value-class="(item.isright_css && item.value>0)? 'right-css':''"
              is-link :to="{path: item.path, query: {in_status: item.status}}"/>
  </div>
</template>

<script>
export default {
  name: "Company",
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
      user_type: 2,   // 用户类型
      // listinfo: [],   // 网络请求回来的数据
      main_arr: [   // 主界面数据
        {
          id: 0,
          title: '待审核',
          value: '',
          status: 1,
          path: '/checkhome_userlist',
          isright_css: true
        },
        {
          id: 1,
          title: '待单位确认',
          value: '',
          status: 2,
          path: '/checkhome_userlist',
          isright_css: false
        },
        {
          id: 2,
          title: '单位退回',
          value: '',
          status: 22,
          path: '/checkhome_userlist',
          isright_css: false
        },
        {
          id: 3,
          title: '审核通过',
          value: '',
          status: 8,
          path: '/checkhome_userlist',
          isright_css: false
        },
        {
          id: 4,
          title: '审核退回',
          value: '',
          status: 11,
          path: '/checkhome_userlist',
          isright_css: false
        }
      ]
    }
  },
  computed: {
  },
  methods: {
    getValue() {   // 给属性赋值
      this.main_arr.forEach( (item,index) => {
        switch(index) {
          case 0:
            item.value = this.listinfo.dw_1
            break;
          case 1:
            item.value = this.listinfo.dw_2
            break;
          case 2:
            item.value = this.listinfo.dw_22
            break;
          case 3:
            item.value = this.listinfo.dw_8
            break;
          case 4:
            item.value = this.listinfo.dw_11
            break;
        }
      })
    }
  },
  activated() {
    this.getValue()
    console.log("当前页面激活2");
  },
  created() {
    this.getValue()
    console.log("创建完成2");
  },
  updated() {
    console.log("uuju数据更新了")
  },
  mounted() {
    console.log("当前组件渲染完成");
  }

}
</script>

<style scoped lang="scss">
.company{
  margin-top: 20px;
  /*height: 50vh;*/
  /*background-color: #34AEFF;*/
  .right-css {color: #e33; font-size: 16px; font-weight: 700;}
}

</style>