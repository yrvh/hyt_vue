<template>
  <div class="cap-list">
    <van-nav-bar left-text="返回" :title="in_title" left-arrow border fixed z-index="50" 
    placeholder @click-left="clickLeft()">
     <template #right>
       <div v-text="show_check? '取消选择':'选择'" v-if="param.status==0"
            style="color: #1989FA;" @click="onSelect()">
        </div>
     </template>
    </van-nav-bar>

    <van-search v-model="param.name" background="rgba(230,230,230,0.3)" :placeholder="pholder"
                clearable clear-trigger="always" show-action>
      <template #action>
        <div @click="handleSearch">搜索</div>
      </template>
    </van-search>
    <div class="p-holder"></div>

    <!--  筛选条件  -->
    <div class="filterbox">
      <van-cell title="选择录入日期" :value="date" @click="slc_date = true" is-link/>
      <van-calendar v-model="slc_date" type="range" title="录入日期" :min-date="min_date" :max-date="max_date"
                    @confirm="onConfirm"/>
      
      <!-- <van-popup v-model="cap_pop" overlay position="bottom" :duration="0.2" round lock-scroll
                  close-on-popstate get-container=".deal-add">
        <van-datetime-picker v-model="currentDate" type="year-month" title="选择年月" :min-date="minDate"
                              :max-date="maxDate" :formatter="formatter"/>
      </van-popup> -->
    </div>

    <!--  ================列表内容展示区=============   -->
    <van-empty v-if="is_empty" image="search" :description="pholder"></van-empty>

    <div v-else class="content">
      <van-pull-refresh v-model="is_refre" @refresh="onRefresh">
        <van-list v-model="is_loading" :finished="is_finished" finished-text="没有更多了"
                  :error.sync="is_error" error-text="请求失败,点击重新加载" @load="onLoad()">

          <van-checkbox-group v-model="checklist" checked-color="#7EB6FF" ref="select_ref">
            <div v-for="item in list" :key="item.id">
              <van-cell  is-link @click="onListItem(item.id)" :title="item.name"> </van-cell>
              <van-checkbox shape="square" v-show="show_check" checked-color="#7EB6FF" :name="item.id"/>
            </div>
          </van-checkbox-group>

        </van-list>
      </van-pull-refresh>
      <!-- 底部的操作栏 -->
      <van-submit-bar v-show="show_check" :price="priceAll" button-text="提交" @submit="onSubmit" 
                      :loading="submiting" label="选中数量 : " :decimal-length="0" currency="">
        <van-checkbox v-model="check_all" @change="onChangeAll" icon-size="25px">全选</van-checkbox>
      </van-submit-bar>
    </div>


  </div>
</template>

<script>
import {getCapList, sendCap} from 'network/free'

