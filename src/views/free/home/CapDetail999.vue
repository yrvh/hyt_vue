<template>
  <div class="cap-detail">
    <van-nav-bar title='抬头信息' left-text='返回' left-arrow border center fixed 
                placeholder z-index='50' @click-left='clickLeft()'></van-nav-bar>

    <van-cell-group title='公司基本信息'>
      <van-cell title='抬头名称' border center :value='detail.name' />
      <van-cell title='纳税识别号' border center :value='detail.nscode' />
      <van-cell title='电子邮箱' border center :value='detail.email' />          
    </van-cell-group>
    <van-cell-group title='公司通讯地址'>
      <div class="addr-item" v-for="(item,index) in detail.addresses" :key="index">
        <van-cell title='是否默认' border center>
          <template #extra>
            <van-switch v-model="item.is_addrdef" active-color="#7EB6FF" inactive-color="#eeeeee"
                    active-value="1" inactive-value="0" disabled/>
          </template>
        </van-cell>
        <van-cell title='公司邮寄地址' border center :value='item.address' />
        <van-cell title='联系人' border center :value='item.username' />
        <van-cell title='联系电话' border center :value='item.tel' />
      </div> 
    </van-cell-group>
    <van-cell-group title='公司账户信息'>
      <div class="card-item" v-for="(item,index) in detail.yhcards" :key="index">
        <van-cell title='是否默认' border center>
          <template #extra>
            <van-switch v-model="item.is_carddef" active-color="#7EB6FF" inactive-color="#eeeeee"
                    active-value="1" inactive-value="0" disabled/>
          </template>
        </van-cell>
        <van-cell title='开户行' border center :value='item.kkh' />
        <van-cell title='开户名' border center :value='item.khname' />
        <van-cell title='银行卡号' border center :value='item.code' />
      </div>
    </van-cell-group>


    <van-cell v-if="showReasons" class="reasons" title-style="color: #ee3333;"
                title="退回原因" border center :value="detail.reasons"/>
    
    <div class="footer" v-show="in_status==0">
      <van-button text="删除" color="#bbbbbb" :disabled="del_dis"  size="large" @click="del_pop=true"></van-button>
      <van-button text="提交" color="#7EB6FF" :loading="comfirming" size="large"
              loading-text="提交中..." @click="onComfirm"></van-button>
    </div>

    <!-- 删除的 dialog弹出层 -->
    <van-dialog v-model="del_pop" title="确认删除 ：" width="320px" message="删除后将无法恢复!" confirm-button-text="删除"
                :show-cancel-button="true" confirm-button-color="#7EB6FF" cancelButtonColor="#666666" 
                close-on-click-overlay @confirm="onCfmDel" @cancel="del_pop=false"></van-dialog>

  </div>
</template>

<script>
import {getCapDetail,sendCap,delCap} from 'network/free'
export default {
  name: 'CapDetail',
  data() {
    return {
      del_dis: false,   // 删除按钮禁用
      comfirming: false,   // 提交中...
      del_pop: false,   // 弹出 删除窗口
            
      in_status: null,   // 进入时的状态值
      obj: {
        tel_app: '',
        pass_app: '',
        code_app: '',
        id: '',
      },
      detail:{
        name: '',   // 抬头名
        nscode: '',   // 纳税识别号
        email: '',   // 邮箱
        
        addresses: [],   // 地址数组
        yhcards: [],  // 银行账户信息数组
        reasons: '',   // 展示退回原因
      }
    }
  },
  methods: {
    onCfmDel() {   // 提交了 删除命令
      this.del_pop = false   // 隐藏弹出框
      delCap(this.obj).then( res => {        
        if(res.result==1) {
          this.$toast.success(res.message)
          setTimeout(() => {
            this.clickLeft()
          }, 1000)
        }
        else if(res.result==0) {
          this.$toast.fail(res.message)
        }
      })
    },
    onComfirm() {   // 点击了 提交
      this.comfirming = true   // 提交中...
      this.del_dis = true   // 禁用删除按钮...
      sendCap({...this.obj, ids: this.obj.id}).then( res => {        
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
    upPhoto() {   // 是否上传了照片
      if(this.detail.UpCardId && this.detail.DownCardId) return '已上传'
      else return '未上传'
    },
    showReasons() {
      let reason = Boolean(this.detail.reasons)
      return reason
    }
  },
  created() {
    this.obj.pass_app = this.$store.state.login.password
    this.obj.tel_app = this.$store.state.login.tel
    this.obj.code_app = this.$store.state.login.code_app

    this.obj.id = this.$route.query.id
    this.in_status = this.$route.query.in_status
    
    getCapDetail(this.obj).then( res => {
      this.detail = res
    })
  }
}
</script>

<style scoped lang='scss'>
.cap-detail {
  .reg-status{ margin-top: 10px; }
  .reasons { margin-top: 10px;}
  .addr-item,.card-item {
    border: 1px dashed #7EB6FF;
    margin-bottom: 10px;
  }
  .addr-item {}
  .card-item {}
  
  .footer { 
    margin-top: 50px;
    display: flex; justify-content: space-between;
  }
  
}
</style>