<template>
  <div class="personal">
    <van-nav-bar title='确认信息' left-text='返回' left-arrow border center fixed 
                placeholder z-index='50' @click-left='clickLeft()'></van-nav-bar>

    <van-tabs v-model='tabs_mark' color='#7EB6FF' background='white'
              duration='0.3' line-width='50px' line-height='3px' border center
              sticky offset-top='50px' @change="onChange()">
      <van-tab title='个人信息' :disabled='tab_person'>
        <van-cell-group title='个人信息'>
          <van-cell title='姓名' border center :value='detail.realname' />
          <van-cell title='手机号码' border center :value='obj.tel_app' />
          <van-cell title='电子邮箱' border center :value='detail.email' />
          <van-cell title='身份证号' border center :value='detail.cardcode' />
          <van-cell title="证件照片" is-link border center :value="upPhoto"
                    @click="onPhoto([detail.UpCardId,detail.DownCardId])" />
        </van-cell-group>
        <van-cell-group title='个体帐户信息'>
          <van-cell title='开户行' border center :value='detail.bank_name' />
          <van-cell title='开户名' border center :value='detail.kh_name' />
          <van-cell title='账号' border center :value='detail.code' />
        </van-cell-group>
        <van-cell-group title="代理营销员信息" v-if="showSell">
          <van-cell title="营销员工号(选填)" border center :value="detail.employeecode"/>
        </van-cell-group>
        <van-cell v-if="showReasons" class="reasons" title-style="color: #ee3333;"
                  title="退回原因" border center :value="detail.reason"/>
      </van-tab>
      <van-tab title='工商户信息' :disabled='tab_individual'>
        <van-cell-group title='商户基本信息'>
          <van-cell title='统一社会信用代码' border center :value='detail.xycode' />
          <van-cell title='经营者' border center :value='detail.jyname' />
          <van-cell title='商户名称' border center :value='detail.comname' />
          <van-cell title='类型' value='个体工商户' />
          <van-cell title='注册日期' border center :value='detail.addtime' />
          <van-cell title='经营范围' border center :value='detail.businessRange' />
          <van-cell title='经营场所' border center :value='detail.address' />
          <van-cell title='登记机关' border center :value='detail.registerCompany' />
          <van-cell title='发证日期' border center :value='detail.getCardTime' />
          <van-cell title="经营执照" is-link border center :value="upCerti"
                    @click="onPhoto([detail.CertificUpUrl])" />
        </van-cell-group>
        <van-cell-group title='商户帐号信息'>
          <van-cell title='开户行' border center :value='detail.bank_name_dg' />
          <van-cell title='开户名' border center :value='detail.kh_name_dg' />
          <van-cell title='账号' border center :value='detail.code_dg' />
        </van-cell-group>
      </van-tab>
      <van-tab title='收入信息' :disabled='tab_income'>
        <van-cell-group title='个人信息'>
          <van-cell title='收入范围(元)' border center :value='detail.monthsy' />
        </van-cell-group>
        
        <van-cell-group titel="纳税信息">
          <van-cell title="核定定额(元)" border center :value="detail.zzshdde" :label="'增值税(' + jntype + ')'" />
          <van-cell :title="detail.nstype==1? '核定定额(元)': '核定应税所得率' " border center :value="detail.nstype==1? detail.gshdde: '' " label="个人所得税"/>
          <van-cell v-if="detail.nstype==2" title="行业类型" border center :value="detail.hyname"/>
        </van-cell-group>

      </van-tab>

      <van-tab title='相关协议' :disabled='tab_contract'>
        <van-cell title='平台协议' border center @click="onXypt()" is-link
        :to="{path: '/cfm_contract', query: {cid: 1, cname: '服务平台协议'}}"/>
        <van-cell title='商秘公司协议' border center @click="onXyms()" is-link
        :to="{path: '/cfm_contract', query: {cid: 2, cname: '商秘公司协议'}}"/>
        <van-cell v-if="detail.ishave_dw==1&&detail.userType==1" title="商户信息是否隐藏" border center label="选择是，接受服务单位可以查看。否，则不能" >
          <template #right-icon>
            <van-switch v-model="obj.isShowGsh" size="24" active-color="#7EB6FF" inactive-color="#f0f0f0"
                        :active-value="1" :inactive-value="0"/>
          </template>
        </van-cell>

        <div class="footer">
          <van-button text="退回" color="#bbbbbb" :disabled="backdis"  size="large"
                    loading-text="退回中..." @click="onBack"></van-button>
          <van-button text="确认" color="#7EB6FF" :loading="comfirming" size="large"
                    loading-text="提交中..." @click="onComfirm"></van-button>
        </div>
        
      </van-tab>
    </van-tabs>
    <van-popup v-model="backpop" overlay position="center" duration="0.3"
                lock-scroll close-on-popstate closeable>
      <div class="content">
        <van-field v-model="reason" label="退回原因" placeholder="请输入退回原因"
                  required clearable clear-trigger="always" name="reason"/>
        <van-button text="确认退回" color="#7EB6FF" :loading="cfmbacking" block
                    loading-text="退回中..." @click="onCfmBack"></van-button>
      </div>
      
    </van-popup>
  </div>
</template>

