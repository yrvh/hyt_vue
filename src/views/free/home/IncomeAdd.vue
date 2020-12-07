<template>
  <div class="income-add">
    <van-nav-bar :title='showTitle' left-text='返回' left-arrow border center fixed 
                placeholder z-index='50' @click-left='clickLeft()'></van-nav-bar>

    <van-cell-group title='公司基本信息'>
      <van-cell v-if="in_status==99" title="选择抬头" :value="cap_text" required is-link border center @click="cap_pop = true"></van-cell>
      <van-popup v-model="cap_pop" overlay position="bottom" :duration="0.2" round lock-scroll
                  close-on-popstate get-container=".income-add">
        <van-picker :columns="cap_list" title="抬头" show-toolbar
                    @cancel="cap_pop = false" @confirm="onConfirmCap">
        </van-picker>
      </van-popup>

      <van-cell v-if="in_status==99" title="选择银行账户" :value="card_text" required is-link border center @click="card_pop = true"></van-cell>
      <van-popup v-model="card_pop" overlay position="bottom" :duration="0.2" round lock-scroll
                  close-on-popstate get-container=".income-add">
        <van-picker :columns="card_list" title="银行账户" show-toolbar
                    @cancel="card_pop = false" @confirm="onConfirmCard">
        </van-picker>
      </van-popup>

      <van-cell v-if="in_status==99" title="选择业务合同" :value="deal_text" required is-link border center @click="deal_pop = true"></van-cell>
      <van-popup v-model="deal_pop" overlay position="bottom" :duration="0.2" round lock-scroll
                  close-on-popstate get-container=".income-add">
        <van-picker :columns="deal_list" title="业务合同" show-toolbar
                    @cancel="deal_pop = false" @confirm="onConfirmDeal">
        </van-picker>
      </van-popup>

      <van-cell v-if="in_status==99" title="发票类型" :value="invoice_text" required is-link border center @click="invoice_pop = true"></van-cell>
      <van-popup v-model="invoice_pop" overlay position="bottom" :duration="0.2" round lock-scroll
                  close-on-popstate get-container=".income-add">
        <van-picker :columns="invoice_list" title="发票类型" show-toolbar
                    @cancel="invoice_pop = false" @confirm="onConfirmInvoice">
        </van-picker>
      </van-popup>

      <van-field v-model="detail.name" label="项目名称" placeholder="请输入项目名称" type="text"
                   maxlength="18" required clearable clear-trigger="always" name="name"
                   :rules="detail_rules.name"/>
      <van-field v-model="detail.descripts" label="服务内容" placeholder="请输入服务内容" type="text"
                   maxlength="18" required clearable clear-trigger="always" name="descripts"
                   :rules="detail_rules.descripts"/>

      <van-cell title="服务开始时间" :value="detail.starttime" required is-link border center @click="start_pop = true"></van-cell>
      <van-popup v-model="start_pop" overlay position="bottom" :duration="0.2" round lock-scroll
                  close-on-popstate get-container=".income-add">
        <van-datetime-picker
                  v-model="currentStart" type="year-month" title="开始时间" :min-date="minDate"
                  :max-date="maxDate" :formatter="formatter" @cancel="start_pop=false" @confirm="onConfirmStart" />
      </van-popup>

      <van-cell title="服务结束时间" :value="detail.endtime" required is-link border center @click="end_pop = true"></van-cell>
      <van-popup v-model="end_pop" overlay position="bottom" :duration="0.2" round lock-scroll
                  close-on-popstate get-container=".income-add">
        <van-datetime-picker
                  v-model="currentEnd" type="year-month" title="结束时间" :min-date="minDate"
                  :max-date="maxDate" :formatter="formatter" @cancel="end_pop=false" @confirm="onConfirmEnd" />
      </van-popup>

      <van-field v-model="detail.fkmoney" label="付款金额" placeholder="请输入付款金额" type="text"
                   maxlength="18" required clearable clear-trigger="always" name="fkmoney"
                   :rules="detail_rules.fkmoney"/>
    </van-cell-group>

    <van-cell v-if="showReasons" class="reasons" title-style="color: #ee3333;"
                title="退回原因" border center :value="reasons"/>
    
    <div class="footer">
      <van-button v-show="in_status==5" text="删除" color="#bbbbbb" :disabled="del_dis"  size="large" @click="del_pop=true"></van-button>
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
import {getIncomeDetailEdit, addIncome, editIncome, delIncome, 
        getTtData, getHtData, getYhcardData} from 'network/free'
