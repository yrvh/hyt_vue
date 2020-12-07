// 收入管理
<template>
  <div class="income">
    <van-nav-bar left-text="返回" left-arrow border fixed z-index="50" placeholder @click-left="onBack"/>

    <van-tabs type="card" color="#7EB6FF" v-model="tab_mark" animated swipeable @change="onChange">
      <!--     收入管理       -->
      <van-tab title="收入管理" :badge="income_arr[0].value==0? '':income_arr[0].value">

        <van-cell v-for="item in income_arr" :key="item.id" :title="item.title"
                  :value="item.value" :value-class="(item.isright_css && item.value>0)? 'right-css':''"
                  is-link :to="{path: '/freecom_incomelist', query: {in_title: item.title, in_status: item.status}}"/>
      </van-tab>

      <!--     业务合同    -->
      <van-tab title="业务合同" :badge="deal_arr[0].value==0? '':deal_arr[0].value">
        <van-cell v-for="item in deal_arr" :key="item.id" :title="item.title"
                  :value="item.value" :value-class="(item.isright_css && item.value>0)? 'right-css':''"
                  is-link :to="{path: '/freecom_deallist', query: {in_title: item.title, in_status: item.status}}"/>
      </van-tab>

    </van-tabs>

  </div>
</template>

<script>
import { getIncome,getDeal } from "@/network/freecom";
import {SETMK} from '@/store/mutype'

export default {
  name: "Income",
  components: {
  },
  data() {
    return {
      obj: {
        pass_app: '',
        tel_app: '',
        code_app: '',
        tel_sid: '',   // 用户id
      },

      tab_mark: 0,   // nav标签 标识符
      income_arr: [   // 主界面数据
        {
          id: 0,
          title: '待确认',
          value: '',
          status: 1,
          isright_css: true
        },
        {
          id: 1,
          title: '退回',
          value: '',
          status: 3,
          isright_css: false
        },
        {
          id: 2,
          title: '待秘书公司确认',
          value: '',
          status: 2,
          isright_css: false
        },
        {
          id: 3,
          title: '秘书公司退回',
          value: '',
          status: 5,
          isright_css: false
        },
        {
          id: 4,
          title: '待发起支付',
          value: '',
          status: 6,
          isright_css: false
        },
        {
          id: 5,
          title: '待支付',
          value: '',
          status: 7,
          isright_css: false
        },
        {
          id: 6,
          title: '用户已收款',
          value: '',
          status: 8,
          isright_css: false
        }
      ],
      deal_arr: [
        {
          id: 0,
          title: '待确认',
          value: '',
          status: 2,
          isright_css: true
        },
        {
          id: 1,
          title: '已退回',
          value: '',
          status: 3,
        },
        {
          id: 2,
          title: '待商秘公司确认',
          value: '',
          status: 6,
        },
        {
          id: 3,
          title: '商秘公司已确认',
          value: '',
          status: 1,
        },
        {
          id: 4,
          title: '商秘公司退回',
          value: '',
          status: 7,
        }
      ]

    }
  },
  methods: {
    onBack() {   // 左键返回时,把nav_mark重置为0
      this.$store.commit(SETMK, 0)
      this.clickLeft()
    },
    onChange() {   // 当tabs 发生改变时,切换
      this.$store.commit(SETMK, this.tab_mark)   // 切换时设置当前的nav_mark = tab_mark
    },
  },
  created() {
    this.tab_mark = this.$store.state.main.nav_mark   // 进入时默认的 二级  nav

    // 获取用户管理主界面数据
    this.obj.pass_app = this.$store.state.login.password
    this.obj.tel_app = this.$store.state.login.tel
    this.obj.code_app = this.$store.state.login.code_app
    
    this.$axios.all([
      getIncome(obj),getDeal(obj)
    ]).then(this.$axios.spread((res1,res2) => {
      if(res1.result == 1) this.income_arr.forEach( (item,index) => {   // 请求回来的 单位数据
        switch(index) {
          case 0:
            item.value = res1.send
            break;
          case 1:
            item.value = res1.yz_nopass
            break;
          case 2:
            item.value = res1.yz_pass
            break;
          case 3:
            item.value = res1.ms_nopass
            break;
          case 4:
            item.value = res1.ms_pass
            break;
          case 5:
            item.value = res1.bb_7
            break;
          case 6:
            item.value = res1.bb_8
                break;
        }
      })

      if(res2.result == 1) this.deal_arr.forEach( (item,index) => {   // 请求回来的 业者数据
        switch(index) {
          case 0:
            item.value = res2.uu2
            break;
          case 1:
            item.value = res2.uu3
            break;
          case 2:
            item.value = res2.uu6
            break;
          case 3:
            item.value = res2.uu1
            break;
          case 4:
            item.value = res2.uu7
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


}
</style>
