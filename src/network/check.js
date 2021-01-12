// 风控的所有数据请求
import {tkaxios} from "./request";
import Qs from 'qs'

const root = '/cont'
const root1 = '/hyt'
const root8 = '/sapp'


export function getUserMain(obj) {   // 风控获取用户信息===================================================
  return tkaxios({
    method: 'post',
    url: root + '/ms/user/main',
    data: Qs.stringify(obj)
  })
}


export function getsfUserList(obj) {   // 风控 获取单位列表信息
  return tkaxios({
    method: 'post',
    url: root + '/ms/user_sf/list',
    data: Qs.stringify(obj)
  })
}
export function getyzUserList(obj) {   // 风控 获取业者列表信息
  return tkaxios({
    method: 'post',
    url: root + '/ms/user_yz/list',
    data: Qs.stringify(obj)
  })
}
export function getgrUserList(obj) {   // 风控 获取合伙个人列表信息
  return tkaxios({
    method: 'post',
    url: root + '/ms/user_hhr_gr/list',
    data: Qs.stringify(obj)
  })
}
export function getdwUserList(obj) {   // 风控 获取合伙单位列表信息
  return tkaxios({
    method: 'post',
    url: root + '/ms/user_hhr_dw/list',
    data: Qs.stringify(obj)
  })
}
export function getbmUserList(obj) {   // 风控 获取边民列表信息
  return tkaxios({
    method: 'post',
    url: root + '/ms/user_bm/list',
    data: Qs.stringify(obj)
  })
}
export function getptUserList(obj) {   // 风控 获取三方平台列表信息
  return tkaxios({
    method: 'post',
    url: root + '/ms/user_pt/list',
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



export function getFreeIncome(obj) {   // 风控审核 收入管理.主界面(业者)========================================
  return tkaxios({
    method: 'post',
    url: root8 + '/zf/yz/index',
    data: Qs.stringify(obj)
  })
}
export function getCoopIncome(obj) {   // 风控审核 收入管理.主界面(合伙人)
  return tkaxios({
    method: 'post',
    url: root8 + '/zf/hhr/index',
    data: Qs.stringify(obj)
  })
}
export function getFrontierIncome(obj) {   // 风控审核 收入管理.主界面(合作社)
  return tkaxios({
    method: 'post',
    url: root8 + '/zf/bm/index',
    data: Qs.stringify(obj)
  })
}
export function getThirdIncome(obj) {   // 风控审核 收入管理.主界面(三方平台业者)
  return tkaxios({
    method: 'post',
    url: root8 + '/zf/pt/index',
    data: Qs.stringify(obj)
  })
}
export function getFreeIncomelist(obj) {   // 风控审核 收入管理.列表页(业者)
  console.log(obj)
  return tkaxios({
    method: 'post',
    url: root8 + '/zf/yz/list',
    data: Qs.stringify(obj)
  })
}
export function getCoopIncomelist(obj) {   // 风控审核 收入管理.列表页(合伙人)
  return tkaxios({
    method: 'post',
    url: root8 + '/zf/hhr/list',
    data: Qs.stringify(obj)
  })
}
export function getFrontierIncomelist(obj) {   // 风控审核 收入管理.列表页(合作社)
  return tkaxios({
    method: 'post',
    url: root8 + '/zf/bm/list',
    data: Qs.stringify(obj)
  })
}
export function getThirdIncomelist(obj) {   // 风控审核 收入管理.列表页(三方平台业者)
  return tkaxios({
    method: 'post',
    url: root8 + '/zf/pt/list',
    data: Qs.stringify(obj)
  })
}

export function getFreeIncomedetail(obj) {   // 风控审核 收入管理.详情页(业者)
  return tkaxios({
    method: 'post',
    url: root8 + '/zf/yz/showUI',
    data: Qs.stringify(obj)
  })
}
export function getCoopIncomedetail(obj) {   // 风控审核 收入管理.详情页(合伙人)
  return tkaxios({
    method: 'post',
    url: root8 + '/zf/hhr/showUI',
    data: Qs.stringify(obj)
  })
}
export function getFrontierIncomedetail(obj) {   // 风控审核 收入管理.详情页(合作社)
  return tkaxios({
    method: 'post',
    url: root8 + '/zf/bm/showUI',
    data: Qs.stringify(obj)
  })
}
export function getThirdIncomedetail(obj) {   // 风控审核 收入管理.详情页(三方业者平台)
  return tkaxios({
    method: 'post',
    url: root8 + '/zf/pt/showUI',
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
