<template>
  <div class="deal-add">
    <van-nav-bar :title='showTitle' left-text='返回' left-arrow border center fixed 
                placeholder z-index='50' @click-left='clickLeft()'></van-nav-bar>

    <van-cell-group title='公司基本信息'>
      <van-cell v-if="in_status==99" title="选择抬头" :value="cap_text" required is-link border center @click="cap_pop = true"></van-cell>
      <van-popup v-model="cap_pop" overlay position="bottom" :duration="0.2" round lock-scroll
                  close-on-popstate get-container=".deal-add">
        <van-picker :columns="cap_list" title="抬头" show-toolbar
                    @cancel="cap_pop = false" @confirm="onConfirm">
        </van-picker>
      </van-popup>

      <van-field v-model="detail.code" label="编号" placeholder="请输入编号" type="text"
                   maxlength="18" required clearable clear-trigger="always" name="code"
                   :rules="detail_rules.code"/>
      <van-field v-model="detail.title" label="合同标题" placeholder="请输入合同标题" type="text" 
                  maxlength="24" required clearable clear-trigger="always" name="title"
                  :rules="detail_rules.title"/>
      <van-field v-model="detail.files" label="合同内容" placeholder="请输入合同内容" type="text"
                  maxlength="32" required clearable clear-trigger="always" name="files"
                  :rules="detail_rules.files"/>
    </van-cell-group>

    <van-cell v-if="showReasons" class="reasons" title-style="color: #ee3333;"
                title="退回原因" border center :value="reasons"/>
    
    <div class="footer">
      <van-button v-show="false" text="删除" color="#bbbbbb" :disabled="del_dis"  size="large" @click="del_pop=true"></van-button>
      <van-button text="确认完成" color="#7EB6FF" :loading="comfirming" size="large"
              loading-text="确认中..." @click="onComfirm"></van-button>
    </div>

    <!-- 删除的 dialog弹出层 -->
    <van-dialog v-model="del_pop" title="确认删除 ：" width="320px" message="删除后将无法恢复!" confirm-button-text="删除"
                :show-cancel-button="true" confirm-button-color="#7EB6FF" cancelButtonColor="#666666" 
                close-on-click-overlay @confirm="onCfmDel" @cancel="del_pop=false"></van-dialog>

  </div>
</template>

<script>
import {getDealDetail, addDeal, delDeal, getTtData} from 'network/free'
export default {
  name: 'DealAdd',
  data() {
    return {
      del_dis: false,   // 删除按钮禁用
      comfirming: false,   // 提交中...
      del_pop: false,   // 弹出 删除窗口
      
      reasons: '',   // 展示退回的原因
      in_status: null,   // 进入时的状态值
      
      cap_pop: false,   // 是否显示 抬头的选择器
      cap_list: [],   // 抬头列表
      cap_text: '',   // 选中的抬头名称
      obj: {
        tel_app: '',
        pass_app: '',
        code_app: '',
        id: '',   // 新增时: 选中的抬头id,,, 修改时: 该条记录的id
      },
      detail: {
        code: '',   // 编号
        title: '',   // 合同标题
        files: '',   // 合同内容
      },

      detail_rules: {   // 格式校验
      },
    }
  },
  methods: {
    onConfirm({id, text}) {   // 确定当前 抬头============================
      this.cap_text = text
      this.obj.id = id
      this.cap_pop = false
    },

    onCfmDel() {   // 提交了 删除命令
      this.del_pop = false   // 隐藏弹出框
      delDeal(this.obj).then( res => {        
        if(res.result==1) {
          this.$toast.success(res.message + '请到待提交状态:完成最终提交!')
          setTimeout(() => {
            this.clickLeft()
          }, 1000)
        }
        else if(res.result==0) {
          this.$toast.fail(res.message)
        }
      })
    },
    onComfirm() {   // 点击了 完成
      this.comfirming = true   // 提交中...
      this.del_dis = true   // 禁用删除按钮...
      
      addDeal({...this.obj, ...this.detail}).then( res => {
        if(res.result==1) {
          this.$toast.success(res.message)
          setTimeout(() => {
            this.clickLeft()
          }, 1000)
        }
        else if(res.result==0) {
          this.$toast.fail(res.message)
          this.comfirming = false   // 取消 提交中
          this.del_dis = false   // 取消 删除禁用
        }
      })
    },
  },
  computed: {
    showTitle() {   // 是否显示抬头
      if(this.in_status == 99) return '新增业务合同'
      else if(this.in_status == 5) return '修改业务合同'
    },
    showReasons() {   // 显示退回原因
      let reason = Boolean(this.reasons)
      return reason
    }
  },
  created() {
    this.obj.pass_app = this.$store.state.login.password
    this.obj.tel_app = this.$store.state.login.tel
    this.obj.code_app = this.$store.state.login.code_app

    
    this.in_status = this.$route.query.in_status
    if(this.in_status==5) {   // 修改时 获取详情
      this.obj.id = this.$route.query.id || ''

      getDealDetail(this.obj).then( res => {
        this.reasons = res.reasons
        this.detail.code = res.code
        this.detail.title = res.title
        this.detail.files = res.imgs
      })
    }
    
  },
  mounted() {
    getTtData(this.obj).then(res => {
      this.cap_list= res
    })
  },
}
</script>

<style scoped lang='scss'>
.deal-add {
  padding: 0 10px;
  .reg-status{ margin-top: 10px; }
  .reasons { margin-top: 10px;}
  .info-box {
    .addr-item,.card-item {
      border: 1px dashed #7EB6FF;
      margin-bottom: 15px;
      .van-radio {margin: 8px 0 0 8px;}
    }
    .more-btn { display: flex; justify-content: space-between;}
    .van-button {flex: 1;}
  }
  .addr-item {}
  .card-item {}
  
  .footer { 
    margin-top: 50px;
    display: flex; justify-content: space-between;
  }
  
}
</style>

