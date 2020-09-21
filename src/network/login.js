// 登录和注册 的所有网络请求
import {myaxios} from "./request";
import Qs from 'qs'

const root = '/hyt'
// 请求登录的函数, 获取用户信息
export function loginHyt(account,password) {
  return myaxios({
    method: 'post',
    url: root + "/user_app/login",
    // transformRequest: [ data => {
    //   return this.$Qs.stringify(data)
    // }],
    data: Qs.stringify({
      tel: account,
      password: password
    })
  })
}

// 忘记密码模块: 获取验证码=========================================================
export function getVerifyForget(tel) {
  return myaxios({
    method: 'post',
    url: root + "/getMsm_findps_app",
    data: Qs.stringify({
      tel,
    })
  })
}
// 忘记密码模块: 核查验证码
export function checkVerifyForget(code) {
  console.log(code)
  return myaxios({
    headers: {
      'Content-Type':'application/json; charset=utf-8 ',   // 设置传输的数据格式text/html   application/x-www-form-urlencoded   application/json
    },
    method: 'post',
    url: root + "/check_code_app",
    data: {
      code,
    }
  })
}
// 忘记密码模块: 重置密码
export function resetPassword(tel ,password) {
  return myaxios({
    method: 'post',
    url: root + "/findpassword_app",
    data: Qs.stringify({
      tel,
      password
    })
  })
}

// ==================== 自行注册相关 =============================
// 平台协议模块:  获取协议内容
export function getPlatform() {
  return myaxios({
    method: 'post',
    url: root + "/user_app/get_pt_xy",
  })
}

// 获取验证码
export function getVerifyReg(tel) {
  return myaxios({
    method: 'post',
    url: root + "/getMsm_app",
    data: Qs.stringify({
      tel
    })
  })
}

// 点击下一步:  提交 手机号 用户名 验证码,  进行注册
export function submitNextReg(tel,username,code) {
  return myaxios({
    method: 'post',
    url: root + "/user_app/isExits",
    data: Qs.stringify({
      tel,
      username,
      code
    })
  })
}
// 有单位业者: 搜索受服务的单位
export function searchComReg(name='',type=1) {
  return myaxios({
    method: 'post',
    url: root + "/user_app/yz/comlist",
    data: Qs.stringify({
      name,
      type
    })
  })
}
// 请求 业者与商秘公司的协议
export function getSecretary(id) {
  return myaxios({
    method: 'post',
    url: root + "/user_app/yz/showXY",
    data: Qs.stringify({
      comid: id
    })
  })
}

























// var formData = new FormData();
// formData.append("pworkmassesList", JSON.stringify(arr));
// formData.append("account",this.account);



