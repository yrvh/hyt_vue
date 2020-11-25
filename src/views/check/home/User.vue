<template>
  <div class="user">
    <van-nav-bar left-text="返回" left-arrow border fixed z-index="50" placeholder @click-left="onBack"/>
    <van-tabs type="card" color="#7EB6FF" v-model="tab_mark" animated swipeable @change="onChange">
      <!--     单位用户       -->
      <van-tab title="单位用户" :badge="com_arr[0].value==0? '':com_arr[0].value">

        <van-cell v-for="item in com_arr" :key="item.id" :title="item.title"
                  :value="item.value" :value-class="(item.isright_css && item.value>0)? 'right-css':''"
                  is-link :to="{path: '/checkhome_ulist', query: {in_title: item.title, in_status: item.status, usertype: 2 }}"/>
      </van-tab>

      <!--     业者用户    -->
      <van-tab title="业者用户" :badge="free_arr[0].value==0? '':free_arr[0].value">

        <van-cell v-for="item in free_arr" :key="item.id" :title="item.title"
                  :value="item.value" :value-class="(item.isright_css && item.value>0)? 'right-css':''"
                  is-link :to="{path: '/checkhome_ulist', query: {in_title: item.title, in_status: item.status, usertype: 1 }}"/>
      </van-tab>

      <!--     合作伙伴 (个人)      -->
      <van-tab title="合作伙伴(个人)" :badge="coop_arr[0].value==0? '':coop_arr[0].value">

        <van-cell v-for="item in coop_arr" :key="item.id" :title="item.title"
                  :value="item.value" :value-class="(item.isright_css && item.value>0)? 'right-css':''"
                  is-link :to="{path: '/checkhome_ulist', query: {in_title: item.title, in_status: item.status, usertype: 11 }}"/>
      </van-tab>

      <!--     合作伙伴 (单位)       -->
      <van-tab title="合作伙伴(单位)" :badge="coopcom_arr[0].value==0? '':coop_arr[0].value">

        <van-cell v-for="item in coop_arr" :key="item.id" :title="item.title"
                  :value="item.value" :value-class="(item.isright_css && item.value>0)? 'right-css':''"
                  is-link :to="{path: '/checkhome_ulist', query: {in_title: item.title, in_status: item.status, usertype: 11 }}"/>
      </van-tab>

      <!--     业务关系调整       -->
      <van-tab title="业务关系调整" :badge="relation_arr[0].value==0? '':coop_arr[0].value">

        <van-cell v-for="item in coop_arr" :key="item.id" :title="item.title"
                  :value="item.value" :value-class="(item.isright_css && item.value>0)? 'right-css':''"
                  is-link :to="{path: '/checkhome_ulist', query: {in_title: item.title, in_status: item.status, usertype: 11 }}"/>
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
          title: '待单位确认',
          value: '',
          status: 2,
          isright_css: false
        },
        {
          id: 2,
          title: '单位退回',
          value: '',
          status: 22,
          isright_css: false
        },
        {
          id: 3,
          title: '审核通过',
          value: '',
          status: 8,
          isright_css: false
        },
        {
          id: 4,
          title: '审核退回',
          value: '',
          status: 11,
          isright_css: false
        },
        {
          id: 5,
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
          title: '待业者确认',
          value: '',
          status: 4,
        },
        {
          id: 2,
          title: '业者退回',
          value: '',
          status: 44,
        },
        {
          id: 3,
          title: '审核通过',
          value: '',
          status: 8,
        },
        {
          id: 4,
          title: '审核退回',
          value: '',
          status: 77,
        },
        {
          id: 5,
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
          title: '待合作伙伴确认',
          value: '',
          status: 4,
          isright_css: false
        },
        {
          id: 2,
          title: '合作伙伴退回',
          value: '',
          status: 44,
          isright_css: false
        },
        {
          id: 3,
          title: '审核通过',
          value: '',
          status: 8,
          isright_css: false
        },
        {
          id: 4,
          title: '审核退回',
          value: '',
          status: 77,
          isright_css: false
        },
        {
          id: 5,
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
          status: 7,
          isright_css: true
        },
        {
          id: 1,
          title: '待单位确认',
          value: '',
          status: 4,
          isright_css: false
        },
        {
          id: 2,
          title: '单位退回',
          value: '',
          status: 44,
          isright_css: false
        },
        {
          id: 3,
          title: '审核通过',
          value: '',
          status: 8,
          isright_css: false
        },
        {
          id: 4,
          title: '审核退回',
          value: '',
          status: 77,
          isright_css: false
        },
        {
          id: 5,
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
          status: 7,
          isright_css: true
        },
        {
          id: 1,
          title: '审核退回',
          value: '',
          status: 4,
          isright_css: false
        },
        {
          id: 2,
          title: '审核通过',
          value: '',
          status: 44,
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
    let obj = {
      pass_app: this.$store.state.login.password,
      tel_app: this.$store.state.login.tel,
      code_app: this.$store.state.login.code_app,
    }
    this.$axios.all([
      getUserMain({...obj,usertype: 2}),getUserMain({...obj,usertype: 1}),getUserMain({...obj,usertype: 11})
    ]).then(this.$axios.spread((res1,res2,res3) => {
        if(res1.result == 1) this.com_arr.forEach( (item,index) => {   // 请求回来的 单位数据
          switch(index) {
            case 0:
              item.value = res1.dw_1
              break;
            case 1:
              item.value = res1.dw_2
              break;
            case 2:
              item.value = res1.dw_22
              break;
            case 3:
              item.value = res1.dw_8
              break;
            case 4:
              item.value = res1.dw_11
              break;
          }
        })

        if(res2.result == 1) this.free_arr.forEach( (item,index) => {   // 请求回来的 业者数据
          switch(index) {
            case 0:
              item.value = res2.yz_7
              break;
            case 1:
              item.value = res2.yz_4
              break;
            case 2:
              item.value = res2.yz_44
              break;
            case 3:
              item.value = res2.yz_8
              break;
            case 4:
              item.value = res2.yz_77
              break;
          }
        })

        if(res3.result == 1) this.coop_arr.forEach( (item,index) => {   // 请求回来的 伙伴数据
          switch(index) {
            case 0:
              item.value = res3.hhr_7
              break;
            case 1:
              item.value = res3.hhr_4
              break;
            case 2:
              item.value = res3.hhr_44
              break;
            case 3:
              item.value = res3.hhr_8
              break;
            case 4:
              item.value = res3.hhr_77
              break;
          }
        })
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
