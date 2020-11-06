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

export function  getDeal(obj) {   // 业务合同主界面
  return tkaxios({
    method: 'post',
    url: root + '/yz/fptt_ht/main',
    data: Qs.stringify(obj)
  })
}

export function  getInvoice(obj) {   // 发票查询主界面
  return tkaxios({
    method: 'post',
    url: root + '/yz/fp/index',
    data: Qs.stringify(obj)
  })
}



export function  getTaxList(obj) {   // 报税查询列表页
  return tkaxios({
    method: 'post',
    url: root + '/yz/ns/list',
    data: Qs.stringify(obj)
  })
}

