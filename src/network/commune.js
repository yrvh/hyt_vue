// 合作社的 数据请求
import {tkaxios} from "./request";
import Qs from 'qs'

const root = '/cont'
const root1 = '/hyt'
const root8 = '/sapp'

export function Test(obj) {   // 这个是 实例函数, 等后端接口写完,按实际情况去 写===================================================
  return tkaxios({
    method: 'post',
    url: root + '?????***',
    data: Qs.stringify(obj)
  })
}
