// 风控的所有数据请求
import {tkaxios} from "./request";
import Qs from 'qs'
const root = '/cont'


export function getUserMain(obj) {   // 风控获取用户信息
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













































export function getHomeMultidata() {   // why的接口
  return myaxios({
    url: '/home/multidata'
  })
}
