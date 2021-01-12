<template>
  <div class="user">
    <van-nav-bar left-text="返回" left-arrow border fixed z-index="50" placeholder @click-left="onBack"/>
    <van-tabs type="card" color="#7EB6FF" v-model="tab_mark" animated swipeable @change="onChange">
      <!--     单位用户       -->
      <van-tab title="单位用户" :badge="com_arr[0].value==0? '':com_arr[0].value">

        <van-cell v-for="item in com_arr" :key="item.id" :title="item.title"
                  :value="item.value" :value-class="(item.isright_css && item.value>0)? 'right-css':''"
                  is-link :to="{path: '/check_comlist', query: {in_title: item.title, in_status: item.status}}"/>
      </van-tab>

      <!--     业者用户    -->
      <van-tab title="业者用户" :badge="free_arr[0].value==0? '':free_arr[0].value">

        <van-cell v-for="item in free_arr" :key="item.id" :title="item.title"
                  :value="item.value" :value-class="(item.isright_css && item.value>0)? 'right-css':''"
                  is-link :to="{path: '/check_freelist', query: {in_title: item.title, in_status: item.status }}"/>
      </van-tab>

      <!--     合作伙伴 (个人)      -->
      <van-tab title="合作伙伴(个人)" :badge="coop_arr[0].value==0? '':coop_arr[0].value">

        <van-cell v-for="item in coop_arr" :key="item.id" :title="item.title"
                  :value="item.value" :value-class="(item.isright_css && item.value>0)? 'right-css':''"
                  is-link :to="{path: '/check_cooplist', query: {in_title: item.title, in_status: item.status }}"/>
      </van-tab>

      <!--     合作伙伴 (单位)       -->
      <van-tab title="合作伙伴(单位)" :badge="coopcom_arr[0].value==0? '':coopcom_arr[0].value">

        <van-cell v-for="item in coopcom_arr" :key="item.id" :title="item.title"
                  :value="item.value" :value-class="(item.isright_css && item.value>0)? 'right-css':''"
                  is-link :to="{path: '/check_coopcomlist', query: {in_title: item.title, in_status: item.status }}"/>
      </van-tab>

      <!--     边民       -->
      <van-tab title="边民用户" :badge="frontier_arr[4].value==0? '':frontier_arr[4].value">

        <van-cell v-for="item in frontier_arr" :key="item.id" :title="item.title"
                  :value="item.value" :value-class="(item.isright_css && item.value>0)? 'right-css':''"
                  is-link :to="{path: '/check_frontierlist', query: {in_title: item.title, in_status: item.status }}"/>
      </van-tab>

      <!--     三方平台业者       -->
      <van-tab title="三方平台业者" :badge="third_arr[3].value==0? '':third_arr[3].value">

        <van-cell v-for="item in third_arr" :key="item.id" :title="item.title"
                  :value="item.value" :value-class="(item.isright_css && item.value>0)? 'right-css':''"
                  is-link :to="{path: '/check_thirdlist', query: {in_title: item.title, in_status: item.status }}"/>
      </van-tab>

      <!--     业务关系调整       -->
      <van-tab title="业务关系调整" :badge="relation_arr[0].value==0? '':relation_arr[0].value">

        <van-cell v-for="item in  relation_arr" :key="item.id" :title="item.title"
                  :value="item.value" :value-class="(item.isright_css && item.value>0)? 'right-css':''"
                  is-link :to="{path: '/check_relationlist', query: {in_title: item.title, in_status: item.status }}"/>
      </van-tab>

    </van-tabs>

  </div>
</template>

<script>
import { getUserMain } from "@/network/check";
import {SETMK} from '@/store/mutype'