export default {
  name: "CapList",
  data() {
    return {
      show_check: false,   // 是否展示复选框
      checklist: [],   // 被选中的列表
      check_all: false,   // 是否全选
      submiting: false,   // 是否处于提交中

      in_title: '',   // 当前进来的标题
      // 筛选条件=================================
      date: '',   // 日期
      slc_date: false,   // 是否显示日期的 选择器
      min_date: new Date(2016,0,1),
      max_date: new Date(),

      pholder: '请输入查询条件....',   // 提示 占位符
      is_getlist: true,   // 自动还是手动 获取列表数据

      list: [],   // 列表数据

      is_loading: true,   // 列表是否处于加载状态=======================
      is_finished: false,   // 是否加载完成
      is_error: false,   // 是否出现加载失败
      is_refre: false,   // 是否下拉刷新
      is_empty: true,   // 列表长度是否为空

      // 请求列表数据的  相关参数========================================
      obj: {
        pass_app: '',
        tel_app: '',
        code_app: '',
        tel_sid: '',   // 用户id
      },
      param: {
        page: 1,   // 第几页
        rows: 15,   // 每页显示的条数

        name: '',   // 搜索字段
        status: null,

        startdata: '',   // 开始时间
        enddata: '',   // 结束时间
      },
      
    }
  },
  methods: {
    handleSearch() {   // 点击搜索
      // this.is_getlist = true
      this.is_loading = true
      this.onLoad(true)
    },
    formatDate(date) {   // 格式化日期
      return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
    },
    onConfirm(date) {   // 确认了日期日期
      const [start, end] = date;
      this.slc_date = false;   // 隐藏日历选择器
      this.date = `${this.formatDate(start)} --- ${this.formatDate(end)}`;   // 展示到页面
      this.param.startdata = `${start.getFullYear()}-${date.getMonth() + 1}`
      this.param.enddata = `${end.getFullYear()}-${end.getMonth() + 1}`
    },
    onSelect() {  // 点击了 选择========================================
      this.show_check = !this.show_check
    },
    onChangeAll() {   // 全选切换时的 触发事件
      if(this.check_all) this.$refs.select_ref.toggleAll(this.check_all)
      else this.$refs.select_ref.toggleAll(this.check_all)
    },
    onSubmit() {   // 点击了 提交
      if(this.checklist.length == 0) {
        this.$toast({
          type: 'fail',
          position: 'middle',
          message: '选中数据为空!',
          duration: 4000,
        })
      }
      else {
        this.submiting = true
        let id = this.checklist.join(',')
        sendCap({...this.obj,id}).then( res => {
          if(res.result == 1) {
            this.$toast({
              type: 'success',
              position: 'middle',
              message: '提交成功!',
              duration: 3000,
            })
            this.submiting = false
            this.show_check = false
            this.clickLeft()   // 提交成功返回上一页
          }
          else if(res.result == 0){
            this.$toast({
              type: 'fail',
              position: 'middle',
              message: '提交失败!',
              duration: 4000,
            })
            this.submiting = false
          }
        })
      }
    },
    onLoad(re_page=false) {   // 加载列表数据==========================================
      if(re_page) {
        this.param.page = 1   // 是否需要将页码重置为1
        this.list = []   // 清空数组
      }
      // this.is_error = true   // 加载失败时触发
      // fetchSomeThing().catch(() => {
      //   this.is_error = true;
      // });
      if(this.is_getlist){  // 自动获取列表
        if (this.is_refre) {   // 如果是下拉刷新的情况下, 清空列表
          this.param.page = 1   // 是否需要将页码重置为1
          this.list = []
          this.is_refre = false
        }

        getCapList({...this.param, ...this.obj}).then( res=> {   // 获取列表页数据
          this.list.push(...res.rows)
          // 加载状态结束
          this.is_loading = false;
          // 全部加载完成
          if(this.list.length >= res.total) this.is_finished = true;

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
    onListItem(id) {   // 点击跳转到 详情页面==================================
      if(!this.show_check){
        if(this.param.status==3) {
          this.$router.push({
            path: '/free_capadd',
            query: { id, in_status: this.param.status }
          })
        }
        else {
          this.$router.push({
            path: '/free_capdetail',
            query: { id, in_status: this.param.status }
          })
        }
        
      }
    },
  },

  computed: {
    showDate() {   // 是否展示日期
      if(this.param.status==0) {
        return false
      }
      else {
        return true
      }
    },
    priceAll() {   // 选中的总数量
      return this.checklist.length*100
    }
  },
  created() {
    this.obj.pass_app = this.$store.state.login.password
    this.obj.tel_app = this.$store.state.login.tel
    this.obj.code_app = this.$store.state.login.code_app

    this.param.status = this.$route.query.in_status
    this.in_title = this.$route.query.in_title
    this.onLoad()
  }
}
</script>

<style scoped lang="scss">
.cap-list{
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
  .p-holder { height: 55px; }
  .filterbox {
    // background-color: rgba(230,230,250,0.3);
  }
  
  .van-empty {margin-top: 200px;}   // 列表无数据时...

  .content {   // 列表主数据展示区 样式
    margin-top: 10px;
    .van-cell {
      // color: var(--cl-text-t9); 
      .van-icon { font-size: 19px; font-weight: 700;}
    }
    .van-list {
      .van-checkbox {
        float: right;
        margin-right: 2px;
        transform: translateY(-20px);
      }
    }
  }

}

</style>
