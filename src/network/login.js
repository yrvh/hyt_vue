// 登录和注册 的所有网络请求
import {myaxios} from "./request";
import Qs from 'qs'

const root1 = '/hyt'
const root3 = '/down'
const root8 = '/sapp'

//  版本更新===========================================================
export function getVersion() {   // 请求最新版本号
  return myaxios({
    method: 'post',
    url: root1 + "/app_get_last"
  })
}

// 请求登录的函数, 获取用户信息
export function loginHyt(account,password) {
  return myaxios({
    method: 'post',
    url: root1 + "/user_app/login",
    // transformRequest: [ data => {
    //   return this.$Qs.stringify(data)
    // }],
    data: Qs.stringify({
      tel: account,
      password: password
    })
  })
}
// 第二个登录接口( 同一个手机号对应多个用户时 )
export function loginChoose(obj) {
  return myaxios({
    method: 'post',
    url: root1 + "/user_app/login2",
    data: Qs.stringify(obj)
  })
}


// 忘记密码模块: 获取验证码=========================================================
export function getVerifyForget(obj) {
  return myaxios({
    method: 'post',
    url: root1 + "/getMsm_findps_app",//  getMsm_app2getMsm_app2
    data: Qs.stringify(obj)
  })
}
// 忘记密码模块: 核查验证码
export function checkVerifyForget(obj) {
  return myaxios({
    // headers: {
    //   'Content-Type':'application/json; charset=utf-8 ',   // 设置传输的数据格式text/html   application/x-www-form-urlencoded   application/json
    // },
    method: 'post',
    url: root1 + "/check_code_app",
    data: Qs.stringify(obj)
  })
}
// 忘记密码模块: 重置密码
export function resetPassword(obj) {
  return myaxios({
    method: 'post',
    url: root1 + "/findpassword_app",
    data: Qs.stringify(obj)
  })
}

// ==================== 自行注册相关 =============================
// 平台协议模块:  获取协议内容
export function getPlatform() {
  return myaxios({
    method: 'post',
    url: root1 + "/user_app/get_pt_xy",
  })
}

// 获取验证码
export function getVerifyReg(obj) {
  return myaxios({
    method: 'post',
    url: root1 + "/getMsm_app",
    data: Qs.stringify(obj)
  })
}

// 点击下一步:  提交 手机号 用户名 验证码,  进行注册
export function submitNextReg(obj) {
  return myaxios({
    method: 'post',
    url: root1 + "/user_app/isExits",
    data: Qs.stringify(obj)
  })
}
// 业者: 搜索服务的单位
export function searchComReg(name='',type) {
  return myaxios({
    method: 'post',
    url: root1 + "/user_app/yz/comlist",
    data: Qs.stringify({
      name,
      type
    })
  })
}
// 请求 业者与商秘公司的协议
export function getSecretary(obj) {
  return myaxios({
    timeout: 30000,
    method: 'post',
    url: root1 + "/user_app/yz/showXY",
    data: Qs.stringify(obj)
  })
}
// 用户下载 业者与商秘公司的协议
export function downSecretary(url) {
  return myaxios({
    method: 'get',
    url: root3 + url
  })
}

// 完善个人信息验证 身份证是否被注册
export function validIdcard(obj) {
  return myaxios({
    method: 'post',
    url: root1 + "/share/checkIdCard_dl",
    data: Qs.stringify(obj)
  })
}

// 获取银行列表
export function getBankList() {
  return myaxios({
    method: 'post',
    url: root8 + "/get_yhcardData"
  })
}

// 业者新用户 提交个人信息的请求
export function submitFreeinfo(obj) {
  return myaxios({
    headers: {
      'enctype': 'multipart/form-data'
    },
    method: 'post',
    url: root1 + "/user_app/yz/add",
    data: obj
  })
}


// 退回修改 获取个人信息
export  function getEditFreeinfo(obj) {
  return myaxios({
    method: 'post',
    url: root1 + '/user_app/yz/gr_xx_editUI',
    data: Qs.stringify(obj)
  })
}
// 修改后 再次提交
export  function commitEditFreeinfo(obj) {
  return myaxios({
    headers: {
      'enctype': 'multipart/form-data'
    },
    method: 'post',
    url: root1 + '/user_app/yz/gr_xx_edit',
    data: Qs.stringify(obj)
  })
}



// ==================== 伙伴自行注册相关 =============================
// 搜索商秘公司
export function searchComCoop() {
  return myaxios({
    method: 'post',
    url: root1 + "/user_app/hhr/comlist"
  })
}
// 获取个人合作伙伴相关协议
export function getContractCoop(obj) {
  return myaxios({
    method: 'post',
    url: root1 + "/user_app/hhr/showXY",
    data: Qs.stringify(obj)
  })
}
// 获取企业合作伙伴相关协议
export function getContractCoopcom(id) {
  return myaxios({
    method: 'post',
    url: root1 + "/user_app/hhr/showXY",
    data: Qs.stringify({
      comid: id
    })
  })
}

// 个人合作伙伴 新用户 提交个人信息的请求
export function submitCoopinfo(obj) {
  return myaxios({
    method: 'post',
    url: root1 + "/user_app/hhr/add",
    data: Qs.stringify(obj)
  })
}

// 合伙人退回修改 获取个人信息
export  function getEditCoopinfo(obj) {
  return myaxios({
    method: 'post',
    url: root1 + '/user_app/hhr/gr_xx_editUI',
    data: Qs.stringify(obj)
  })
}
// 修改后 再次提交
export  function commitEditCoopinfo(obj) {
  return myaxios({
    method: 'post',
    url: root1 + '/user_app/hhr/gr_xx_edit',
    data: Qs.stringify(obj)
  })
}



// 获取公司类型
export function getComtype() {
  return myaxios({
    method: 'post',
    url: root1 + "/api/reg_dl/sf/get_company_type",
  })
}

// 企业合作伙伴 新用户 提交企业信息的请求
export function submitCominfoCoop(obj) {
  console.log(obj)
  return myaxios({
    method: 'post',
    url: root1 + "/user_app/hhr_dw/add",
    data: Qs.stringify(obj)
  })
}


// ========确认信息==================================
// 获取当前状态
export function getStatus(obj) {
  return myaxios({
    method: 'post',
    url: root1 + "/user_app/getStatus",
    data: Qs.stringify(obj)
  })
}

// 获取个人信息
export function getInfo(obj) {
  return myaxios({
    method: 'post',
    url: root1 + "/user_app/yz/checkUI",
    data: Qs.stringify(obj)
  })
}

// 通过个人信息
export function getInfoPass(obj) {
  return myaxios({
    method: 'post',
    url: root1 + "/user_app/yz/check",
    data: Qs.stringify(obj)
  })
}
// 拒绝通过个人信息
export function getInfoNopass(obj) {
  return myaxios({
    method: 'post',
    url: root1 + "/user_app/yz/uncheck",
    data: Qs.stringify(obj)
  })
}

//=====代理注册 相关网络请求===================================
export function getPlatformAgent() {
  return myaxios({
    method: 'post',
    url: root1 + "/api/reg_dl/get_xyData"
  })
}
























// var formData = new FormData();
// formData.append("pworkmassesList", JSON.stringify(arr));
// formData.append("account",this.account);