export default {
  name: "User",
  components: {
  },
  data() {
    return {
      obj: {
        pass_app: '',
        code_app: '',
        tel_app: '',
        tel_sid: '',   // 用户id
      },

      tab_mark: 0,   // nav标签 标识符
      com_arr: [   // 单位主界面数据
       {
          id: 0,
          title: '待审核',
          value: '',
          status: 1,
          isright_css: true
        },
        {
          id: 1,
          title: '待完善资料',
          value: '',
          status: 3,
          isright_css: false
        },
        {
          id: 2,
          title: '待单位确认',
          value: '',
          status: 2,
          isright_css: false
        },
        {
          id: 3,
          title: '单位退回',
          value: '',
          status: 22,
          isright_css: false
        },
        {
          id: 4,
          title: '待营销员确认',
          value: '',
          status: 6,
          isright_css: false
        },
        {
          id: 5,
          title: '服务中',
          value: '',
          status: 8,
          isright_css: false
        },
        {
          id: 6,
          title: '审核退回',
          value: '',
          status: 11,
          isright_css: false
        },
        {
          id: 7,
          title: '重签协议中',
          value: '',
          status: 88,
          isright_css: false
        }
      ],
      free_arr: [   // 业者主界面数据
        {
          id: 0,
          title: '待审核',
          value: '',
          status: 7,
          isright_css: true
        },
        {
          id: 1,
          title: '待完善资料',
          value: '',
          status: 3,
        },
        {
          id: 2,
          title: '待业者确认',
          value: '',
          status: 4,
        },
        {
          id: 3,
          title: '业者退回',
          value: '',
          status: 44,
        },
        {
          id: 4,
          title: '待单位确认',
          value: '',
          status: 2,
        },
        {
          id: 5,
          title: '单位退回',
          value: '',
          status: 22,
        },
        {
          id: 6,
          title: '待完善个人信息',
          value: '',
          status: 33,
          isright_css: false
        },
        {
          id: 7,
          title: '待确认个人信息',
          value: '',
          status: 2,
          isright_css: false
        },
        {
          id: 8,
          title: '确认个人信息退回',
          value: '',
          status: 22,
          isright_css: false
        },
        {
          id: 9,
          title: '服务中',
          value: '',
          status: 8,
          isright_css: false
        },
        {
          id: 10,
          title: '审核退回',
          value: '',
          status: 77,
          isright_css: false
        },
        {
          id: 11,
          title: '重签协议中',
          value: '',
          status: 88,
          isright_css: false
        }
      ],
      coop_arr: [   // 个人合作伙伴 主界面数据
        {
          id: 0,
          title: '待审核',
          value: '',
          status: 7,
          isright_css: true
        },
        {
          id: 1,
          title: '待完善资料',
          value: '',
          status: 3,
          isright_css: false
        },
        {
          id: 2,
          title: '待合作伙伴确认',
          value: '',
          status: 4,
          isright_css: false
        },
        {
          id: 3,
          title: '合作伙伴退回',
          value: '',
          status: 44,
          isright_css: false
        },
        {
          id: 4,
          title: '待完善个人信息',
          value: '',
          status: 33,
          isright_css: false
        },
        {
          id: 5,
          title: '待确认个人信息',
          value: '',
          status: 2,
          isright_css: false
        },
        {
          id: 6,
          title: '确认个人信息退回',
          value: '',
          status: 22,
          isright_css: false
        },
        {
          id: 7,
          title: '营销员审核退回',
          value: '',
          status: 11,
          isright_css: false
        },
        {
          id: 8,
          title: '服务中',
          value: '',
          status: 8,
          isright_css: false
        },
        {
          id: 9,
          title: '主管审核退回',
          value: '',
          status: 77,
          isright_css: false
        },
        {
          id: 10,
          title: '重签协议中',
          value: '',
          status: 88,
          isright_css: false
        }
      ],
      coopcom_arr: [   // 单位合作伙伴 主界面数据
        {
          id: 0,
          title: '待审核',
          value: '',
          status: 1,
          isright_css: true
        },
        {
          id: 1,
          title: '待完善资料',
          value: '',
          status: 3,
          isright_css: false
        },
        {
          id: 2,
          title: '待单位确认',
          value: '',
          status: 2,
          isright_css: false
        },
        {
          id: 3,
          title: '单位退回',
          value: '',
          status: 22,
          isright_css: false
        },
        {
          id: 4,
          title: '待营销员确认',
          value: '',
          status: 6,
          isright_css: false
        },
        {
          id: 5,
          title: '服务中',
          value: '',
          status: 8,
          isright_css: false
        },
        {
          id: 6,
          title: '审核退回',
          value: '',
          status: 11,
          isright_css: false
        },
        {
          id: 7,
          title: '重签协议中',
          value: '',
          status: 88,
          isright_css: false
        }
      ],
      frontier_arr: [   // 边民 主界面数据
        {
          id: 0,
          title: '待完善个人信息',
          value: '',
          status: 33,
          isright_css: false
        },
        {
          id: 1,
          title: '待营销员确认',
          value: '',
          status: 1,
          isright_css: false
        },
        {
          id: 2,
          title: '营销员退回',
          value: '',
          status: 11,
          isright_css: false
        },
        {
          id: 3,
          title: '待完善商户资料',
          value: '',
          status: 2,
          isright_css: false
        },
        {
          id: 4,
          title: '待主管审核',
          value: '',
          status: 7,
          isright_css: false
        },
        {
          id: 5,
          title: '主管退回',
          value: '',
          status: 77,
          isright_css: false
        },
        {
          id: 6,
          title: '待合作社确认',
          value: '',
          status: 6,
          isright_css: false
        },
        {
          id: 7,
          title: '合作社退回',
          value: '',
          status: 66,
          isright_css: false
        },
        {
          id: 8,
          title: '服务中',
          value: '',
          status: 8,
          isright_css: false
        },
        {
          id: 9,
          title: '重签协议中',
          value: '',
          status: 88,
          isright_css: false
        }
      ],

      third_arr: [   // 三方平台业者 主界面数据
        {
          id: 0,
          title: '待完善个人信息',
          value: '',
          status: 3,
          isright_css: false
        },
        {
          id: 1,
          title: '待营销员确认',
          value: '',
          status: 2,
          isright_css: false
        },
        {
          id: 2,
          title: '营销员退回',
          value: '',
          status: 22,
          isright_css: false
        },
        {
          id: 3,
          title: '待主管审核',
          value: '',
          status: 7,
          isright_css: true
        },
        {
          id: 4,
          title: '主管退回',
          value: '',
          status: 77,
          isright_css: false
        },
        {
          id: 5,
          title: '待用户确认',
          value: '',
          status: 4,
          isright_css: false
        },
        {
          id: 6,
          title: '用户退回',
          value: '',
          status: 44,
          isright_css: false
        },
        {
          id: 7,
          title: '服务中',
          value: '',
          status: 8,
          isright_css: false
        },
        {
          id: 8,
          title: '重签协议中',
          value: '',
          status: 88,
          isright_css: false
        }
      ],
      relation_arr: [   // 业务关系调整
        {
          id: 0,
          title: '待审核',
          value: '',
          status: 0,
          isright_css: true
        },
        {
          id: 1,
          title: '审核退回',
          value: '',
          status: 2,
          isright_css: false
        },
        {
          id: 2,
          title: '审核通过',
          value: '',
          status: 1,
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
    
    this.obj.pass_app = this.$store.state.login.password
    this.obj.tel_app = this.$store.state.login.tel
    this.obj.code_app = this.$store.state.login.code_app
    this.obj.tel_sid = this.$store.state.login.sid

    this.$axios.all([
      getUserMain({...this.obj,usertype: 2, hhrtype: 0, yztype: '0,9'}),
      getUserMain({...this.obj,usertype: 1, hhrtype: 0, yztype: '0,1'}),
      getUserMain({...this.obj,usertype: 11, hhrtype: 1, yztype: 0}),
      getUserMain({...this.obj,usertype: 11, hhrtype: '2,3', yztype: 0}),
      getUserMain({...this.obj,usertype: 1, hhrtype: 0, yztype: 2}),
      getUserMain({...this.obj,usertype: 1, hhrtype: 0, yztype: 3}),
    ]).then(this.$axios.spread((res1,res2,res3,res4,res5,res6) => {
        if(res1.result == 1) this.com_arr[0].value = res1.dw_1
        if(res2.result == 1) this.free_arr[0].value = res2.yz_7
        if(res3.result == 1) this.coop_arr[0].value = res3.hhr_gr_7
        if(res4.result == 1) this.coopcom_arr[0].value = res4.dw_1
        if(res5.result == 1) this.frontier_arr[4].value = res5.bm_7
        if(res6.result == 1) this.third_arr[3].value = res6.bm_7
    }))
  },

}
</script>

<style scoped lang="scss">
.user {
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
