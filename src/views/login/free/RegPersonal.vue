<template>
  <div class="personal">
    <van-nav-bar title="完善个人信息" left-text="返回" right-text="完成"
                 left-arrow border fixed placeholder z-index="50"
                 @click-right="handleNext" @click-left="clickLeft()"></van-nav-bar>
    <van-form ref="personalform_ref" :show-error="false">
      <van-cell-group title="个人基本信息">
        <van-field v-model="personalform.realname" label="姓名" placeholder="请输入姓名" type="text"
                   maxlength="15" required clearable clear-trigger="always" name="realname"
                   :rules=" [{ required: true, message: '姓名不能为空!'},
                        {validator: checkRealname, message: '2~15位汉字或字母'}] " />
        <van-field v-model="personalform.tel" label="手机号" type="number" required name="tel" disabled/>
        <van-field v-model="personalform.email" label="电子邮箱" placeholder="请输入电子邮箱" type="text"
                   maxlength="32" required clearable clear-trigger="always" name="email"
                   :rules=" [{ required: true, message: '邮箱不能为空!'},
                        {validator: checkEmail, message: '邮箱格式不正确'}] " />
        <van-field v-model="personalform.idCardNum" label="身份证号" placeholder="请输入身份证号" type="text"
                   maxlength="18" required clearable clear-trigger="always" name="idCardNum"
                   :rules=" [{ required: true, message: '身份证号不能为空!'},
                        {validator: checkIdcard, message: '身份证格式不正确'}] " />

        <van-cell title="证件照片" :value="upPhoto" required is-link border center to="/upidcard" />

        <!-- <van-cell title="年收入范围(元)" :value="personalform.monthsy" required
                  border center>
          <template #extra>
            <van-dropdown-menu duration="0.3" active-color="#7EB6FF" >
              <van-dropdown-item title="档" v-model="personalform.monthsy" :options="monthsy_list"/>
            </van-dropdown-menu>
          </template>
        </van-cell> -->

        <van-cell title="年收入范围" :value="monthsy_text" required is-link border center @click="monthsy_pop = true"></van-cell>
        <van-popup v-model="monthsy_pop" overlay position="bottom" :duration="0.2" round lock-scroll
                    close-on-popstate get-container=".income-add">
          <van-picker :columns="monthsy_list" title="收入范围" show-toolbar
                      @cancel="monthsy_pop = false" @confirm="onConfirmMonthsy">
          </van-picker>
        </van-popup>
      </van-cell-group>

      <van-cell-group title="个人账户信息">
        <van-field v-model="personalform.khh" label="开户行" placeholder="请输入开户行"  type="text"
                   maxlength="18" required clearable clear-trigger="always" name="khh"
                   :rules=" [{ required: true, message: '开户行不能为空!'}] " />
        <van-field v-model="personalform.accountName" label="开户名" placeholder="请输入开户名"  type="text"
                   maxlength="18" required clearable clear-trigger="always" name="accountName"
                   :rules=" [{ required: true, message: '开户名不能为空!'}] " />
        <van-field v-model="personalform.account" label="账号" placeholder="请输入账号"  type="number"
                   maxlength="22" required clearable clear-trigger="always" name="account"
                   :rules=" [{ required: true, message: '银行卡号不能为空!'},
                        {validator: checkBank, message: '银行卡号格式不正确'}] " />
      </van-cell-group>

      <van-cell-group title="代理营销员信息" v-if="showSell">
        <van-field v-model="personalform.employeecode" label="营销员工号(选填)"  type="number" maxlength="4"
                   clearable clear-trigger="always" name="employeecode"/>
      </van-cell-group>

      <van-cell v-if="showReasons" class="reasons" title-style="color: #ee3333;" title="退回原因"
                :value="reasons" border center />
    </van-form>
  </div>
</template>

<script>
import { validIdcard, submitFreeinfo, getEditFreeinfo, commitEditFreeinfo } from 'network/login'

