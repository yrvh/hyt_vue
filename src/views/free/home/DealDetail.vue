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
import {getDealDetail,sendDeal,delDeal} from 'network/free'
export default {
  name: 'DealDetail',
  data() {
    return {
      del_dis: false,   // 删除按钮禁用
      comfirming: false,   // 提交中...
      del_pop: false,   // 弹出 删除窗口
      
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
        reasons: '',   // 展示退回原因
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
    onCfmDel() {   // 提交了 删除命令
      this.del_pop = false   // 隐藏弹出框
      delDeal(this.obj).then( res => {
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
      sendDeal({...this.obj, ids: this.obj.id}).then( res => {        
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