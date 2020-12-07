<template>
  <div class="invoice">
    <van-nav-bar left-text="返回" title="发票查询" left-arrow border fixed z-index="50" placeholder @click-left="onBack"/>

    <van-tabs type="card" color="#7EB6FF" v-model="tab_mark" animated swipeable scrollspy @change="onChange">
      <!--     发票查询(业者)       -->
      <van-tab title="业者" >
        <van-cell v-for="item in free_invoice" :key="item.id" :title="item.title" :value="item.value" is-link
                  :to="{path: '/check_invoicefreelist', query: {in_title: item.title, in_status: item.status }}"/>
      </van-tab>

      <!--     发票查询(合伙人)       -->
      <van-tab title="合作伙伴" >
        <van-cell v-for="item in coop_invoice" :key="item.id" :title="item.title" :value="item.value" is-link
                  :to="{path: '/check_invoicecooplist', query: {in_title: item.title, in_status: item.status }}"/>
      </van-tab>

      <!--    发票查询( 合作社 )      -->
      <van-tab title="合作社" :badge="frontier_invoice[0].value==0? '':frontier_invoice[0].value">
        <van-cell v-for="item in frontier_invoice" :key="item.id" :title="item.title"
                  :value="item.value" :value-class="(item.isright_css && item.value>0)? 'right-css':''"
                  is-link :to="{path: '/check_invoicefrontierlist', query: {in_title: item.title, in_status: item.status }}"/>
      </van-tab>

    </van-tabs>

  </div>
</template>

<script>
import { getFreeInvoice, getCoopInvoice, getFrontierInvoice } from "@/network/check";
import {SETMK} from '@/store/mutype'

export default {
  name: "Invoice",
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
      frontier_invoice: [   // 合作社
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
      getFreeInvoice(this.obj),
      getCoopInvoice(this.obj),
      getFrontierInvoice(this.obj)
    ]).then(this.$axios.spread((res1,res2,res3) => {
      if(res1.result == 1) this.free_income.forEach( (item,index) => {   // 业者
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

      if(res2.result == 1) this.coop_income.forEach( (item,index) => {   // 合作伙伴
        switch(index) {
          case 0:
            item.value = res2.send
            break;
          case 1:
            item.value = res2.yz_nopass
            break;
          case 2:
            item.value = res2.wait_check
            break;
          case 3:
            item.value = res2.ms_nopass
            break;
          case 4:
            item.value = res2.ms_send_pay
            break;
          case 5:
            item.value = res2.bb_7
            break;
          case 6:
            item.value = res2.bb_8
            break;
          case 7:
            item.value = res2.b_11
            break;
          case 8:
            item.value = res2.b_12
            break;
        }
      })

      if(res3.result == 1) this.free_invoice.forEach( (item,index) => {   // 合作社
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
      
    }))

  },

}
</script>

<style scoped lang="scss">
.invoice {
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
