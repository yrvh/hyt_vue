<template>
  <div class="deal-detail">
    <van-nav-bar title='协议详情' left-text='返回' left-arrow border center fixed 
                placeholder z-index='50' @click-left='clickLeft()'></van-nav-bar>
      
    <div class="show-contract">
      <div class="contract-title">{{ctr_title}}</div>
      <div class="contract" v-if="detail.imgs_size==0" v-html="detail.imgs"></div>
      <div class="img-box" v-else>
        <van-image v-for="(item,index) in detail.imgs" :key="index" :src="item" fit="fill" 
                  width="22%" height="120px" radius="3px" @click="onPhoto(detail.imgs, index)"/>
      </div>
      <!-- <div class="contract" v-else-if="cid==2" v-html="detail.xy_ms"></div> -->
    </div>

    <div class="footer" v-show="in_status==2">
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

  </div>
</template>

<script>
import {getDealDetail,passDeal,nopassDeal} from 'network/freecom'
export default {
  name: 'DealDetail',
  data() {
    return {
      backdis: false,   // 退回按钮禁用
      comfirming: false,   // 提交中...
      backpop: false,   // 弹出编辑 退回原因的窗口
      cfmbacking: false,   // 退回中...
      reason: '',   // 填写退回原因
      
      cfm_deal: false,   // 是否查看了商秘协议
      
      ctr_title: '',   // 进入的协议标题
      in_status: null,   // 进入时的状态值
      obj: {
        tel_app: '',
        pass_app: '',
        code_app: '',
        id: '',
      },
      detail:{
        imgs: [],   // 协议内容
        imgs_size: 0,   // 图片数量
      }
    }
  },
  methods: {
    onPhoto(imgs, index) {   // 展示协议
      this.cfm_deal = true
      this.$imagePreview({
        images: imgs,
        closeable: true,
        startPosition: index
      })
      
    },
    onBack() {   // 点击了 退回
      this.backpop = true
    },
    onCfmBack() {   // 提交了 退回原因
      if(this.reason != '') {   // 退回原因 不能为空
        this.cfmbacking = true   // 退回中...
        nopassDeal({...this.obj, contents: this.reason}).then( res => {        
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
      if(this.cfm_deal || this.detail.imgs_size ==0) {   // 协议已经查看完毕
        this.comfirming = true   // 确认中...
        this.backdis = true   // 禁用退回按钮...
        passDeal(this.obj).then( res => {        
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
  },
  created() {
    this.obj.pass_app = this.$store.state.login.password
    this.obj.tel_app = this.$store.state.login.tel
    this.obj.code_app = this.$store.state.login.code_app

    this.obj.id = this.$route.query.id
    this.in_status = this.$route.query.in_status
    this.ctr_title = this.$route.query.title
    
    getDealDetail(this.obj).then( res => {
      if(res.result==1){ this.detail = res }
    })
  }
}
</script>

<style scoped lang='scss'>
.deal-detail {
  .reg-status{ margin-top: 10px; }
  .reasons { margin-top: 10px;}
  .footer { 
    position: fixed; bottom: 0; left: 0; right: 0; z-index: 50;
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
    background-color: #fff;
    text-align: center;
    .contract-title{
      margin-top: 2px; font-size: 18px;
      padding: 15px 0;
    }
    .contract {
      border-top: 1px solid #999;
      padding: 20px 8px 2px;
    }
    .img-box {
      display: flex; flex-wrap: wrap; justify-content: space-around;
      .van-image { margin-bottom: 20px;}
    }
  }
}
</style>