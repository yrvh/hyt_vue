<template>
  <div class="edit-pass">
    <van-nav-bar left-text="返回" left-arrow border fixed z-index="50" title="修改密码" placeholder @click-left="clickLeft()"/>

    <van-form ref="setpwdform_ref" :show-error="false">
      <van-field v-model="setpwdform.oldpassword" label="旧密码" placeholder="请输入原密码" type="password"
                 maxlength="22" required clearable clear-trigger="always" name="oldpassword" />

      <van-field v-model="setpwdform.newpassword" label="新密码" placeholder="请输入新密码" type="password"
                 maxlength="18" required clearable clear-trigger="always" name="password"
                 :rules="setpwdform_rules.newpassword"/>
      <van-field v-model="re_newpwd" label="确认密码" placeholder="请再次输入新密码" type="password"
                 maxlength="18" required clearable clear-trigger="always" name="repassword"
                 :rules="setpwdform_rules.re_newpwd"/>


      <div class="setpwd-btn">
        <van-button type="info" text="完成" size="large" @click="setpwdSubmit()"></van-button>
      </div>

    </van-form>
  </div>
</template>

<script>
import { editPassword } from "@/network/free";

export default {
  name: "EditPass",
  data() {
    return {
      obj: {
        tel_app: '',
        pass_app: '',
        code_app: ''
      },

      tel: '',
      re_newpwd: '',   // 确认新密码
      setpwdform: {   // 修改密码: 的表单
        oldpassword: '',   // 原密码
        newpassword: '',   // 新密码
      },
      setpwdform_rules: {   // 表单的校验
        newpassword: [
          {required: true, message: '密码不能为空!'},
          // { checkPwd, message: '请输入8~18位密码(字母 数字 下划线)!' }
        ],
        re_newpwd: [
          {required: true, message: '确认密码不能为空!'},
          // { checkPwd, message: '请输入8~18位密码(字母 数字 下划线)!' }
        ],
      },
    }
  },
  methods: {
    // checkMobile(value){
    //   const regMobile = /^(0|86|17951)?(13[0-9]|14[5-9]|15[012356789]|166|17[0-9]|18[0-9]|19[8-9])[0-9]{8}$/
    //   console.log(regMobile.test(value))
    //   return regMobile.test(value)
    // },
    setpwdSubmit() {   // 点击完成
      if(this.setpwdform.newpassword !== this.re_newpwd) {
        this.$toast.fail("两次密码输入不一致")
      }
      else {
        this.$refs.setpwdform_ref.validate().then( () => {
          editPassword({...this.obj, ...this.setpwdform}).then( res => {
            console.log(res)
            if(res.result == 0){
              this.$toast({
                type: "fail",
                position: "middle",
                message: "密码修改失败!",
                duration: 4000,
              })
            }
            else if(res.result==1) {
              this.$toast({
                type: "success",
                position: "middle",
                message: "密码修改成功!",
                duration: 4000,
              })
              setTimeout(() => {
                this.$router.push('/login')
              }, 1000)
            }

          })
        })
      }
    },
  },
  created() {
    this.obj.pass_app = this.$store.state.login.password
    this.obj.tel_app = this.$store.state.login.tel
    this.obj.code_app = this.$store.state.login.code_app
  },

}
</script>

<style scoped lang="scss">
.edit-pass {
  .van-form {
    margin-top: 10px;
    .setpwd-btn {
      width: 100%; margin: 40px 0; display: flex; justify-content: center;
      .van-button { width: 90%; }
    }
  }
}
</style>