export default {
  name: 'IncomeAdd',
  data() {
    return {
      del_dis: false,   // 删除按钮禁用
      comfirming: false,   // 提交中......
      del_pop: false,   // 弹出 删除窗口
      
      reasons: '',   // 展示退回的原因
      in_status: null,   // 进入时的状态值
      
      cap_pop: false,   // 是否显示 抬头的选择器
      cap_list: [{id: 1,text: '空'}],   // 抬头列表
      cap_text: '',   // 选中的抬头名称
      yhcardid: '',   // 抬头对应的银行卡号

      card_pop: false,   // 是否显示 银行卡号选择器
      card_list: [],    // 银行卡号 列表
      card_text: '',   // 银行卡号 名称

      deal_pop: false,   // 是否显示 业务合同选择器
      deal_list: [],    // 业务合同 列表
      deal_text: '',   // 业务合同 名称

      invoice_pop: false,   // 是否显示 发票类型选择器
      invoice_list: [{text: '专票', id: 1}, {text: '普票', id: 2}],    // 发票类型 列表
      invoice_text: '',   // 发票类型 名称

      start_pop: false,   // 是否显示,开始时间的选择器
      end_pop: false,   // 是否显示, 结束时间的选择器

      minDate: new Date(2016, 0, 1),   // 最小时间
      maxDate: new Date(),   // 最大时间
      currentStart: new Date(),   // 选中的开始时间
      currentEnd: new Date(),   // 选中的结束时间

      obj: {
        tel_app: '',
        pass_app: '',
        code_app: '',
        tel_sid: '',   // 用户id
        id: '',   // 新增时: 选中的抬头id,,, 修改时: 该条记录的id
      },
      detail: {
        ttid: '',   // 抬头id
        xyid: '',   // 业务合同id
        fptype: '',   // 发票类型, 1专票 2普票
        yhcardid: '',   // 抬头对应的银行卡号id

        name: '',   // 项目名称
        descripts: '',   // 服务内容
        starttime: '',   // 开始日期
        endtime: '',   // 结束日期
        fkmoney: '',   // 付款金额        
      },

      detail_rules: {   // 格式校验
      },
    }
  },
  methods: {
    onConfirmCap({id, text}) {   // 确定当前 抬头============================
      this.cap_text = text
      this.detail.ttid = id
      this.cap_pop = false
      getYhcardData({...this.obj, ttid: id}).then(res => {
        this.card_list= res
      })
      getHtData({...this.obj, ttid: id}).then(res => {
        this.deal_list= res
      })
    },
    onConfirmCard({id, text}) {   // 确定当前 银行卡号============================
      this.card_text = text
      this.detail.ygcardid = id
      this.card_pop = false
    },
    onConfirmDeal({id, text}) {   // 确定当前 业务合同============================
      this.deal_text = text
      this.detail.xyid = id
      this.deal_pop = false
    },
    onConfirmInvoice() {   // 确定当前 发票类型============================
      this.invoice_text = text
      this.detail.fptype = id
      this.invoice_pop = false
    },

    formatter(type, val) {   // (钩子函数)  格式化展示的时间
      if (type === 'year') {
        return `${val}年`;
      } else if (type === 'month') {
        return `${val}月`;
      }
      return val;
    },
    onConfirmStart(value) {   // 确定当前 开始时间============================
      this.start_pop = false   
      this.detail.starttime = value.getFullYear() + '-' + (value.getMonth()+1)
    },
    onConfirmEnd(value) {   // 确定当前 结束时间============================
      this.end_pop = false
      this.detail.endtime = value.getFullYear() + '-' + (value.getMonth()+1)
    },


    onCfmDel() {   // 提交了 删除命令
      this.del_pop = false   // 隐藏弹出框
      delIncome(this.obj).then( res => {        
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
      if(this.in_status==99) {
        addIncome({...this.obj, ...this.detail}).then( res => {
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
      }
      else if(this.in_status==5) {
        editIncome({...this.obj, ...this.detail}).then( res => {
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
      }
      
    },
  },
  computed: {
    showTitle() {   // 是否显示抬头
      if(this.in_status == 99) return '新增收入信息'
      else if(this.in_status == 5) return '修改收入信息'
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

      getIncomeDetailEdit(this.obj).then( res => {
        this.name = res.name
        this.descripts = res.descripts
        this.starttime = res.starttime
        this.endtime = res.endtime
        this.fkmoney = res.fkmoney
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
.income-add {
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

