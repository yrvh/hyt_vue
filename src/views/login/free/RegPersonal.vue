<template>
  <div class="personal">
    <van-nav-bar title="完善个人信息" left-text="返回" right-text="完成"
                 left-arrow border fixed placeholder z-index="50"
                 @click-right="handleNext" @click-left="clickLeft()"></van-nav-bar>
    <van-form ref="personalform_ref" :show-error="false">
      <van-cell-group title="个人基本信息">
        <van-field v-model="personalform.username" label="姓名" placeholder="请输入姓名" type="text"
                   maxlength="18" required clearable clear-trigger="always" name="username"
                   :rules="personalform_rules.username"/>
        <van-field v-model="personalform.tel" label="手机号" placeholder="请输入手机号" type="number"
                   maxlength="18" required clearable clear-trigger="always" name="tel"
                   :rules="personalform_rules.tel"/>
        <van-field v-model="personalform.email" label="电子邮箱" placeholder="请输入电子邮箱" type="text"
                   maxlength="32" required clearable clear-trigger="always" name="email"
                   :rules="personalform_rules.email"/>
        <van-field v-model="personalform.idcard" label="身份证号" placeholder="请输入身份证号" type="text"
                   maxlength="18" required clearable clear-trigger="always" name="idcard"
                   :rules="personalform_rules.idcard" @blur="onIdcardOccupy"/>

        <van-cell title="证件照片" :value="personalform.photo" required is-link
                  border center to="/upidcard">
        </van-cell>

        <van-cell title="年收入范围(元)" :value="personalform.range" required
                  border center>
          <template #extra>
            <van-dropdown-menu duration="0.3" active-color="#7EB6FF" >
              <van-dropdown-item title="元" v-model="personalform.range" :options="options"/>
            </van-dropdown-menu>
          </template>
        </van-cell>
      </van-cell-group>

      <van-cell-group title="个人账户信息">
        <van-field v-model="personalform.bank" label="开户行" placeholder="请输入开户行"  type="text"
                   maxlength="18" required clearable clear-trigger="always" name="bank"
                   :rules="personalform_rules.bank"/>
        <van-field v-model="personalform.accountname" label="开户名" placeholder="请输入开户名"  type="text"
                   maxlength="18" required clearable clear-trigger="always" name="accountname"
                   :rules="personalform_rules.accountname"/>
        <van-field v-model="personalform.account" label="账号" placeholder="请输入账号"  type="number"
                   maxlength="22" required clearable clear-trigger="always" name="account"
                   :rules="personalform_rules.account"/>
      </van-cell-group>


    </van-form>
  </div>
</template>

<script>
export default {
  name: "Personal",
  data() {
    return {
      idcard_occupy: true,   // 身份证号是否已经被 占用

      personalform: {   // 个人信息表单
        username: '',
        tel: '',
        email: '',
        idcard: '',
        photo: '未上传',
        range: '0-60,000',

        bank: '',
        accountname: '',
        account: ''
      },
      personalform_rules: {   // 表单的校验
        username: [
          {required: true, message: '姓名不能为空!'},
          { min: 3, max: 18, message: '用户名3~18位!'},
          // { checkUsername, message: '姓名格式不正确' }
        ],
        tel: [
          {required: true, message: '手机号不能为空!'},
          // { checkMobile, message: '手机号格式不正确' }
        ],
        email: [
          {required: true, message: '邮箱不能为空!'},
          // { checkEmail, message: '邮箱格式不正确' }
        ],
        idcard: [
          {required: true, message: '身份证号不能为空!'},
          // { checkIdcard, message: '身份证格式不正确' }
        ],
        photo: [
          {required: true, message: '相片不能为空!'},
        ],
        bank: [
          {required: true, message: '开户行不能为空!'},
        ],
        accountname: [
          {required: true, message: '开户名不能为空!'},
          { min: 2, max: 18, message: '用户名2~18位!'},
          // { checkUsername, message: '开户名格式不正确' }
        ],
        account: [
          {required: true, message: '账号不能为空!'},
          { min: 15, max: 22, message: '用户名15~22位!'},
          // { checkAccount, message: '银行卡号格式不正确' }
        ],
      },
      options: [   // 收入范围下拉菜单
        { text: '0-60,000', value: '0-60,000' },
        { text: '60,000-360,000', value: '60,000-360,000' },
        { text: '360,000-600,000', value: '360,000-600,000' },
        { text: '600,000-1,200,000', value: '600,000-1,200,000' },
        { text: '1,200,000-2,400,000', value: '1,200,000-2,400,000' },
        { text: '>2,400,000', value: '>2,400,000' },
      ],
    }
  },
  methods: {
    onIdcardOccupy() {   // @blur 输入框失去焦点时触发 函数
      console.log("发起ajax网络请求")
      // 没被占用 这个值设为false
      this.personalform.idcard_occupy = false
    },
    handleNext() {   // 点击了 完成=====
      if(this.personalform.idcard_occupy) {
        console.log("身份证号已经被 注册")
      }
      else {
        this.$refs.personalform_ref.validate().then( () => {
          this.$router.push('/audit')
        })
      }
    },
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
  }
}
</style>