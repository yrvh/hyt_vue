<template>
  <div class="list">
    <van-nav-bar left-text="返回" left-arrow border fixed z-index="50" placeholder @click-left="clickLeft()"/>
    <div class="filterbox">
      <van-search background="#eeeeee" placeholder="请输入..." clearable show-action action-text="搜索"></van-search>
      <!--  筛选按钮  -->
      <van-cell class="myfilter" title="筛选条件" arrow-direction="down" center @click="showPopup">
        <template #right-icon>
          <van-icon name="filter-o" />
        </template>
      </van-cell>
    </div>

    <!--  按钮  -->
    <van-popup v-model="is_popup" position="right" round close-on-popstate closeable>
      <div class="filter-title">筛选</div>

      <van-collapse v-model="activeNames">
        <van-collapse-item title="注册类型" name="1">
          <div class="tagbox">
            <van-tag size="medium" color="#bbb">全部类型</van-tag>
            <van-tag size="medium" color="#bbb">自行注册</van-tag>
            <van-tag size="medium" color="#bbb">代理注册</van-tag>
          </div>
        </van-collapse-item>
        <van-collapse-item title="合作伙伴" name="2">
          <div class="tagbox">
            <van-tag size="medium" color="#bbb">张三</van-tag>
            <van-tag size="medium" color="#bbb">张良</van-tag>
            <van-tag size="medium" color="#bbb">王五</van-tag>
            <van-tag size="medium" color="#bbb">李四</van-tag>
            <van-tag size="medium" color="#bbb">老李</van-tag>
          </div>
        </van-collapse-item>
        <van-collapse-item title="营销员" name="3">
          <div class="tagbox">
            <van-tag size="medium" color="#bbb">张三</van-tag>
            <van-tag size="medium" color="#bbb">张良</van-tag>
            <van-tag size="medium" color="#bbb">王五</van-tag>
            <van-tag size="medium" color="#bbb">李四</van-tag>
            <van-tag size="medium" color="#bbb">老李</van-tag>
          </div>
        </van-collapse-item>
        <van-collapse-item title="业务员" name="4">
          <div class="tagbox">
            <van-tag size="medium" color="#bbb">张三</van-tag>
            <van-tag size="medium" color="#bbb">张良</van-tag>
            <van-tag size="medium" color="#bbb">王五</van-tag>
            <van-tag size="medium" color="#bbb">李四</van-tag>
            <van-tag size="medium" color="#bbb">老李</van-tag>
            <van-tag size="medium" color="#bbb">张三</van-tag>
            <van-tag size="medium" color="#bbb">张良</van-tag>
            <van-tag size="medium" color="#bbb">王五</van-tag>
            <van-tag size="medium" color="#bbb">李四</van-tag>
            <van-tag size="medium" color="#bbb">老李</van-tag>
            <van-tag size="medium" color="#bbb">张三</van-tag>
            <van-tag size="medium" color="#bbb">张良</van-tag>
            <van-tag size="medium" color="#bbb">王五</van-tag>
            <van-tag size="medium" color="#bbb">李四</van-tag>
            <van-tag size="medium" color="#bbb">老李</van-tag>
            <van-tag size="medium" color="#bbb">张三</van-tag>
            <van-tag size="medium" color="#bbb">张良</van-tag>
            <van-tag size="medium" color="#bbb">王五</van-tag>
            <van-tag size="medium" color="#bbb">李四</van-tag>
            <van-tag size="medium" color="#bbb">老李</van-tag>
            <van-tag size="medium" color="#bbb">张三</van-tag>
            <van-tag size="medium" color="#bbb">张良</van-tag>
            <van-tag size="medium" color="#bbb">王五</van-tag>
            <van-tag size="medium" color="#bbb">李四</van-tag>
            <van-tag size="medium" color="#bbb">老李</van-tag>
            <van-tag size="medium" color="#bbb">张三</van-tag>
            <van-tag size="medium" color="#bbb">张良</van-tag>
            <van-tag size="medium" color="#bbb">王五</van-tag>
            <van-tag size="medium" color="#bbb">李四</van-tag>
            <van-tag size="medium" color="#bbb">老李</van-tag>
            <van-tag size="medium" color="#bbb">张三</van-tag>
            <van-tag size="medium" color="#bbb">张良</van-tag>
            <van-tag size="medium" color="#bbb">王五</van-tag>
            <van-tag size="medium" color="#bbb">李四</van-tag>
            <van-tag size="medium" color="#bbb">老李</van-tag>
            <van-tag size="medium" color="#bbb">张三</van-tag>
            <van-tag size="medium" color="#bbb">张良</van-tag>
            <van-tag size="medium" color="#bbb">王五</van-tag>
            <van-tag size="medium" color="#bbb">李四</van-tag>
            <van-tag size="medium" color="#bbb">老李</van-tag>
            <van-tag size="medium" color="#bbb">张三</van-tag>
            <van-tag size="medium" color="#bbb">张良</van-tag>
            <van-tag size="medium" color="#bbb">王五</van-tag>
            <van-tag size="medium" color="#bbb">李四</van-tag>
            <van-tag size="medium" color="#bbb">老李</van-tag>
            <van-tag size="medium" color="#bbb">张三</van-tag>
            <van-tag size="medium" color="#bbb">张良</van-tag>
            <van-tag size="medium" color="#bbb">王五</van-tag>
            <van-tag size="medium" color="#bbb">李四</van-tag>
            <van-tag size="medium" color="#bbb">老李</van-tag>
            <van-tag size="medium" color="#bbb">张三</van-tag>
            <van-tag size="medium" color="#bbb">张良</van-tag>
            <van-tag size="medium" color="#bbb">王五</van-tag>
            <van-tag size="medium" color="#bbb">李四</van-tag>
            <van-tag size="medium" color="#bbb">老李</van-tag>
            <van-tag size="medium" color="#bbb">张三</van-tag>
            <van-tag size="medium" color="#bbb">张良</van-tag>
            <van-tag size="medium" color="#bbb">王五</van-tag>
            <van-tag size="medium" color="#bbb">李四</van-tag>
            <van-tag size="medium" color="#bbb">老李</van-tag>
            <van-tag size="medium" color="#bbb">张三</van-tag>
            <van-tag size="medium" color="#bbb">张良</van-tag>
            <van-tag size="medium" color="#bbb">王五</van-tag>
            <van-tag size="medium" color="#bbb">李四</van-tag>
            <van-tag size="medium" color="#bbb">老李</van-tag>
            <van-tag size="medium" color="#bbb">张三</van-tag>
            <van-tag size="medium" color="#bbb">张良</van-tag>
            <van-tag size="medium" color="#bbb">王五</van-tag>
            <van-tag size="medium" color="#bbb">李四</van-tag>
            <van-tag size="medium" color="#bbb">老李</van-tag>
            <van-tag size="medium" color="#bbb">张三</van-tag>
            <van-tag size="medium" color="#bbb">张良</van-tag>
            <van-tag size="medium" color="#bbb">王五</van-tag>
            <van-tag size="medium" color="#bbb">李四</van-tag>
            <van-tag size="medium" color="#bbb">老李</van-tag>
            <van-tag size="medium" color="#bbb">张三</van-tag>
            <van-tag size="medium" color="#bbb">张良</van-tag>
            <van-tag size="medium" color="#bbb">王五</van-tag>
            <van-tag size="medium" color="#bbb">李四</van-tag>
            <van-tag size="medium" color="#bbb">老李</van-tag>
            <van-tag size="medium" color="#bbb">张三</van-tag>
            <van-tag size="medium" color="#bbb">张良</van-tag>
            <van-tag size="medium" color="#bbb">王五</van-tag>
            <van-tag size="medium" color="#bbb">李四</van-tag>
            <van-tag size="medium" color="#bbb">老李</van-tag>
            <van-tag size="medium" color="#bbb">张三</van-tag>
            <van-tag size="medium" color="#bbb">张良</van-tag>
            <van-tag size="medium" color="#bbb">王五</van-tag>
            <van-tag size="medium" color="#bbb">李四</van-tag>
            <van-tag size="medium" color="#bbb">老李</van-tag>
            <van-tag size="medium" color="#bbb">张三</van-tag>
            <van-tag size="medium" color="#bbb">张良</van-tag>
            <van-tag size="medium" color="#bbb">王五</van-tag>
            <van-tag size="medium" color="#bbb">李四</van-tag>
            <van-tag size="medium" color="#bbb">老李</van-tag>
          </div>
        </van-collapse-item>
        <van-collapse-item title="是否分配业务" name="5">
          <div class="tagbox">
            <van-tag size="medium" color="#bbb">张三</van-tag>
            <van-tag size="medium" color="#bbb">张良</van-tag>
            <van-tag size="medium" color="#bbb">王五</van-tag>
            <van-tag size="medium" color="#bbb">李四</van-tag>
            <van-tag size="medium" color="#bbb">老李</van-tag>
          </div>
        </van-collapse-item>
      </van-collapse>

      <div class="bottom-btn">
        <van-button class="reset" text="重置" color="linear-gradient(90deg, #8EC6FF, #7EB6FF)"></van-button>
        <van-button class="confirm" text="确定" color="linear-gradient(90deg, #7EB6FF,#5E96DF)"></van-button>
      </div>
    </van-popup>

    <!--  ================列表内容展示区=============   -->
    <div class="content">
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
      list: []   // 列表数据
    }
  },
  mounted() {
    this.in_status = this.$route.query.in_status
    // console.log(this.$route.query.in_status)

  },
  methods: {
    showPopup() {
      this.is_popup = true
    },
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

        for (let i = 0; i < 10; i++) {
          this.list.push(this.list.length + 1);
        }
        // 加载状态结束
        this.is_loading = false;

        // 数据全部加载完成
        if (this.list.length >= 40) {
          this.is_finished = true;
        }
      }, 1000);
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
.list{
  background-color: #34AEFF;
  padding-bottom: 50px;
  .filterbox {
    position: fixed;
    z-index: 10;
    left: 0;
    right: 0;
    top: 47px;
  }
  .myfilter {
    color: var(--cl-text-t9);
    .van-icon { font-size: 19px; font-weight: 700;}
  }

  .van-popup {
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

  .content {
    margin-top: 110px;
    .van-cell {
      color: var(--cl-text-t9);
      .van-icon { font-size: 19px; font-weight: 700;}
    }
  }

}

</style>