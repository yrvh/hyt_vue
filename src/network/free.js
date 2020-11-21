// 无单位业者:  网络请求(除注册阶段, 所有)
import {tkaxios} from "@/network/request";
import Qs from 'qs'

const root = '/cont'
const root2 = '/hyt'

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
export function getIncomeDetailEdit(obj) {   // 收入信息详情页
  return tkaxios({
    method: 'post',
    url: root + '/yz/zf/editUI',
    data: Qs.stringify(obj)
  })
}

export function addIncome(obj) {   // 新增 收入信息
  return tkaxios({
    method: 'post',
    url: root + '/yz/zf/add',
    data: Qs.stringify(obj)
  })
}
export function editIncome(obj) {   // 修改 收入信息
  return tkaxios({
    method: 'post',
    url: root + '/yz/zf/edit',
    data: Qs.stringify(obj)
  })
}
export function delIncome(obj) {   // 删除 收入信息
  return tkaxios({
    method: 'post',
    url: root + '/yz/zf/del',
    data: Qs.stringify(obj)
  })
}
export function sendIncome(obj) {   // 提交 收入信息
  return tkaxios({
    method: 'post',
    url: root + '/yz/zf/send',
    data: Qs.stringify(obj)
  })
}

export function getTtData(obj) {   // 获取抬头 列表
  return tkaxios({
    method: 'post',
    url: root + '/yz/zf/getTtData',
    data: Qs.stringify(obj)
  })
}
export function getHtData(obj) {   // 获取业务合同 列表
  return tkaxios({
    method: 'post',
    url: root + '/yz/zf/getHtData',
    data: Qs.stringify(obj)
  })
}
export function getYhcardData(obj) {   // 获取抬头对应的银行卡号
  return tkaxios({
    method: 'post',
    url: root + '/yz/zf/getYhcardData',
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
export function addDeal(obj) {   // 新增 业务合同
  return tkaxios({
    method: 'post',
    url: root + '/yz/fptt_ht/add',
    data: Qs.stringify(obj)
  })
}
export function editDeal(obj) {   // 修改 业务合同
  return tkaxios({
    method: 'post',
    url: root + '/yz/fptt_ht/edit',
    data: Qs.stringify(obj)
  })
}
export function delDeal(obj) {   // 删除 业务合同
  return tkaxios({
    method: 'post',
    url: root + '/yz/fptt_ht/del',
    data: Qs.stringify(obj)
  })
}

export function sendDeal(obj) {   // 提交 业务合同
  return tkaxios({
    method: 'post',
    url: root + '/yz/fptt_ht/send',
    data: Qs.stringify(obj)
  })
}

export function getCap(obj) {   // 抬头管理 主界面============================
  return tkaxios({
    method: 'post',
    url: root + '/yz/tt/index',
    data: Qs.stringify(obj)
  })
}
export function getCapList(obj) {   // 抬头管理 列表页
  return tkaxios({
    method: 'post',
    url: root + '/yz/tt/list',
    data: Qs.stringify(obj)
  })
}
export function getCapDetail(obj) {   // 抬头管理 详情页
  return tkaxios({
    method: 'post',
    url: root + '/share/fptt/showUI',
    data: Qs.stringify(obj)
  })
}
export function addCap(obj) {   // 新增 发票抬头
  console.log(obj)
  return tkaxios({
    method: 'post',
    url: root + '/yz/tt/add',
    data: Qs.stringify(obj),
  })
}
export function delCap(obj) {   // 删除 抬头
  return tkaxios({
    method: 'post',
    url: root + '/yz/tt/del',
    data: Qs.stringify(obj)
  })
}
export function sendCap(obj) {   // 提交 抬头
  return tkaxios({
    method: 'post',
    url: root + '/yz/tt/send',
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
    url: root2 + '/share/bs_end_app/showUI',
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
    url: root2 + '/user_app/logout',
    data: Qs.stringify(obj)
  })
}