export default {
  name: "RegPersonal",
  data() {
    return {
      is_back: false,   // 是否是 被退回的状态
      reasons: '',   // 退回原因
      monthsy_pop: false,   // 是否显示 收入范围的选择器
      monthsy_list: [   // 收入范围下拉菜单
        { text: '0-60,000', id: '1' },
        { text: '60,000-360,000', id: '2' },
        { text: '360,000-600,000', id: '3' },
        { text: '600,000-1,200,000', id: '4' },
        { text: '1,200,000-2,400,000', id: '5' },
        { text: '>2,400,000', id: '6' },
      ],
      monthsy_text: '',   // 收入范围名称

      obj: {
        tel_app: '',
        pass_app: '',
        code_app: '',
      },
      personalform: {   // 个人信息表单
        username: '',   // 用户名
        password: '',   // 密码
        userType: '',   // 用户类型
        type: '',   // 有无单位
        comids: '',
        tel: '',   // 电话

        realname: '',   // 真名
        email: '',
        idCardNum: '',
        khh: '',   // 开户行
        accountName: '',
        account: '',
        employeecode: '',

        monthsy: '1',   // 收入范围的id
        idCardUpUrl: '',   // 身份证正面
        idCardDownUrl: '',   // 身份证反面
      },
      
    }
  },
  methods: {
    onConfirmMonthsy({id, text}) {   // 确定当前 收入范围============================
      this.monthsy_text = text
      this.personalform.monthsy = id
      this.monthsy_pop = false
    },

    handleNext() {   // 点击了 完成=====
      this.personalform.idCardUpUrl = this.$store.state.reg.idCardUpUrl
      this.personalform.idCardDownUrl = this.$store.state.reg.idCardDownUrl
      if(this.personalform.idCardUpUrl=='' || this.personalform.idCardDownUrl=='') {
        this.$toast.fail("请上传身份证!")
      }
      else {
          this.$refs.personalform_ref.validate().then( () => {   // 格式校验
            let formData = new FormData()
            formData.append('username',this.personalform.username)
            formData.append('password',this.personalform.password)
            formData.append('userType',this.personalform.userType)
            formData.append('type',this.personalform.type)
            formData.append('comids',this.personalform.comids)
            formData.append('tel',this.personalform.tel)
            formData.append('realname',this.personalform.realname)
            formData.append('email',this.personalform.email)
            formData.append('idCardNum',this.personalform.idCardNum)
            formData.append('khh',this.personalform.khh)
            formData.append('accountName',this.personalform.accountName)
            formData.append('account',this.personalform.account)
            formData.append('employeecode',this.personalform.employeecode)
            formData.append('monthsy',this.personalform.monthsy)
            formData.append('idCardUpUrl',this.personalform.idCardUpUrl)
            formData.append('idCardDownUrl',this.personalform.idCardDownUrl)

            if(this.is_back){   // 是退回来修改的情况
              formData.append('pass_app',this.obj.pass_app)
              formData.append('tel_app',this.tel_app)
              formData.append('code_app',this.code_app)
              commitEditFreeinfo(formData).then(res => {
                if (res.result == 1) {
                  this.$toast.success(res.message)
                  setTimeout(() => {
                    this.$router.push('/audit')
                  }, 1300)
                } else if (res.result == 0) {
                  this.$toast.fail(res.message)
                  // this.$router.push('/audit')
                }
              })
            }
            else {   // 新用户注册
              validIdcard({ idcard: this.personalform.idCardNum }).then(res => {   // 身份证校验
                if (res.valid) {
                  submitFreeinfo(formData).then(res => {
                    if (res.result == 1) {
                      this.$toast.success(res.message)
                      setTimeout(() => {
                        this.$router.push('/audit')
                      }, 1300)
                    }
                    else if (res.result == 0) {
                      this.$toast.fail(res.message)
                      // this.$router.push('/audit')
                    }
                  })
                } else {
                  this.$toast.fail("该身份证号已经注册!")
                }
              })
            }

          })

      }
    },
  },
  computed: {
    // 格式化,  收入范围
    formatMonthsy() {
      if(this.monthsy=='1') {return '0-60,000'}
      else if(this.monthsy=='2') {return '60,000-360,000'}
      else if(this.monthsy=='3') {return '360,000-600,000'}
      else if(this.monthsy=='4') {return '600,000-1,200,000'}
      else if(this.monthsy=='5') {return '1,200,000-2,400,000'}
      else if(this.monthsy=='6') {return '>2,400,000'}
    },
    upPhoto() {   // 是否上传了照片
      if(this.$store.state.reg.idCardUpUrl!='' && this.$store.state.reg.idCardDownUrl!='') return '已上传'
      else return '未上传'
    },
    showSell() {
      return this.personalform.employeecode != ''
    },
    showReasons() {
      return this.reasons != ''
    }
  },
  created() {
    this.personalform.tel = this.$store.state.reg.tel
    this.personalform.employeecode = this.$store.state.reg.employeecode

    this.personalform.username = this.$store.state.reg.username
    this.personalform.password = this.$store.state.reg.password
    this.personalform.userType = this.$store.state.reg.userType
    this.personalform.type = this.$store.state.reg.type
    this.personalform.comids = this.$store.state.reg.comids

    this.obj.pass_app = this.$store.state.login.password
    this.obj.tel_app = this.$store.state.login.tel
    this.obj.code_app = this.$store.state.login.code_app

    if(this.obj.code_app && this.obj.tel_app && this.obj.pass_app) {   // 判断是否是退回来修改的情况
      this.is_back = true
      getEditFreeinfo(this.obj).then( res => {
        if(res.result==1) {
          this.personalform.account = res.code
          this.personalform.accountName = res.kh_name
          this.personalform.khh = res.khh
          this.personalform.realname = res.realname
          this.personalform.idCardNum = res.idCardNum
          this.personalform.tel = res.tel
          this.personalform.email = res.email

          this.personalform.employeecode
          this.reasons = res.reasons
        }
      })
    }

    
  }

}
</script>

<style scoped lang="scss">
.personal {
  .van-form {
    margin-top: 10px;
    .van-cell,.van-cell {
      background-color: #ffffff;
    }

    .reasons { margin-top: 10px; }
  }
}
</style>
