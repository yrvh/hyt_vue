<template>
  <div class="income">
    <van-nav-bar left-text="返回" title="收入管理" left-arrow border fixed z-index="50" placeholder @click-left="onBack"/>

    <van-tabs type="card" color="#7EB6FF" v-model="tab_mark" animated swipeable scrollspy @change="onChange">
      <!--     收入管理(业者)       -->
      <van-tab title="业者" :badge="badgeFree">
        <van-cell v-for="item in free_income" :key="item.id" :title="item.title"
                  :value="item.value" :value-class="(item.isright_css && item.value>0)? 'right-css':''"
                  is-link :to="{path: '/check_incomefreelist', query: {in_title: item.title, in_status: item.status }}"/>
      </van-tab>

      <!--     收入管理(合伙人)    -->
      <van-tab title="合作伙伴" :badge="badgeCoop">
        <van-cell v-for="item in coop_income" :key="item.id" :title="item.title"
                  :value="item.value" :value-class="(item.isright_css && item.value>0)? 'right-css':''"
                  is-link :to="{path: '/check_incomecooplist', query: {in_title: item.title, in_status: item.status }}"/>
      </van-tab>

      <!--     收入管理(边民合作社)       -->
      <van-tab title="合作社" :badge="badgeFrontier">
        <van-cell v-for="item in frontier_income" :key="item.id" :title="item.title"
                  :value="item.value" :value-class="(item.isright_css && item.value>0)? 'right-css':''"
                  is-link :to="{path: '/check_incomefrontierlist', query: {in_title: item.title, in_status: item.status }}"/>
      </van-tab>

      <!--     三方平台业者       -->
      <van-tab title="三方平台业者" :badge="badgeThird">

        <van-cell v-for="item in third_income" :key="item.id" :title="item.title"
                  :value="item.value" :value-class="(item.isright_css && item.value>0)? 'right-css':''"
                  is-link :to="{path: '/check_incomethirdlist', query: {in_title: item.title, in_status: item.status }}"/>
      </van-tab>

    </van-tabs>

  </div>
</template>

<script>
import { getFreeIncome, getCoopIncome, getFrontierIncome, getThirdIncome } from "@/network/check";
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
      free_income: [   // 收入管理(业者)
        {
          id: 0,
          title: '待业者确认',
          value: '',
          status: 1,
          isright_css: false
        },
        {
          id: 1,
          title: '业者退回',
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
          isright_css: true
        },
        {
          id: 6,
          title: '支付中',
          value: '',
          status: 11,
          isright_css: false
        },
        {
          id: 7,
          title: '支付失败',
          value: '',
          status: 12,
          isright_css: true
        },
        {
          id: 8,
          title: '用户已收款',
          value: '',
          status: 8,
          isright_css: false
        }
      ],
      coop_income: [   // 收入管理(合伙人)
        {
          id: 0,
          title: '待确认',
          value: '',
          status: 1,
          isright_css: false
        },
        {
          id: 1,
          title: '待支付',
          value: '',
          status: 7,
          isright_css: true
        },
        {
          id: 2,
          title: '支付中',
          value: '',
          status: 11,
          isright_css: false
        },
        {
          id: 3,
          title: '支付失败',
          value: '',
          status: 12,
          isright_css: true
        },
        {
          id: 4,
          title: '用户已收款',
          value: '',
          status: 8,
          isright_css: false
        }
      ],
      frontier_income: [   // 收入管理(合作社)
        {
          id: 10,
          title: '待提交',
          value: '',
          status: 0,
          isright_css: false
        },
        {
          id: 0,
          title: '待业务员审核',
          value: '',
          status: 6,
          isright_css: false
        },
        {
          id: 1,
          title: '业务员退回',
          value: '',
          status: 66,
          isright_css: false
        },
        {
          id: 2,
          title: '待发起支付',
          value: '',
          status: 6,
          isright_css: false
        },
        {
          id: 3,
          title: '待支付',
          value: '',
          status: 7,
          isright_css: true
        },
        {
          id: 4,
          title: '支付中',
          value: '',
          status: 11,
          isright_css: false
        },
        {
          id: 5,
          title: '支付失败',
          value: '',
          status: 12,
          isright_css: true
        },
        {
          id: 6,
          title: '用户已收款',
          value: '',
          status: 8,
          isright_css: false
        }
      ],
      third_income: [   // 收入管理(三方平台业者)
        {
          id: 0,
          title: '待秘书公司确认',
          value: '',
          status: 2,
          isright_css: false
        },
        {
          id: 1,
          title: '秘书公司退回',
          value: '',
          status: 5,
          isright_css: false
        },
        {
          id: 2,
          title: '待发起支付',
          value: '',
          status: 6,
          isright_css: false
        },
        {
          id: 3,
          title: '待支付',
          value: '',
          status: 7,
          isright_css: true
        },
        {
          id: 4,
          title: '支付中',
          value: '',
          status: 11,
          isright_css: false
        },
        {
          id: 5,
          title: '支付失败',
          value: '',
          status: 12,
          isright_css: true
        },
        {
          id: 6,
          title: '用户已收款',
          value: '',
          status: 8,
          isright_css: false
        }
      ],
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
  computed: {
    badgeFree() {  // 计算有多少条 是等待处理的
      let num = (this.free_income[5].value==0 && this.free_income[7].value==0)? '' : (this.free_income[5].value + this.free_income[7].value)
      return num
    },
    badgeCoop() {
      let num = (this.coop_income[1].value==0 && this.coop_income[3].value==0)? '' : (this.coop_income[1].value + this.coop_income[3].value)
      return num
    },
    badgeFrontier() {
      let num = (this.frontier_income[4].value==0 && this.frontier_income[6].value==0)? '' : (this.frontier_income[4].value + this.frontier_income[6].value)
      return num
    },
    badgeThird() {
      let num = (this.third_income[3].value==0 && this.third_income[5].value==0)? '' : (this.third_income[3].value + this.third_income[5].value)
      return num
    }
  },
  created() {
    this.tab_mark = this.$store.state.main.nav_mark   // 进入时默认的 nav

    // 获取用户管理主界面数据
    this.obj.pass_app = this.$store.state.login.password
    this.obj.tel_app = this.$store.state.login.tel
    this.obj.code_app = this.$store.state.login.code_app
    this.obj.tel_sid = this.$store.state.login.sid

    this.$axios.all([
      getFreeIncome(this.obj),
      getCoopIncome(this.obj),
      getFrontierIncome(this.obj),
      getThirdIncome(this.obj)
    ]).then(this.$axios.spread((res1,res2,res3,res4) => {
      if(res1.result == 1) this.free_income.forEach( (item,index) => {   // 业者
        switch(index) {
          case 5:
            item.value = res1.bb_7
            break;
          case 7:
            item.value = res1.bb_12
            break;
        }
      })
      if(res2.result == 1) this.coop_income.forEach( (item,index) => {   // 伙伴
        switch(index) {
          case 1:
            item.value = res2.bb_7
            break;
          case 3:
            item.value = res2.bb_12
            break;
        }
      })

      if(res3.result == 1) this.frontier_income.forEach( (item,index) => {   // 合作社
        switch(index) {
          case 4:
            item.value = res3.bb_7
            break;
          case 6:
            item.value = res3.bb_12
            break;
        }
      })
      if(res4.result == 1) this.third_income.forEach( (item,index) => {   // 伙伴
        switch(index) {
          case 3:
            item.value = res4.bb_7
            break;
          case 5:
            item.value = res4.bb_12
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
