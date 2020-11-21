// 收入管理
<template>
  <div class="income">
    <van-nav-bar left-text="返回" left-arrow border fixed z-index="50" placeholder @click-left="clickLeft()"/>
    <van-tabs type="card" color="#7EB6FF" v-model="tab_mark" animated swipeable>
      <!--     发票抬头    -->
      <van-tab title="抬头管理" :badge="cap_arr[0].value==0? '':cap_arr[0].value">
        <van-cell v-for="item in cap_arr" :key="item.id" :title="item.title"
                  :value="item.value" :value-class="(item.isright_css && item.value>0)? 'right-css':''"
                  is-link :to="{path: '/free_caplist', query: {in_title: item.title, in_status: item.status}}"/>

        <van-button class="btn-add" size="large" text="+新增发票抬头" block color="#7EB6FF" @click="onAdd('/free_capadd')"></van-button>
      </van-tab>

      <!--     业务合同    -->
      <van-tab title="业务合同" :badge="deal_arr[0].value==0? '':deal_arr[0].value">
        <van-cell v-for="item in deal_arr" :key="item.id" :title="item.title"
                  :value="item.value" :value-class="(item.isright_css && item.value>0)? 'right-css':''"
                  is-link :to="{path: '/free_deallist', query: {in_title: item.title, in_status: item.status}}"/>

        <van-button class="btn-add" size="large" text="+新增业务合同" block color="#7EB6FF" @click="onAdd('/free_dealadd')"></van-button>
      </van-tab>

      <!--     收入管理       -->
      <van-tab title="收入管理" :badge="income_arr[0].value==0? '':income_arr[0].value">

        <van-cell v-for="item in income_arr" :key="item.id" :title="item.title"
                  :value="item.value" :value-class="(item.isright_css && item.value>0)? 'right-css':''"
                  is-link :to="{path: '/free_incomelist', query: {in_title: item.title, in_status: item.status}}"/>

        <van-button class="btn-add" size="large" text="+添加收入" block color="#7EB6FF" @click="onAdd('/free_incomeadd')"></van-button>
      </van-tab>

    </van-tabs>

  </div>
</template>

<script>
import { getIncome, getDeal, getCap} from "@/network/free";

export default {
  name: "Income",
  components: {
  },
  data() {
    return {
      tab_mark: null,   // nav标签 标识符
      income_arr: [   // 主界面数据
        {
          id: 0,
          title: '待提交',
          value: '',
          status: 0,
          isright_css: true
        },
        {
          id: 1,
          title: '待商秘公司确认',
          value: '',
          status: 2,
          isright_css: false
        },
        {
          id: 2,
          title: '商秘公司退回',
          value: '',
          status: 5,
          isright_css: false
        },
        {
          id: 3,
          title: '待发起支付',
          value: '',
          status: 6,
          isright_css: false
        },
        {
          id: 4,
          title: '待支付',
          value: '',
          status: 7,
          isright_css: false
        },
        {
          id: 5,
          title: '用户已收款',
          value: '',
          status: 8,
          isright_css: false
        }
      ],
      deal_arr: [
        {
          id: 0,
          title: '待提交',
          value: '',
          status: 0,
          isright_css: true
        },
        {
          id: 1,
          title: '已通过',
          value: '',
          status: 1,
          isright_css: false
        },
        {
          id: 2,
          title: '待商秘公司确认',
          value: '',
          status: 2,
          isright_css: false
        },
        {
          id: 3,
          title: '商秘公司退回',
          value: '',
          status: 5,
          isright_css: false
        }, 
      ],
      cap_arr: [
        {
          id: 0,
          title: '待提交',
          value: '',
          status: 0,
          isright_css: true
        },
        {
          id: 1,
          title: '已确认',
          value: '',
          status: 1,
          isright_css: false
        },
        {
          id: 2,
          title: '待业务员确认',
          value: '',
          status: 2,
          isright_css: false
        },
        {
          id: 3,
          title: '业务员退回',
          value: '',
          status: 3,
          isright_css: false
        }, 
      ]

    }
  },
  methods: {
    onAdd(path) {
      this.$router.push({
        path: path,
        query: {in_status: 99}
      })
    }
  },
  created() {
    // 获取用户管理主界面数据
    let obj = {
      pass_app: this.$store.state.login.password,
      tel_app: this.$store.state.login.tel,
      code_app: this.$store.state.login.code_app,
    }
    this.$axios.all([
      getIncome(obj),getDeal(obj),getCap(obj)
    ]).then(this.$axios.spread((res1,res2,res3) => {
      if(res1.result == 1) this.income_arr.forEach( (item,index) => {
        switch(index) {
          case 0:
            item.value = res1.waisend
            break;
          case 1:
            item.value = res1.send
            break;
          case 2:
            item.value = res1.ms_nopass
            break;
          case 3:
            item.value = res1.ms_pass
            break;
          case 4:
            item.value = res1.bb_7
            break;
          case 5:
            item.value = res1.bb_8
                break;
        }
      })

      if(res2.result == 1) this.deal_arr.forEach( (item,index) => {
        switch(index) {
          case 0:
            item.value = res2.uu0
            break;
          case 1:
            item.value = res2.uu1
            break;
          case 2:
            item.value = res2.uu2
            break;
          case 3:
            item.value = res2.uu3
            break;
        }
      })
      
      if(res3.result == 1) this.cap_arr.forEach( (item,index) => {
        switch(index) {
          case 0:
            item.value = res3.uu0
            break;
          case 1:
            item.value = res3.uu1
            break;
          case 2:
            item.value = res3.uu2
            break;
          case 3:
            item.value = res3.uu3
            break;
        }
      })

    }))

  },

}
</script>

<style scoped lang="scss">
.income {
  .van-nav-bar{
    //background-color: rgba(0,0,100,0.2) !important;
  }
  .van-tabs {
    //background-color: #cfc;
    margin-top: 5px;
    .van-cell:first-child { margin-top: 20px;}
    .right-css {color: #e33; font-size: 16px; font-weight: 700;}
  }
  .btn-add { margin-top: 50px;}


}
</style>
