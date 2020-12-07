// 风控的所有数据请求
import {tkaxios} from "./request";
import Qs from 'qs'

const root = '/cont'
const root1 = '/hyt'


export function getUserMain(obj) {   // 风控获取用户信息===================================================
  return tkaxios({
    method: 'post',
    url: root + '/ms/fr/user/main',
    data: Qs.stringify(obj)
  })
}

export function getUserList(obj) {   // 风控 获取列表信息
  return tkaxios({
    method: 'post',
    url: root + '/ms/fr/user/list',
    data: Qs.stringify(obj)
  })
}

export function passUser(obj) {   // 审核用户通过
  return tkaxios({
    method: 'post',
    url: root + '/ms/fr/user/check',
    data: Qs.stringify(obj)
  })
}
export function onpassUser(obj) {   // 审核用户退回
  return tkaxios({
    method: 'post',
    url: root + '/ms/fr/user/uncheck',
    data: Qs.stringify(obj)
  })
}

export function getUserDetailCom(obj) {   // 风控获取 单位用户详情页信息
  return tkaxios({
    method: 'post',
    url: root + '/ms/fr/user/dw/showUI',
    data: Qs.stringify(obj)
  })
}
export function getUserDetailFree(obj) {   // 风控获取 业者用户详情页信息
  return tkaxios({
    method: 'post',
    url: root + '/ms/fr/user/yz/showUI',
    data: Qs.stringify(obj)
  })
}

export function getUserDetailContract(obj) {   // 风控获取 单位用户协议列表页
  return tkaxios({
    method: 'post',
    url: root + '/ms/fr/user/get_xy_model_list',
    data: Qs.stringify(obj)
  })
}

export function getUserDetailContent(obj) {   // 风控获取 单位用户协议 内容表页
  return tkaxios({
    method: 'post',
    url: root + '/ms/fr/user/get_xy_model_show',
    data: Qs.stringify(obj)
  })
}



export function getFreeIncome(obj) {   // 风控审核 收入管理(业者)========================================
  return tkaxios({
    method: 'post',
    url: root + '/ms/fr_zg/zf/index',
    data: Qs.stringify(obj)
  })
}
export function getCoopIncome(obj) {   // 风控审核 收入管理(合伙人)
  return tkaxios({
    method: 'post',
    url: root + '/ms/fr_zg/zf/index',
    data: Qs.stringify(obj)
  })
}
export function getFrontierIncome(obj) {   // 风控审核 收入管理(合作社)
  return tkaxios({
    method: 'post',
    url: root + '/ms/fr_zg/zf/index',
    data: Qs.stringify(obj)
  })
}

export function getFreeInvoice(obj) {   // 风控审核 发票查询(业者)===========================================
  return tkaxios({
    method: 'post',
    url: root + '/ms/fr_zg/fp/index',
    data: Qs.stringify(obj)
  })
}
export function getCoopInvoice(obj) {   // 风控审核 发票查询(合伙人)
  return tkaxios({
    method: 'post',
    url: root + '/ms/fr_zg/fp/index',
    data: Qs.stringify(obj)
  })
}
export function getFrontierInvoice(obj) {   // 风控审核 发票查询(合作社)
  return tkaxios({
    method: 'post',
    url: root + '/ms/fr_zg/fp/index',
    data: Qs.stringify(obj)
  })
}


export function getTax(obj) {   // 风控审核 报税查询========================================================
  return tkaxios({
    method: 'post',
    url: root1 + '/share/bs_app/index ',   // 这个公共的接口 不用以/control_app开头,, 所以用root1这个去反向代理
    data: Qs.stringify(obj)
  })
}
export function getCoopTax(obj) {   // 风控审核 报税查询(合作伙伴)
  return tkaxios({
    method: 'post',
    url: root1 + '/share/bs_app/index ',
    data: Qs.stringify(obj)
  })
}
export function getFrontierTax(obj) {   // 风控审核 报税查询(合作社)
  return tkaxios({
    method: 'post',
    url: root1 + '/share/bs_app/index ',
    data: Qs.stringify(obj)
  })
}


export function getDeal(obj) {   // 风控审核 业务合同
  return tkaxios({
    method: 'post',
    url: root1 + '/share_app/ms_zg_ywy/ht/index',   // 这个公共的接口 不用以/control_app开头,, 所以用root1这个去反向代理
    data: Qs.stringify(obj)
  })
}





export function getRealname(obj) {   // 个人中心: 获取姓名和电话======================================
  return tkaxios({
    method: 'post',
    url: root + '/ms/info/index',
    data: Qs.stringify(obj)
  })
}
export function getPerson(obj) {   // 个人中心: 获取个人信息
  return tkaxios({
    method: 'post',
    url: root + '/ms/info/showInfo_step01',
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













































export function getHomeMultidata() {   // why的接口
  return myaxios({
    url: '/home/multidata'
  })
}
