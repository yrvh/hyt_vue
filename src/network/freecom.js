// 有单位业者:  网络请求(除注册阶段, 所有)
import {tkaxios} from "@/network/request";
import Qs from 'qs'

const root = '/cont'
const root1 = '/hyt'

export function getIncome(obj) {   // 收入管理主界面===================================================
  return tkaxios({
    method: 'post',
    url: root + '/yz/zf/index',
    data: Qs.stringify(obj)
  })
}
export function getIncomeList(obj) {   // 收入管理列表页
  return tkaxios({
    method: 'post',
    url: root + '/yz/zf/list',
    data: Qs.stringify(obj)
  })
}
export function getIncomeDetail(obj) {   // 收入信息详情页
  return tkaxios({
    method: 'post',
    url: root + '/share/zf/showUI',
    data: Qs.stringify(obj)
  })
}
export function passIncome(obj) {   // 通过收入信息
  return tkaxios({
    method: 'post',
    url: root + '/yz/zf/check',
    data: Qs.stringify(obj)
  })
}
export function nopassIncome(obj) {   // 退回收入信息
  return tkaxios({
    method: 'post',
    url: root + '/yz/zf/back',
    data: Qs.stringify(obj)
  })
}


export function getDeal(obj) {   // 业务合同主界面============================
  return tkaxios({
    method: 'post',
    url: root + '/yz/fptt_ht/main',
    data: Qs.stringify(obj)
  })
}
export function getDealList(obj) {   // 业务合同列表页
  return tkaxios({
    method: 'post',
    url: root + '/yz/fptt_ht/list',
    data: Qs.stringify(obj)
  })
}
export function getDealDetail(obj) {   // 业务合同详情页
  return tkaxios({
    method: 'post',
    url: root + '/yz/fptt_ht/showUI',
    data: Qs.stringify(obj)
  })
}
export function passDeal(obj) {   // 通过 业务合同
  return tkaxios({
    method: 'post',
    url: root + '/yz/fptt_ht/check',
    data: Qs.stringify(obj)
  })
}
export function nopassDeal(obj) {   // 退回 业务合同
  return tkaxios({
    method: 'post',
    url: root + '/yz/fptt_ht/uncheck',
    data: Qs.stringify(obj)
  })
}
export function getInvoice(obj) {   // 发票查询主界面===========================================
  return tkaxios({
    method: 'post',
    url: root + '/yz/fp/index',
    data: Qs.stringify(obj)
  })
}
export function getInvoiceList(obj) {   // 发票查询列表页
  return tkaxios({
    method: 'post',
    url: root + '/yz/fp/list',
    data: Qs.stringify(obj)
  })
}
export function getInvoiceDetail(obj) {   // 发票查询详情页
  return tkaxios({
    method: 'post',
    url: root + '/yz/fp/editUI',
    data: Qs.stringify(obj)
  })
}
export function getTaxList(obj) {   // 报税查询列表页======================================
  return tkaxios({
    method: 'post',
    url: root + '/yz/ns/list',
    data: Qs.stringify(obj)
  })
}
export function getTaxDetail(obj) {   // 报税查询详情页,, 完税证明======================================
  return tkaxios({
    method: 'post',
    url: root1 + '/share/bs_end_app/showUI',
    data: Qs.stringify(obj)
  })
}



export function getServe(obj) {   // 添加服务单位 主界面=======================================
  return tkaxios({
    method: 'post',
    url: root + '',
    data: Qs.stringify(obj)
  })
}

export function getServeList(obj) {   // 添加服务单位 列表页
  return tkaxios({
    method: 'post',
    url: root1 + '/share/sf_yz/list',
    data: Qs.stringify(obj)
  })
}

export function getServeDetail(obj) {   // 添加服务单位 详情页
  return tkaxios({
    method: 'post',
    url: root + '',
    data: Qs.stringify(obj)
  })
}


export function getRunningList(obj) {   // 服务中列表页
  return tkaxios({
    method: 'post',
    url: root + '',
    data: Qs.stringify(obj)
  })
}

export function getRunningDetail(obj) {   // 服务中详情页
  return tkaxios({
    method: 'post',
    url: root + '',
    data: Qs.stringify(obj)
  })
}


export function getRealname(obj) {   // 个人中心: 获取姓名和电话======================================
  return tkaxios({
    method: 'post',
    url: root + '/yz/info/index',
    data: Qs.stringify(obj)
  })
}
export function getPerson(obj) {   // 个人中心: 获取个人信息
  return tkaxios({
    method: 'post',
    url: root + '/yz/info/showUI',
    data: Qs.stringify(obj)
  })
}
export function editPassword(obj) {   // 个人中心: 修改密码
  return tkaxios({
    method: 'post',
    url: root + '/yz/edit_password',
    data: Qs.stringify(obj)
  })
}
export function logout(obj) {   // 个人中心: 退出登录
  return tkaxios({
    method: 'post',
    url: root1 + '/user_app/logout',
    data: Qs.stringify(obj)
  })
}