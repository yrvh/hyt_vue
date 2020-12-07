<template>
  <div class="major">
    <van-nav-bar left-text="返回" left-arrow border fixed z-index="50" placeholder @click-left="onBack"/>

    <van-tabs type="card" color="#7EB6FF" v-model="tab_mark" animated swipeable scrollspy @change="onChange">
      <!--     收入管理(业者)       -->
      <van-tab title="收入管理(业者)" :badge="free_income[0].value==0? '':free_income[0].value">
        <van-cell v-for="item in free_income" :key="item.id" :title="item.title"
                  :value="item.value" :value-class="(item.isright_css && item.value>0)? 'right-css':''"
                  is-link :to="{path: '/check_incomefreelist', query: {in_title: item.title, in_status: item.status }}"/>
      </van-tab>

      <!--     收入管理(合伙人)    -->
      <van-tab title="收入管理(合伙)" :badge="coop_income[0].value==0? '':coop_income[0].value">
        <van-cell v-for="item in coop_income" :key="item.id" :title="item.title"
                  :value="item.value" :value-class="(item.isright_css && item.value>0)? 'right-css':''"
                  is-link :to="{path: '/check_incomecooplist', query: {in_title: item.title, in_status: item.status }}"/>
      </van-tab>

      <!--     收入管理(边民)       -->
      <van-tab title="收入管理(边民)" :badge="frontier_income[0].value==0? '':frontier_income[0].value">
        <van-cell v-for="item in frontier_income" :key="item.id" :title="item.title"
                  :value="item.value" :value-class="(item.isright_css && item.value>0)? 'right-css':''"
                  is-link :to="{path: '/check_incomefrontierlist', query: {in_title: item.title, in_status: item.status }}"/>
      </van-tab>

      <!--     发票查询(业者)       -->
      <van-tab title="发票查询(业者)" >
        <van-cell v-for="item in free_invoice" :key="item.id" :title="item.title" :value="item.value" is-link
                  :to="{path: '/check_invoicefreelist', query: {in_title: item.title, in_status: item.status }}"/>
      </van-tab>

      <!--     发票查询(合伙人)       -->
      <van-tab title="发票查询(合伙)" >
        <van-cell v-for="item in coop_invoice" :key="item.id" :title="item.title" :value="item.value" is-link
                  :to="{path: '/check_invoicecooplist', query: {in_title: item.title, in_status: item.status }}"/>
      </van-tab>

      <!--     报税查询      -->
      <van-tab title="报税查询">
        <van-cell v-for="item in tax_arr" :key="item.id" :title="item.title" :value="item.value" is-link
                  :to="{path: '/check_taxlist', query: {in_title: item.title, in_status: item.status }}"/>
      </van-tab>
      <!--     业务合同      -->
      <van-tab title="业务合同" :badge="deal_arr[0].value==0? '':deal_arr[0].value">
        <van-cell v-for="item in deal_arr" :key="item.id" :title="item.title"
                  :value="item.value" :value-class="(item.isright_css && item.value>0)? 'right-css':''"
                  is-link :to="{path: '/check_deallist', query: {in_title: item.title, in_status: item.status }}"/>
      </van-tab>

    </van-tabs>

  </div>
</template>

<script>
import { getFreeIncome,getCoopIncome,getFreeInvoice,getCoopInvoice,getTax,getDeal } from "@/network/check";
import {SETMK} from '@/store/mutype'

