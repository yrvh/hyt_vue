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

export function  getUserList(obj) {   // 风控 获取列表信息
  return tkaxios({
    method: 'post',
    url: root + '/ms/fr/user/list',
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
export function getFreeInvoice(obj) {   // 风控审核 发票查询(业者)
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
export function getTax(obj) {   // 风控审核 报税查询
  return tkaxios({
    method: 'post',
    url: root1 + '/share/bs_app/index ',   // 这个公共的接口 不用以/control_app开头,, 所以用root1这个去反向代理
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













































export function getHomeMultidata() {   // why的接口
  return myaxios({
    url: '/home/multidata'
  })
}
