<template>
  <div class="income-detail">
    <van-nav-bar title='收入信息' left-text='返回' left-arrow border center fixed 
                placeholder z-index='50' @click-left='clickLeft()'></van-nav-bar>

    <van-cell-group title='服务项目信息'>
      <van-cell title='项目名称' border center :value='detail.name' />
      <van-cell title='服务内容' border center :value='detail.descripts' />
      <van-cell title='服务周期' border center :value='detail.zq' />
      <van-cell title='付款方名称' border center :value='detail.ttname' />
      <van-cell title='付款账号' border center :value='detail.fk_code' />
      <van-cell title='收款方商户名' border center :value='detail.com_yz_name.name' />
      <van-cell title='收款方账号' border center :value='detail.yhcard_dg_code' />
      <van-cell title='付款金额' border center :value='detail.fkmoney +" 元"' />            
    </van-cell-group>
    <van-cell-group title='收款方个人信息'>
      <van-cell title='收款人' border center :value='detail.yzname' />
      <van-cell title='开户行' border center :value='detail.yhcard_ds_khh' />
      <van-cell title='个人银行账号' border center :value='detail.yhcard_ds_code' />
      <van-cell title='税后净收入' border center :value='detail.ysmoney +" 元"' />
    </van-cell-group>

    <van-cell-group title="该收入相关协议">
      <van-cell title="业务合同" is-link border center @click="onPhoto(detail.imgs)" />
    </van-cell-group>

    <van-cell v-if="showReasons" class="reasons" title-style="color: #ee3333;"
                title="退回原因" border center :value="detail.reasons"/>
    
    <div class="footer" v-show="in_status==1">
      <van-button text="退回" color="#bbbbbb" :disabled="backdis"  size="large"
              loading-text="退回中..." @click="onBack"></van-button>
      <van-button text="确认" color="#7EB6FF" :loading="comfirming" size="large"
              loading-text="提交中..." @click="onComfirm"></van-button>
    </div>

    <!-- 退回原因的弹出层 -->
    <van-popup v-model="backpop" overlay position="center" duration="0.3"
                lock-scroll close-on-popstate closeable>
      <div class="content-back">
        <van-field v-model="reason" label="退回原因" placeholder="请输入退回原因"
                  required clearable clear-trigger="always" name="reason"/>
        <van-button text="确认退回" color="#7EB6FF" :loading="cfmbacking" block
                    loading-text="退回中..." @click="onCfmBack"></van-button>
      </div>
    </van-popup>

    <!-- 文本协议 的弹出层 -->
    <van-popup v-model="xy_pop" overlay position="center" duration="0.3"
                lock-scroll close-on-popstate closeable>
      <div class="show-contract">
        <!-- <van-nav-bar title="协议详情" left-text="返回" left-arrow border
                    fixed placeholder z-index="50" @click-left="clickLeft()"></van-nav-bar> -->
        <div class="contract-title">协议详情</div>
        <div class="contract" v-html="detail.imgs"></div>
        <!-- <div class="contract" v-else-if="cid==2" v-html="detail.xy_ms"></div> -->
      </div>
    </van-popup>

  </div>
</template>

<script>
import {getIncomeDetail,passIncome,nopassIncome} from 'network/freecom'
export default {
  name: 'IncomeDetail',
  data() {
    return {
      backdis: false,   // 退回按钮禁用
      comfirming: false,   // 提交中...
      backpop: false,   // 弹出编辑 退回原因的窗口
      cfmbacking: false,   // 退回中...
      reason: '',   // 填写退回原因
      
      cfm_deal: false,   // 是否查看了商秘协议
      xy_pop: false,   // 文本协议的 弹出层
      
      in_status: null,   // 进入时的状态值
      obj: {
        tel_app: '',
        pass_app: '',
        code_app: '',
        id: '',
      },
      detail:{
        name: '',   // 项目名称
        descripts: '',   // 服务内容
        zq: '',   // 服务周期
        ttname: '',   // 付款方名称
        fk_code: '',   // 付款账号
        
        yhcard_dg_khh: '',   // 对公 收款方开户行
        yhcard_dg_kname: '',   // 对公 收款方开户名
        yhcard_dg_code: '',   // 对公 收款方银行账号
        fkmoney: '',   // 付款金额

        yzname: '',   // 收款人
        yhcard_ds_khh: '',   // 对私 收款方开户行
        yhcard_ds_kname: '',   // 对私 收款方开户名
        yhcard_ds_code: '',   // 对私 收款方银行账号
        ysmoney: '',   // 税后净收入

        xy_type: '',   // 业务合同类型  1为图片   2.文本
        imgs: '',   //    业务合同内容
        reasons: '',   // 展示退回原因
        com_yz_name: {}, //收款方, 个体工商户信息对象 (com_yz_name.name收款方商户名)
      }
    }
  },
  methods: {
    onPhoto(imgs) {   // 展示协议
      this.cfm_deal = true
      if(this.detail.xy_type==1){   // 协议的格式是图片
        this.$imagePreview({
          images: imgs,
          closeable: true
        })
      }
      else if(this.detail.xy_type==2) {   // 协议的格式是 文本
        this.xy_pop = true
        // this.$router.push({
        //   path: '/cfm_contract',
        //   query: {
        //     cid: 2
        //   }
        // })
      }
      
    },
    onBack() {   // 点击了 退回
      this.backpop = true
    },
    onCfmBack() {   // 提交了 退回原因
      if(this.reason != '') {   // 退回原因 不能为空
        this.cfmbacking = true   // 退回中...
        nopassIncome({...this.obj, reasons: this.reason}).then( res => {        
          if(res.result==1) {
            this.$toast.success(res.message)
            setTimeout(() => {
              this.clickLeft()
            }, 1000)
          }
          else if(res.result==0) {
            this.$toast.fail(res.message)
            this.cfmbacking = false   // 取消 提交退回中
          }
        })
      }
      else {
        this.$toast.fail('请输入退回原因!')
      }
    },
    onComfirm() {   // 点击了 确认
      if(this.cfm_deal) {   // 协议已经查看完毕
        this.comfirming = true   // 确认中...
        this.backdis = true   // 禁用退回按钮...
        passIncome({...this.obj, ids: this.obj.id}).then( res => {        
          if(res.result==1) {
            this.$toast.success(res.message)
            setTimeout(() => {
              this.clickLeft()
            }, 1000)
          }
          else if(res.result==0) {
            this.$toast.fail(res.message)
            this.comfirming = false   // 取消 确认中
            this.backdis = false   // 取消 退回禁用
          }
        })
      }
      else {
        this.$toast.fail('请阅读协议内容!')
      }
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
    
    getIncomeDetail(this.obj).then( res => {
      this.detail = res
    })
  }
}
</script>

<style scoped lang='scss'>
.income-detail {
  .reg-status{ margin-top: 10px; }
  .reasons { margin-top: 10px;}
  .footer { 
    margin-top: 50px;
    display: flex; justify-content: space-between;
  }
  .content-back {
    background-color: #f7f7fe;
    width: 300px;
    padding: 50px 10px 10px 10px;
    border-radius: 10px;
    .van-button {
      margin-top: 50px;
    }
  }
  .show-contract {
    width: 90vw;
    height: 85vh;
    text-align: center;
    .contract-title{
      margin-top: 20px; font-size: 18px;
    }
    .contract {
      border-top: 1px solid #999; 
      margin-top: 20px; 
      padding: 20px 8px 20px;
    }
  }
}
</style>