<template>
  <div class="tax">
    <van-nav-bar left-text="返回"  title="报税查询" left-arrow border fixed z-index="50" placeholder @click-left="onBack"/>

    <van-tabs type="card" color="#7EB6FF" v-model="tab_mark" animated swipeable scrollspy @change="onChange">
      <!--     报税查询(业者)       -->
      <van-tab title="业者" >
        <van-cell v-for="item in free_tax" :key="item.id" :title="item.title" :value="item.value" is-link
                  :to="{path: '/check_taxfreelist', query: {in_title: item.title, in_status: item.status }}"/>
      </van-tab>

      <!--     报税查询(合伙人)       -->
      <van-tab title="合作伙伴" >
        <van-cell v-for="item in coop_tax" :key="item.id" :title="item.title" :value="item.value" is-link
                  :to="{path: '/check_taxcooplist', query: {in_title: item.title, in_status: item.status }}"/>
      </van-tab>

      <!--     报税查询 (合作社)      -->
      <van-tab title="合作社">
        <van-cell v-for="item in frontier_tax" :key="item.id" :title="item.title" :value="item.value" is-link
                  :to="{path: '/check_taxfrontierlist', query: {in_title: item.title, in_status: item.status }}"/>
      </van-tab>
    </van-tabs>

  </div>
</template>

<script>
import { getTax, getCoopTax, getFrontierTax } from "@/network/check";
import {SETMK} from '@/store/mutype'

export default {
  name: "Tax",
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
      
      free_tax: [   // 报税查询(业者)
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
      coop_tax: [   // 报税查询(合伙人)
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
      frontier_tax: [   // 报税查询( 合作社 )
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
    this.obj.tel_sid = this.$store.state.login.sid

    this.$axios.all([
      getTax(this.obj),
      getCoopTax(this.obj),
      getFrontierTax(this.obj),
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
      if(res2.result == 1) this.coop_income.forEach( (item,index) => {   // 伙伴
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

      if(res3.result == 1) this.free_tax.forEach( (item,index) => {   // 合作社边民
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
.tax {
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
