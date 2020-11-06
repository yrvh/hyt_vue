<template>
  <div class="list">
    <van-nav-bar left-text="返回" :title="in_title" left-arrow border fixed z-index="50" placeholder @click-left="clickLeft()"/>

    <van-search v-model="param.name" background="rgba(230,230,230,0.3)" :placeholder="pholder"
                clearable clear-trigger="always" show-action>
      <template #action>
        <div @click="handleSearch">搜索</div>
      </template>
    </van-search>
    <div class="p-holder"></div>

    <!--  筛选条件  -->
    <div class="filterbox">
      <van-cell v-show="show_date" title="选择录入日期" :value="date" @click="slc_date = true" is-link/>
      <van-calendar v-model="slc_date" type="range" title="录入日期" :min-date="min_date" :max-date="max_date"
                    @confirm="onConfirm" />
    </div>

    <div>7843598343489572390485723389457238945723389457</div>

    <!--  ================列表内容展示区=============   -->
    <van-empty v-if="is_empty" image="search" :description="pholder"></van-empty>

    <div v-else class="content">
      <van-pull-refresh v-model="is_refre" @refresh="onRefresh">
        <van-list v-model="is_loading" :finished="is_finished" finished-text="没有更多了"
                  :error.sync="is_error" error-text="请求失败,点击重新加载"
                  @load="onLoad()">
          <van-cell v-for="item in list" :key="item.id" is-link @click="onListItem(item.id)"
                    :icon="item.icon=='/img/R.png'? require('assets/img/login/logo_com.png'):item.icon"
                    :title="item.name" :value="item.tel" >
            <template #label>
              <div v-if="param.usertype==2">{{item.comname}}</div>
            </template>
          </van-cell>
        </van-list>
      </van-pull-refresh>
    </div>


  </div>
</template>

<script>
import {getUserList} from 'network/check'

