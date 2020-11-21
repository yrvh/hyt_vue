<template>
  <div class="invoice-detail">
    <van-nav-bar title='发票信息' left-text='返回' left-arrow border center fixed 
                placeholder z-index='50' @click-left='clickLeft()'></van-nav-bar>

    <van-cell-group title='发票详情'>
      <van-cell title='发票抬头' border center :value='detail.comname' />
      <van-cell title='项目名称' border center :value='detail.name' />
      <van-cell title='服务内容' border center :value='detail.descripts' />
      <van-cell title='开票日期' border center :value='detail.adddate' />
      <van-cell title='开票金额' border center :value='detail.money +" 元"' />            
    </van-cell-group>

  </div>
</template>

<script>
import {getInvoiceDetail} from 'network/freecom'
export default {
  name: 'InvoiceDetail',
  data() {
    return {
      obj: {
        tel_app: '',
        pass_app: '',
        code_app: '',
        id: '',
      },
      detail:{
        comname: '',   // 抬头名称
        name: '',   // 项目名称
        descripts: '',   // 服务内容
        adddate: '',   // 开票日期
        money: '',   // 开票金额
      }
    }
  },
  methods: {
        
  },
  computed: {
    
  },
  created() {
    this.obj.pass_app = this.$store.state.login.password
    this.obj.tel_app = this.$store.state.login.tel
    this.obj.code_app = this.$store.state.login.code_app

    this.obj.id = this.$route.query.id
    
    getInvoiceDetail(this.obj).then( res => {
      this.detail = res
    })
  }
}
</script>

<style scoped lang='scss'>
.invoice-detail {
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