<script>
import {getInfo,getInfoPass,getInfoNopass} from 'network/login'
export default {
  name: 'CfmPersonal',
  data() {
    return {
      tabs_mark: 0,   // 标识符
      tab_person: false,   // 是否禁用
      tab_individual: false,   // 是否禁用
      tab_income: true,   // 是否禁用
      tab_contract: false,   // 是否禁用

      backdis: false,   // 退回按钮禁用
      comfirming: false,   // 提交中...

      backpop: false,   // 弹出编辑 退回原因的窗口
      cfmbacking: false,   // 退回中...
      
      cfm_xypt: false,   // 是否查看了平台协议
      cfm_xyms: false,   // 是否查看了商秘协议

      reason: '',   // 填写退回原因

      obj: {
        tel_app: '',
        pass_app: '',
        code_app: '',
        tel_sid: '',   // 用户id
        isShowGsh: 0,   // 有业者才有此字段,,0不显示 1显示
      },
      detail:{
        realname: '',   // 真名
        email: '',   // 邮箱
        cardcode: '',   // 身份证号
        UpCardId: '',   // 身份证正面照片
        DownCardId: '',   // 身份证背面照片
        
        bank_name: '',   // 开户行(对私)
        kh_name: '',   // 开户名(对私)
        code: '',   // 账号(对私)
        
        xycode: '',   // 统一社会信用代码
        jyname: '',   // 经营者
        comname: '',   // 商户名称
        // 类型(静态样式: 个体工商户)
        addtime: '',   // 注册日期
        businessRange: '',   // 经营范围
        address: '',   // 经营场所
        registerCompany: '',   // 登记机关
        getCardTime: '',// 发证日期
        CertificUpUrl: '',   // 营业执照

        bank_name_dg: '',   // 开户行(对公)
        kh_name_dg: '',   // 开户名(对公)
        code_dg: '',   // 账号(对公)
        
        monthsy: '',   // 收入范围

        hyname: '',   // 行业类型
        zzsjntype: '',   // 增值税类型 1月  2季  3年
        zzshdde: '',   // 增值税
        nstype: '',   // 个税类型, 1核定定额 2应税所得率
        gshdde: '',   // 个税
        
        reason: '',   // 展示退回的原因
        employeecode: '',   // 营销员工号

        xy_pt: '',
        xy_ms: '',

        ishave_dw: 1,
        userType: 1,
      }
    }
  },
  methods: {
    onPhoto(link) {   // 展示图片
      this.$imagePreview({
        images: link,
        closeable: true
      })
    },
    onChange() {   // 切换tab
      if(this.tabs_mark==1) {this.tab_income = false}
      else if(this.tabs_mark==2) {this.tab_contract = false}
    },
    onBack() {   // 点击了 退回
      this.backpop = true
    },
    onCfmBack() {   // 提交了 退回原因
      if(this.reason != '') {   // 退回原因 不为空
        this.cfmbacking = true   // 退回中...
        getInfoNopass({...this.obj,contents: this.reason}).then( res => {        
          if(res.result==1) {
            this.$toast.success(res.message)
            setTimeout(() => {
              this.$router.replace('/audit')
            }, 1300)
          }
          else if(res.result==0) {
            this.$toast.fail(res.message)
            this.cfmbacking = false   // 取消 确认中
          }
        })
      }
      else {
        this.$toast.fail('请输入退回原因!')
      }
    },
    onComfirm() {   // 点击了 确认
      if(this.cfm_xypt && this.cfm_xyms) {   // 协议已经查看完毕
        this.comfirming = true   // 确认中...
        this.backdis = true   // 禁用退回按钮...
        getInfoPass(this.obj).then( res => {        
          if(res.result==1) {
            this.$toast.success(res.message)
            setTimeout(() => {
              if(this.detail.userType == 11){
                this.$router.replace('/main/coophome')
              }
              else if(this.detail.userType == 1 && this.detail.ishave_dw == 1) {
                this.$router.replace('/main/freecomhome')
              }
              else if(this.detail.userType == 1 && this.detail.ishave_dw == 0) {
                this.$router.replace('/main/freehome')
              }
            }, 1500)
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
    onXypt(){   // 点击查看了 平台协议
      this.cfm_xypt = true
      this.$router.push({
        path: '/cfm_contract',
        query: {
          cid: 1
        }
      })
    },
    onXyms(){   // 点击查看了 商秘协议
      this.cfm_xyms = true
      this.$router.push({
        path: '/cfm_contract',
        query: {
          cid: 2
        }
      })
    }
    
  },
  computed: {
    jntype() {
      if(this.detail.zzsjntype==1) return "按月"
      else if(this.detail.zzsjntype==2) return "按季"
      else if(this.detail.zzsjntype==3) return "按年"
      else return ''
    },
    upPhoto() {   // 是否上传了照片
      if(this.detail.UpCardId && this.detail.DownCardId) return '已上传'
      else return '未上传'
    },
    upCerti() {   // 是否上传了营业执照
      if(this.detail.CertificUpUrl) return '已上传'
      else return '未上传'
    },
    showSell() {
      let show = Boolean(this.detail.employeecode)
      return show
    },
    showReasons() {
      let reason = Boolean(this.detail.reason)
      return reason
    }
  },
  created() {
    this.obj.pass_app = this.$store.state.login.password
    this.obj.tel_app = this.$store.state.login.tel
    this.obj.code_app = this.$store.state.login.code_app
    getInfo(this.obj).then( res => {
      this.detail = res
    })
  }
}
</script>

<style scoped lang='scss'>
.personal {
  .reg-status{ margin-top: 10px; }
  .reasons { margin-top: 10px;}
  .footer { 
    margin-top: 100px;
    display: flex; justify-content: space-between;
  }
  .content {
    background-color: #f7f7fe;
    width: 300px;
    padding: 50px 10px 10px 10px;
    border-radius: 10px;
    .van-button {
      margin-top: 50px;
    }
  }
}
</style>