export default {
  name: "List",
  data() {
    return {
      in_title: '',   // 当前进来的标题
      mgtype: null,   // 管理类型  ( 0用户管理, 1收入管理, 2发票, 3报税, 4业务合同, 5服务单位, 11收入查询
      // 筛选条件=================================
      date: '',   // 日期
      slc_date: false,   // 是否显示日期的 选择器
      min_date: new Date(2016,0,1),
      max_date: new Date(),

      activeNames:['1','2','3','4','5'],   // =========================
      is_popup: false,   // 是否展示  弹出层
      pholder: '请输入查询条件....',   // 提示 占位符
      is_getlist: true,   // 自动还是手动 获取列表数据


      // 请求列表数据的  相关参数========================================
      param: {
        pass_app: '',
        tel_app: '',
        code_app: '',
        page: 1,   // 第几页
        rows: 15,   // 每页显示的条数

        name: '',   // 搜索字段
        stauts: null,
        usertype: null,
        yxyid: '',   // 营销员
        ywyid: '',   // 业务员
        hhrid: '',   // 合作伙伴
        isDL: 0,   // 注册类型 (全部0  代理1  自行2)

        yztype: '',   //业者类型(有无单位)
        sfid: 0,   // 单位(全部0)
        hhrtype: 0,   // 合作伙伴类型(0全部  1个人 2单位  3合作社)
      },

      list: [],   // 列表数据

      is_loading: true,   // 列表是否处于加载状态=======================
      is_finished: false,   // 是否加载完成
      is_error: false,   // 是否出现加载失败
      is_refre: false,   // 是否下拉刷新
      is_empty: true,   // 列表长度是否为空
    }
  },
  methods: {
    formatDate(date) {
      console.log("打印了89898")
      console.log(date)
      return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`;
    },
    onConfirm(date) {
      const [start, end] = date;
      this.slc_date = false;
      this.date = `${this.formatDate(start)} - ${this.formatDate(end)}`;
    },


    showPopup() {   // 点击--> 展示弹出层
      this.is_popup = true
    },
    onListItem(id) {   // 点击跳转到 商秘协议页面
      if (this.param.usertype == 2) this.$router.push({
        path: '/checkhome_ud_company',
        query: {id}
      })
      else this.$router.push({
        path: '/checkhome_ud_person',
        query: {id}
      })
    },
    handleSearch() {   // 点击搜索
      // this.is_getlist = true
      this.is_loading = true
      this.onLoad()
    },
    onLoad() {   // 加载列表数据
      // this.is_error = true   // 加载失败时触发
      // fetchSomeThing().catch(() => {
      //   this.is_error = true;
      // });
      if(this.is_getlist){  // 自动获取列表
        if (this.is_refre) {   // 如果是下拉刷新的情况下, 清空列表
          this.list = []
          this.is_refre = false
        }

        getUserList(this.param).then( res=> {   // 0是无单位业者
          this.list.push(...res.rows)
          // 加载状态结束
          this.is_loading = false;
          // 全部加载完成
          if(this.list.length == res.total) this.is_finished = true;

          // 空状态的判断
          if(this.list.length == 0) {
            this.is_empty = true;   // 如果没数据 设为空状态
          }
          else{
            this.is_empty = false;
          }
          this.param.page ++;   // 如果成功了  页码自动加1
        })
      }
      else{
        this.is_loading = false
        this.is_empty = true
      }

    },
    // 下拉刷新
    onRefresh() {
      this.is_finished = false;
      this.is_loading = true;
      this.onLoad();
    },
  },
  computed: {
    show_date() {   // 是否展示展示日期
      console.log(this.mgtype);
      console.log(this.param.stauts)
      if(this.mgtype==4) {
        return false
      }
      else if(this.mgtype==1 && this.param.stauts==1) {
        return false
      }
      else {
        return true
      }
    }
  },
  created() {
    this.param.pass_app = this.$store.state.login.password
    this.param.tel_app = this.$store.state.login.tel
    this.param.code_app = this.$store.state.login.code_app

    this.param.stauts = this.$route.query.in_status
    this.param.usertype = this.$route.query.usertype
    this.mgtype = this.$route.query.mgtype
    this.in_title = this.$route.query.in_title
    this.onLoad()
  }
}
</script>

<style scoped lang="scss">
.list{
  min-height: 100vh;

  padding-bottom: 50px;
  .van-search {
    background-color: #ee3333;
    position: fixed;
    z-index: 10;
    left: 0;
    right: 0;
    top: 47px;
  }
  .p-holder { height: 55px;}
  .filterbox {
    background-color: rgba(230,230,250,0.3);
  }



  .myfilter {
    color: var(--cl-text-t9);
    .van-icon { font-size: 19px; font-weight: 700;}
  }

  .van-popup {   // 弹出层的样式
    background-color: #ee3333;
    height: 100%;
    width: 85%;
    .filter-title {
      background-color: var(--cl-bg-tF0);
      height: 50px;
      display: flex;
      align-items: flex-end;
      padding-left: 10px;
      padding-bottom: 5px;
    }
    .tagbox { display: flex; justify-content: space-around; flex-wrap: wrap;}
    .van-tag {margin-right: 5px; margin-bottom: 10px;}
    .bottom-btn {
      //position: fixed;
      //left: 0;
      //right: 0;
      //bottom: 0;
      background-color: var(--cl-bg-tF0);
      height: 100px;
      padding-right: 20px;
      display: flex;
      justify-content: flex-end;
      align-items: center;
      .van-button { width: 100px !important; }
      .reset {border-bottom-left-radius: 22px; border-top-left-radius: 22px}
      .confirm {border-bottom-right-radius: 22px; border-top-right-radius: 22px}
    }
  }



  .van-empty {margin-top: 200px;}   // 列表无数据时...

  .content {   // 列表主数据展示区 样式
    margin-top: 110px;
    .van-cell {
      color: var(--cl-text-t9);
      .van-icon { font-size: 19px; font-weight: 700;}
    }
  }

}

</style>
