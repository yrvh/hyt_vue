// 单位的数据请求
import {tkaxios} from "./request";
import Qs from 'qs'

const root = '/cont'
const root1 = '/hyt'
const root8 = '/sapp'


export function getUserMain(obj) {   // 单位获取===================================================
  return tkaxios({
    method: 'post',
    url: root + '待有接口写完,按实际情况填写: 接口名',
    data: Qs.stringify(obj)
  })
}