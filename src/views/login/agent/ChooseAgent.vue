<template>
  <div class="choose-agent">
    <van-nav-bar title='代理注册' left-text='返回' left-arrow border center fixed 
                placeholder z-index='50' @click-left='clickLeft(-2)'></van-nav-bar>

    <van-form ref="regform_ref" :show-error="false" validate-trigger="onBlur">
      <van-cell title ="用户类型" :value="cap_text" required is-link border center @click="cap_pop = true"></van-cell>
      <van-popup v-model="cap_pop" overlay position="bottom" :duration="0.2" round lock-scroll
                  close-on-popstate get-container=".deal-add">
        <van-picker :columns="cap_list" title="抬头" show-toolbar
                    @cancel="cap_pop = false" @confirm="onConfirmUser">
        </van-picker>
      </van-popup>

      <van-field v-model="regform.tel" label="手机号码" placeholder="请输入手机号" type="number"
                  maxlength="18" required clearable clear-trigger="always" name="tel"
                  :rules=" [{ required: true, message: '手机号不能为空!'},
                  {validator: checkMobile, message: '手机号格式不正确'}] "/>

      <van-field v-model="regform.verify" label="验证码" placeholder="请输入验证码" type="number"
                  maxlength="8" required clearable clear-trigger="always" name="verify"
                  :rules=" [{ required: true, message: '验证码不能为空!'}]">
        <template #button>
          <van-button v-if="able" size="small" type="info" @click="getVerify()">获取验证码</van-button>
          <div v-else class="mytime">
            <van-count-down :time="60*1000" format="ss 秒" @finish="onFinish"/>
          </div>
        </template>
      </van-field>

      <div class="reg-log">
        <van-checkbox v-model="regform.agree" shape="square" @change="isAgree"><span class="read-agree">已阅读并且同意</span></van-checkbox>
        <div class="contract" @click="onContract">《慧业通云服务平台条款》</div>
      </div>
    </van-form>
    
    <div class="footer">
      <van-button text="提交" color="#7EB6FF" size="large" @click="comfirm_pop=true"></van-button>
    </div>

    <!-- 提交的 dialog弹出层 -->
    <van-dialog v-model="comfirm_pop" title="确认提交 ：" width="320px" message="继续完善资料?" confirm-button-text="提交"
                :show-cancel-button="true" confirm-button-color="#7EB6FF" cancelButtonColor="#666666" 
                close-on-click-overlay @confirm="onComfirm" @cancel="comfirm_pop=false"></van-dialog>
  </div>
</template>

<script>
import {getCapDetail,addCap,delCap} from 'network/free'
export default {
  name: 'ChooseAgent',
  data() {
    return {
      cap_pop: false,   // 是否显示 抬头的选择器
      cap_list: [{text:'自由职业者(含合伙人)', id: 1}, {text:'接受服务单位', id: 2}],   // 抬头列表
      cap_text: '自由职业者(含合伙人)',   // 选中的抬头名称

      able: true,   // 获取验证码的按钮是否可用
      msm_code: null,   // 系统发的验证码
      regform: {   // 注册的表单
        username: '',
        tel: '',
        verify: null,
        agree: false,   // 是否同意条款
      },
      comfirm_pop: false,   // 弹出 提交窗口
      
    }
  },
  methods: {
    isAgree() {   // 勾选复选框---同意平台协议
      if(this.regform.agree) {
        this.$router.push('/platform')
      }
    },
    onContract() {   // 点击同意平台协议
      this.regform.agree = !this.regform.agree
    },
    onFinish() {   // 倒计时结束自动执行
      this.able = true
    },
    getVerify() {   // 获取验证码
      this.able = false
      getVerifyReg(this.regform.tel).then( res => {
        if(res.result==0){
          this.able = true
          this.$toast.fail(res.message)
        }
        else if(res.result == 1){
          this.regform.validateCode = res.msm
        }
      })
    },
    onConfirm({id, text}) {   // 确定当前 用户类型============================
      this.cap_text = text
      this.obj.id = id
      this.cap_pop = false
    },


    onComfirm() {   // 点击了 完成
      this.$refs.capform_ref.validate().then( () => {   // 校验格式
        
        addCap().then( res => {   // 发起提交请求
          if(res.result==1) {
            this.$toast.success(res.message)
            setTimeout(() => {
              this.clickLeft()
            }, 1000)
          }
          else {
            this.$toast.fail(res.message)
          }
        })
      })
    },
  },
  computed: {
  },
  created() {
    
  }
}
</script>

<style scoped lang='scss'>
.choose-agent {
  padding: 0 10px;

  .van-form {
    margin-top: 10px;
    .login-log {
      height: 60px; display: flex; justify-content: space-between; align-items: center;
      padding: 0 10px;
      .forget {color: var(--cl-text-t9)}
      .forget:active {color: var(--cl-high-text)}
    }
    .reg-log {
      height: 60px; display: flex; align-items: center;
      padding: 0 10px;
      font-size: 14px;
      .read-agree {color: var(--cl-text-t9); }
      .contract {color: var(--cl-high-text); }
    }
    .login-btn,.reg-btn {
      width: 100%; margin: 20px 0 40px; display: flex; justify-content: center;
      .van-button { width: 90%; }
    }
  }
  
  .footer { 
    margin-top: 50px;
    display: flex; justify-content: space-between;
  }
  
}
</style>