export default {
  name: "Major",
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
      frontier_income: [   // 收入管理(边民)
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

      free_invoice: [   // 发票查询(业者)
        {
          id: 0,
          title: '未算税',
          value: '',
          status: 0
        },
        {
          id: 1,
          title: '已算税',
          value: '',
          status: 1
        },
        {
          id: 2,
          title: '已报税',
          value: '',
          status: 2
        },
        {
          id: 3,
          title: '已作废',
          value: '',
          status: 3
        },
        {
          id: 4,
          title: '已删除',
          value: '',
          status: 4
        }
      ],
      coop_invoice: [   // 发票查询(合伙人)
        {
          id: 0,
          title: '未算税',
          value: '',
          status: 0
        },
        {
          id: 1,
          title: '已算税',
          value: '',
          status: 1
        },
        {
          id: 2,
          title: '税',
          value: '',
          status: 2
        },
        {
          id: 3,
          title: '已作废',
          value: '',
          status: 3
        },
        {
          id: 4,
          title: '已删除',
          value: '',
          status: 4
        }
      ],
      tax_arr: [   // 报税查询
        {
          id: 0,
          title: '待申报',
          value: '',
          status: 0,
        },
        {
          id: 1,
          title: '申报失败',
          value: '',
          status: 2,
        },
        {
          id: 2,
          title: '申报成功',
          value: '',
          status: 1,
        }
      ],
      deal_arr: [   // 业务合同
        {
          id: 0,
          title: '待确认',
          value: '',
          status: 6,
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
          title: '已退回',
          value: '',
          status: 7,
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
  created() {
    this.tab_mark = this.$store.state.main.nav_mark   // 进入时默认的 nav

    // 获取用户管理主界面数据
    this.obj.pass_app = this.$store.state.login.password
    this.obj.tel_app = this.$store.state.login.tel
    this.obj.code_app = this.$store.state.login.code_app
    this.obj.tel_sid = this.$store.state.login.tel_sid

    this.$axios.all([
      getFreeIncome(this.obj),
      // getCoopIncome(this.obj),
      // getFrontierIncome(this.obj),

      getFreeInvoice(this.obj),
      // getCoopInvoice(this.obj),
      getTax(this.obj),
      getDeal(this.obj),
    ]).then(this.$axios.spread((res1,res3,res5,res6) => {
      if(res1.result == 1) this.free_income.forEach( (item,index) => {   // 请求回来的 单位数据
        switch(index) {
          case 0:
            item.value = res1.send
            break;
          case 1:
            item.value = res1.yz_nopass
            break;
          case 2:
            item.value = res1.wait_check
            break;
          case 3:
            item.value = res1.ms_nopass
            break;
          case 4:
            item.value = res1.ms_send_pay
            break;
          case 5:
            item.value = res1.bb_7
            break;
          case 6:
            item.value = res1.bb_8
            break;
          case 7:
            item.value = res1.bb_11
            break;
          case 8:
            item.value = res1.bb_12
            break;
        }
      })
      // if(res2.result == 1) this.coop_income.forEach( (item,index) => {   // 请求回来的 单位数据
      //   switch(index) {
      //     case 0:
      //       item.value = res2.send
      //       break;
      //     case 1:
      //       item.value = res2.yz_nopass
      //       break;
      //     case 2:
      //       item.value = res2.wait_check
      //       break;
      //     case 3:
      //       item.value = res2.ms_nopass
      //       break;
      //     case 4:
      //       item.value = res2.ms_send_pay
      //       break;
      //     case 5:
      //       item.value = res2.bb_7
      //       break;
      //     case 6:
      //       item.value = res2.bb_8
      //       break;
      //     case 7:
      //       item.value = res2.b_11
      //       break;
      //     case 8:
      //       item.value = res2.b_12
      //       break;
      //   }
      // })

      if(res3.result == 1) this.free_invoice.forEach( (item,index) => {   // 请求回来的 业者数据
        switch(index) {
          case 0:
            item.value = res3.w_ss
            break;
          case 1:
            item.value = res3.y_ss
            break;
          case 2:
            item.value = res3.y_bs
            break;
          case 3:
            item.value = res3.y_bf
            break;
          case 4:
            item.value = res3.y_del
            break;
        }
      })
      // if(res4.result == 1) this.coop_invoice.forEach( (item,index) => {   // 请求回来的 业者数据
      //   switch(index) {
      //     case 0:
      //       item.value = res4.wss_size
      //       break;
      //     case 1:
      //       item.value = res4.yss_size
      //       break;
      //     case 2:
      //       item.value = res4.ybs_size
      //       break;
      //     case 3:
      //       item.value = res4.yfc_size
      //       break;
      //     case 4:
      //       item.value = res4.del_size
      //       break;
      //   }
      // })

      if(res5.result == 1) this.tax_arr.forEach( (item,index) => {   // 请求回来的 伙伴数据
        switch(index) {
          case 0:
            item.value = res5.w_bs
            break;
          case 1:
            item.value = res5.n_bs
            break;
          case 2:
            item.value = res5.y_bs
            break;
        }
      })

      this.deal_arr.forEach( (item,index) => {   // 请求回来的 伙伴数据
        switch(index) {
          case 0:
            item.value = res6.bb6
              console.log(res6.bb6)
            break;
          case 1:
            item.value = res6.bb1
            console.log(res6.bb1)
            break;
          case 2:
            item.value = res6.bb7
            console.log(res6.bb7)
            break;
        }
      })
    }))

  },

}
</script>

<style scoped lang="scss">
.major {
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
