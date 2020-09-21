<template>
  <div class="reg-free">
    <van-nav-bar left-text="返回" title="商务秘书公司" left-arrow border fixed z-index="50" placeholder @click-left="clickLeft()"/>
    <div class="filterbox">
      <van-search background="#eeeeee" placeholder="请输入公司全称/统一社会信用代码..." clearable show-action action-text="搜索"></van-search>
    </div>

    <!--  ================列表内容展示区=============   -->
    <van-empty v-if="is_empty" image="search" description="公司的全称 或 统一信用代码"></van-empty>

    <div v-else class="content">
      <van-pull-refresh v-model="is_refre" @refresh="onRefresh">
        <van-list v-model="is_loading" :finished="is_finished" finished-text="没有更多了"
                  :error.sync="is_error" error-text="请求失败,点击重新加载"
                  @load="onLoad">
          <van-cell v-for="item in list" :key="item" :title="item" />
        </van-list>
      </van-pull-refresh>
    </div>


  </div>
</template>

<script>
export default {
  name: "List",
  data() {
    return {
      in_status: null,   // 进入的状态
      is_popup: false,   // 是否展示  弹出层
      activeNames:['1','2','3','4','5'],
      is_loading: false,   // 列表是否处于加载状态
      is_finished: false,   // 是否加载完成
      is_error: false,   // 是否出现加载失败
      is_refre: false,   // 是否下拉刷新
      is_empty: false,   // 列表长度是否为空
      list: []   // 列表数据
    }
  },
  mounted() {
    this.in_status = this.$route.query.in_status
    // console.log(this.$route.query.in_status)

  },
  methods: {
    onLoad() {
      // this.is_error = true   // 加载失败时触发
      // fetchSomeThing().catch(() => {
      //   this.is_error = true;
      // });

      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
      setTimeout(() => {
        // 是否下拉刷新
        if (this.is_refre) {
          this.list = []
          this.is_refre = false
        }

        for (let i = 0; i < 0; i++) {
          this.list.push(this.list.length + 1);
        }
        // 加载状态结束
        this.is_loading = false;

        // 数据全部加载完成
        if (this.list.length >= 0) {
          this.is_finished = true;
        }
      }, 1000);
      if(this.list.length == 0) {
        this.is_empty = true;   // 如果没数据 设为空状态
      }

    },
    // 下拉刷新
    onRefresh() {
      // 清空列表数据
      this.is_finished = false;
      // 重新加载数据
      // 将 loading 设置为 true，表示处于加载状态
      this.is_loading = true;
      this.onLoad();
    },
  }
}
</script>

<style scoped lang="scss">
.reg-free{
  min-height: 100vh;
  //background-color: #34AEFF;
  padding-bottom: 50px;
  .filterbox {
    position: fixed;
    z-index: 10;
    left: 0;
    right: 0;
    top: 47px;
  }
  .content {
    margin-top: 110px;
    .van-cell {
      color: var(--cl-text-t9);
      .van-icon { font-size: 19px; font-weight: 700;}
    }
  }
  .van-empty {margin-top: 200px;}

}

</style>