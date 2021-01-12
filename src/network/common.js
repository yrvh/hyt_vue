// 公共接口
import {tkaxios} from "./request";
import Qs from 'qs'

const root = '/cont'
const root1 = '/hyt'
const root8 = '/sapp'


export function getSfData(obj) {   // (业者获取) 接受服务单位 =========
  return tkaxios({
    method: 'post',
    url: root + '/yz/tt/list',
    data: Qs.stringify(obj)
  })
}

export function getSfidData(obj) {   //风控获取 接受服务单位 =========
  return tkaxios({
    method: 'post',
    url: root8 + '/get_sfData',
    data: Qs.stringify(obj)
  })
}

export function getFreeData(obj) {   //获取业者列表 =========
  return tkaxios({
    method: 'post',
    url: root8 + '/get_yzData',
    data: Qs.stringify(obj)
  })
}

export function getSellData(obj) {   //获取营销员列表 =========
  return tkaxios({
    method: 'post',
    url: root8 + '/get_yxyData',
    data: Qs.stringify(obj)
  })
}

export function getClerkData(obj) {   //获取业务员列表 =========
  return tkaxios({
    method: 'post',
    url: root8 + '/get_ywyData',
    data: Qs.stringify(obj)
  })
}

export function getCoopData(obj) {   //获取合作伙伴列表 =========
  return tkaxios({
    method: 'post',
    url: root8 + '/get_hhrData',
    data: Qs.stringify(obj)
  })
}

export function getPlatformData(obj) {   //获取三方平台企业列表 =========
  return tkaxios({
    method: 'post',
    url: root8 + '/get_ptData',
    data: Qs.stringify(obj)
  })
}
