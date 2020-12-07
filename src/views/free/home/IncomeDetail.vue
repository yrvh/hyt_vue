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
    
    <div class="footer" v-show="in_status==0">
      <van-button text="删除" color="#bbbbbb" :disabled="del_dis"  size="large" @click="del_pop=true"></van-button>
      <van-button text="提交" color="#7EB6FF" :loading="comfirming" size="large"
              loading-text="提交中..." @click="onComfirm"></van-button>
    </div>

    <!-- 删除的 dialog弹出层 -->
    <van-dialog v-model="del_pop" title="确认删除 ：" width="320px" message="删除后将无法恢复!" confirm-button-text="删除"
                :show-cancel-button="true" confirm-button-color="#7EB6FF" cancelButtonColor="#666666" 
                close-on-click-overlay @confirm="onCfmDel" @cancel="del_pop=false"></van-dialog>

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
import {getIncomeDetail,sendIncome,delIncome} from 'network/free'
export default {
  name: 'IncomeDetail',
  data() {
    return {
      del_dis: false,   // 删除按钮禁用
      comfirming: false,   // 提交中...
      del_pop: false,   // 弹出 删除dialog窗口
      
      cfm_deal: false,   // 是否查看了商秘协议
      xy_pop: false,   // 文本协议的 弹出层
      
      in_status: null,   // 进入时的状态值
      obj: {
        tel_app: '',
        pass_app: '',
        code_app: '',
        tel_sid: '',   // 用户id
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
    onCfmDel() {   // 提交了 删除命令
      this.del_pop = false   // 隐藏弹出框
      delIncome(this.obj).then( res => {        
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
    onComfirm() {   // 点击了 确认
      if(this.cfm_deal) {   // 协议已经查看完毕
        this.comfirming = true   // 确认中...
        this.backdis = true   // 禁用删除按钮...
        sendIncome({...this.obj, ids: this.obj.id}).then( res => {        
          if(res.result==1) {
            this.$toast.success(res.message)
            setTimeout(() => {
              this.clickLeft()
            }, 1000)
          }
          else if(res.result==0) {
            this.$toast.fail(res.message)
            this.comfirming = false   // 取消 确认中
            this.backdis = false   // 取消 删除禁用
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